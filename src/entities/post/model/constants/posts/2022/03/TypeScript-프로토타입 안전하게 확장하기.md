---
title: 'TypeScript-프로토타입 안전하게 확장하기'
date: '2022-03-10'
subheading: '타입스크립트 정적 타입 시스템을 이용한 프로토타입 확장'
completed: true
category:
  - TypeScript
---

## 프로토타입 안전하게 확장하기
- 예전에는 프로토타입 확장이 안전하지 않은 일이었지만 이제 타입스크립트처럼 정적 타입 시스템을 이용하면 안전하게 확장할 수 있다. ( 코드 이식성 높이기, 의존성 그래프를 조금 더 명시적으로 만들기, 실제 사용하는 메서드만 로딩해 성능 개선하기등 프로토타입을 확장하지 않으려는 이유는 다양하다. 하지만 안정성은 더 이상 그이유가 되지 못한다! 타입스크립트 덕분에)

## Example
- Array 프로토타입에 zip이라는 메서드를 추가해는 예제. 우선 .ts(ex: zip.ts)파일에서 Array의 프로토타입을 확장한 다음 새로운 zip메서드를 프로토타입에 추가해주는 방식이다.

```js
// typescript에 zip가 무엇인지 알려준다.
interface Array<T> {
  zip<U>(list: U[]): [T, U][]
}

// .zip 구현
Array.prototype.zip = function <T, U>(
  this: T[],
  list: U[]
): [T, U][] {
  return this.map((v, k) => 
    tuple(v, list[k])
  )
}
```

- 우선 TypeScript에 zip을 Array에 추가하도록 하였꼬, 인터페이스를 합쳐주는 기능을 사용해 전역 범위로 정의된 Array<T> 인터페이스에 zip메서드를 추가하였다. 파일에서 import,export를 명시하지 않았기ㄷ 때문에 기존의 전역 인터페이스와 같은 이름인 Array<T> 인터페이스를 직접 선언할 수 있고 그러면 타입스크립트는 자동으로 둘을 합쳐준다. 파일이 만약 모듈 모드라면 전역 확장을 declare global이라는 타입 선언으로 감싸야 한다.

```js
declare global {
  interface Array<T> {
    zip<U>(list: U[]): [T, U][]
  }
}
```

- global은 전역으로 정의된 모든 값을 포함하는 특별한 네임스페이스다. 이를 사용하면 모듈 모드의 파일에서 전역 범위에 존재하는 이름들도 확장할 수 있게 된다.

- 그 다음 Array의 프로토타입에 zip 메서드를 구현하고 this타입을 사용해서 타입스크립트가 .zip이 호출되는 대상 배열에서 T 타입을 제대로 추론할 수 있도록 만들어준다.

- 이제 zip.ts를 임포트하지 않아도 다른 파일에서 [].zip 이라는 메서드를 사용할 수 있을것으로 예상할 수 있다. 그러나 Array.prototype의 기능을 추가하려면 zip을 사용하는 모든 파일이 zip.ts를 먼저 로드해야 한다. 그 방법은 간단하다. project에서 zip.ts를 명시적으로 제외하도록 tsconfig.json 파일을 수정하고 이 메서드를 사용하는 파일에서 명시적으로 임포트를 하면 된다.

```json
{
  * exclude *: {
    "./zip.ts"
  }
}
```

```js
// ***.ts
import './zip'
[1, 2, 3]
  .map(n => n * 2) // number[]
  .zip(['a', 'b', 'c']) // [number, string][]

// 출력은 아래와같이.
[
  [2, 'a'],
  [4, 'b'],
  [6, 'c']
]
```