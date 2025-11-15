---
title: 'Next.js Rewrites로 인한 예상치 못한 Vercel 요금 폭탄 해결기'
date: '2025-07-28'
subheading: 'Vercel 비용을 줄인 과정에서 얻은것들'
completed: true
category:
  - Vercel
  - AWS
  - Cloudfront
  - Cookie
  - Next.js
---

## Next.js Rewrites로 인한 예상치 못한 Vercel 요금 폭탄 해결기

### 들어가며

미디어 스트리밍 서비스를 운영하다 보면 CORS 문제는 피할 수 없는 숙제입니다. 특히 CloudFront와 같은 CDN을 통해 비디오/오디오 콘텐츠를 서빙할 때 쿠키 기반 인증을 사용한다면 더욱 복잡해지죠.

처음에는 Next.js의 rewrites 기능으로 이 문제를 우아하게(?) 해결했다고 생각했습니다. 하지만 몇 달 후 Vercel 요금 고지서를 보고 깜짝 놀랐습니다.

월 수백 달러의 예상치 못한 비용이 발생하고 있었거든요.
이 글에서는 어떻게 이 문제를 근본적으로 해결했는지, 그리고 그 과정에서 배운 교훈들을 공유하려 합니다.

### 문제 상황

**rewrites의 숨겨진 비용**

Next.js rewrites는 단순한 URL 매핑이 아닙니다. 실제 next.js의 소스코드를 보게되면 proxy에 내부적으로 http-party/node-http-proxy를 사용하는 실제 서버사이드 프록시입니다.

추가로 Vercel에서 모든 백엔드 요청은 서버리스 함수를 통해 처리되며, JavaScript bundles, RSC payload, API responses, assets를 포함한 모든 데이터 전송이 bandwidth 사용량에 직접 기여합니다.

즉, rewrites로 미디어를 프록시하면

- Function Invocation: 각 미디어 요청마다 서버리스 함수 호출
- Bandwidth: 프록시된 모든 데이터가 Vercel 사용량에 집계
- Function Execution Time: 프록시 처리 시간만큼 과금

Pro 플랜의 경우 월 1TB의 bandwidth가 포함되어 있지만, 대용량 미디어 서비스에서는 쉽게 초과할 수 있습니다.

### 초기 아키텍처의 함정

처음 상황은 이랬습니다

1. CloudFront를 통해 S3의 미디어 파일들을 서빙
2. 서명된 쿠키(Signed Cookies)를 사용한 접근 제어
3. 브라우저에서 CloudFront로 직접 요청 시 CORS 에러 발생
4. Next.js의 `rewrites`로 프록시 형태로 우회 처리하여 수정

```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://your-cloudfront-domain.com/:path*',
      },
    ];
  },
};
```

언뜻 보기에는 완벽한 해결책 같았습니다.
CORS 문제도 해결되고, 미디어도 잘 재생되었고요..

하지만 여기서 중요한 사실을 놓쳤습니다. Next.js rewrites는 단순한 클라이언트 사이드 라우팅이 아니라, 서버에서 실제 프록시 역할을 수행합니다.

즉, 모든 미디어 요청이 이렇게 처리됩니다.

- 서버리스 함수 호출로 처리 (Function Invocation 증가)
- Vercel 서버를 경유해서 CloudFront에 요청 (Bandwidth 사용량 폭증)
- 응답 데이터를 다시 클라이언트로 전송 (추가 Bandwidth 사용량)

사용자가 1GB 비디오를 시청하면, 그 1GB가 모두 Vercel의 bandwidth 사용량으로 집계되는 상황이었죠.

### 문제 진단: 하나씩 원인 찾기

AWS 공식문서를 정독하면서 진짜 문제들을 찾아보기 시작했습니다.

**1차 문제: CORS 헤더 설정 오류**
CloudFront의 Response Headers Policy에서 첫 번째 문제를 발견했습니다.

```yml
❌ 잘못된 설정:
Access-Control-Allow-Origin: \*.domain.kr
Access-Control-Allow-Credentials: true
```

쿠키를 사용할 때는 Access-Control-Allow-Origin에 와일드카드를 사용할 수 없습니다. Access-Control-Allow-Credentials: true와 함께 사용하면 브라우저가 요청을 차단합니다.

```yml
✅ 올바른 설정:
Access-Control-Allow-Origin: https://domain.kr, https://dev.domain.kr
Access-Control-Allow-Credentials: true
```

**2차 문제: 쿠키 속성 누락**
[AWS 공식문서](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html)를 자세히 읽어보니, 서명된 쿠키에 필수로 포함해야 하는 속성들이 누락되어 있었습니다.

```javascript
// ❌ 기존 코드
document.cookie = `CloudFront-Policy=${policy}`;
document.cookie = `CloudFront-Signature=${signature}`;
document.cookie = `CloudFront-Key-Pair-Id=${keyPairId}`;
```

```javascript
// ✅ 수정된 코드
const cookieOptions = 'Domain=.domain.kr; Path=/; Secure; SameSite=None';
document.cookie = `CloudFront-Policy=${policy}; ${cookieOptions}`;
document.cookie = `CloudFront-Signature=${signature}; ${cookieOptions}`;
document.cookie = `CloudFront-Key-Pair-Id=${keyPairId}; ${cookieOptions}`;
```

특히 Domain 속성이 중요했습니다. 지정하지 않으면 서브도메인 간 쿠키 공유가 되지 않아, domain.kr에서 설정한 쿠키가 video.domain.kr에서 인식되지 않는 문제가 있었습니다.

### 해결과정

**테스트 환경 구성**

앱과 웹 프로덕션에 바로 적용하기엔 위험했기 때문에 별도 테스트 환경을 구성했습니다. 그리고 이후에 테스트 도메인에서 기존과 동일한 환경을 구성한 곳과 이번에 문제를 발견한 곳에서 각각 테스트후 검증을 진행했습니다.

- S3: 테스트 버킷 생성
- CloudFront: 테스트 CF 생성
- 테스트 도메인 준비

**단계별 해결**

1단계: CloudFront 설정 수정
Response Headers Policy 설정 변경

- Access-Control-Allow-Origin에 명시적 도메인 리스트 추가
- 와일드카드 제거

2단계: 쿠키 속성 보완

```javascript
const setCFCookies = (policy, signature, keyPairId) => {
  const options = ['Domain=.your-service.kr', 'Path=/', 'Secure', 'SameSite=None'].join('; ');
  document.cookie = `CloudFront-Policy=${policy}; ${options}`;
  document.cookie = `CloudFront-Signature=${signature}; ${options}`;
  document.cookie = `CloudFront-Key-Pair-Id=${keyPairId}; ${options}`;
};
```

3단계: Next.js rewrites 제거

- next.config.js에서 미디어 관련 rewrites 규칙 삭제

### 결과

**비용 절감 효과**

- Before: 모든 미디어 트래픽이 Vercel을 경유 → 월 수백 달러
- After: 직접 CloudFront 접근 → Vercel 미디어 관련 사용량 0

**성능 개선**

- 레이턴시 감소: Vercel 프록시 경유 불필요
- 안정성 향상: 직접 CDN 접근으로 더 안정적인 스트리밍

### 교훈 및 팁

1. 공식문서의 중요성
   AWS, Vercel 등의 공식문서에는 정말 중요한 정보들이 많습니다. 특히 보안 관련 설정에서는 반드시 공식문서를 정독해보세요.
2. 임시방편의 위험성
   CORS 우회를 위한 프록시는 임시방편일 뿐입니다. 근본적인 해결책을 찾는 것이 중요합니다.
3. 비용 모니터링
   클라우드 서비스 사용 시 예상치 못한 비용이 발생할 수 있습니다. 정기적인 사용량 체크가 필요합니다.
4. 테스트 환경의 중요성
   프로덕션과 동일한 테스트 환경에서 충분히 검증 후 배포해야 합니다.

## 마무리

처음에는 단순한 CORS 우회 문제라고 생각했지만, 실제로는 AWS 설정 오류와 쿠키 속성 누락이 근본 원인이었습니다.
임시방편보다는 근본적인 해결책을 찾는 것이 얼마나 중요한지 다시 한번 깨달았습니다. 그리고 클라우드 서비스의 요금 체계를 정확히 이해하고 모니터링하는 것도 필수라는 교훈을 얻었습니다.
비슷한 문제를 겪고 계신 분들에게 이 글이 도움이 되었으면 좋겠습니다.

### 참고 자료

- [AWS CloudFront - 서명된 쿠키 사용](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html)

- [Next.js - Rewrites](https://nextjs.org/docs/pages/api-reference/config/next-config-js/rewrites)

- [Next.js http-proxy discussion](https://github.com/vercel/next.js/discussions/49546#discussioncomment-5852688)

- [Vercel Bandwidth 사용량 관리](https://vercel.com/docs/pricing/manage-and-optimize-usage)
