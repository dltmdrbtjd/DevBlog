---
title: 'tailwindcss 4.0 톺아보기'
date: '2024-12-01'
subheading: 'tailwindcss 4.0 에 대한 톺아보기'
completed: true
category:
  - tailwindcss
  - css
  - frontend
---

## 들어가며

---

- 최근 11월 말에 tailwindcss 4.0 beta에 대한 첫 릴리즈가 나오게 되어서 이에 관한 변경점들에 대해서 알아보고자 한다.
- 지난 3월에 tailwindcss 4.0 alpha 버전을 오픈소스로 공개하면서 많은 변경사항이 있었고 호환성에 굉장히 많은 가치를 두고 개발을 진행하고 있다는 내용들이 있어서 어떤 부분들이 편해지고 개선되었을지 미리 체크해두면 좋을것 같아서 이번 기회에 한번 톺아보고자 한다.
- 변경점이 굉장히 많기 때문에 중요하게 생각되는 부분들만 중점적으로 살펴보고자 한다.

## Engine

---

- 우선 속도를 위해서 엔진을 새로 제작하여서 속도를 개선하였다.
- 최대 10배 더 빠른 속도를 보여주고 있다.
- 기존 tailwindcss가 웹사이트를 전체 빌드하는데 960ms가 걸리던 것을 105ms 만에 끝낼 수 있다고 한다.
- 더 작은 크기로 줄어들었는데 새로운 엔진은 Rust와 Lightning CSS 로 다시 작성한 부분과 같이 우리가 제공하는 더 무거운 네이티브 패키지를 포함해 설치 시 크기가 35% 이상 작다.
  - 중요한 부분에 Rust를 사용하였고 프레임워크의 핵심 부분은 확장성을 위해 TS를 유지했고 가장 비용이 많이 들고 병렬화가 가능한 개선 포인트들중 일부를 Rust로 이전
- 이번에 새로운 엔진이 유일하게 의존성을 가지는건 Lightning CSS 이다.
- 사용자 정의 파서를 작성하여 PostCSS를 사용했을 때보다 파싱 속도가 2배 이상 빨라졌다고 한다.

## 주요 변경점

---

#### CSS-first configuration, CSS theme variables

- 이번에 가장 큰 변경점중 하나는 프로젝트를 JavaScript로 구성하는 것에서 CSS로 구성하는 것으로 전환된 것이다.
- tailwind.config.js를 가져오는 CSS 파일에서 직접 모든 사용자 정의를 구성할 수 있도록 변경되었다.
- 이번 4.0은 모든 디자인 토큰을 가져와 기본적으로 CSS 변수로 사용할 수 있게 해주기때문에 CSS만 사용하여 런타임에 필요한 모든 값을 참조할 수 있다.
- 이전의 예를 사용하면 @theme등과 같은 모든 값이 일반 사용자 정의 속성으로 CSS에 추가된다.
- 이 값들을 이제 inline css로 사용할 수 있게 되었고 Motion과 같은 라이브러리에서도 사용할 수 있게 되었다.

  - **Before**

    ```javascript
    // tailwind.config.js
    module.exports = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Satoshi', 'sans-serif'],
          },
          screens: {
            '3xl': '1920px',
          },
          colors: {
            avocado: {
              100: 'rgb(245, 247, 244)',
              200: '#b7cf79',
            },
          },
          transitionTimingFunction: {
            fluid: 'cubic-bezier(0.3, 0, 0, 1)',
            snappy: 'cubic-bezier(0.2, 0, 0, 1)',
          },
        },
      },
    };
    ```

  - **After**

    ```css
    /* app.css */
    @import 'tailwindcss';

    @theme {
      --font-display: 'Satoshi', 'sans-serif';

      --breakpoint-3xl: 1920px;

      --color-avocado-100: oklch(0.99 0 0);
      --color-avocado-200: oklch(0.98 0.04 113.22);

      --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
      --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
    }
    /* dist.css */
    :root {
      --font-display: 'Satoshi', 'sans-serif';

      --breakpoint-3xl: 1920px;

      --color-avocado-100: oklch(0.99 0 0);
      --color-avocado-200: oklch(0.98 0.04 113.22);

      --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
      --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
    }
    ```

    ```html
    <!-- Use Case -->
    <!-- 위에 정의한 변수들중 --breakpoint-3xl, --color-avocado-200 -->
    <!-- --font-display 등을 사용하여 적용하는 모습을 볼 수 있다. -->
    <div class="max-w-lg 3xl:max-w-xl">
      <h1 class="font-display text-4xl">
        Data to <span class="text-avocado-200">enrich</span> your online business
      </h1>
    </div>
    ```

#### Built-in import support, Built-in CSS transpilation

- 이전 버전에서는 다른 CSS 파일을 인라인으로 사용하려면 해당 파일을 처리할 @import다른 플러그인을 구성해야 했지만 이제는 외부에서 처리하므로 다른 도구가 필요하지 않다.

  ```javascript
  // postcss.config.mjs
  export default {
    plugins: {
      // 'postcss-import': {}, 이제 필요 없다 :) !
      '@tailwindcss/postcss': {},
    },
  };
  ```

- 이제 빌드시에 Lightning CSS를 통해 CSS를 실행하여 접두사, 최신 기능 변환, 최소화 등을 처리하기 때문에 프로젝트에서 `autoprefixer` 및 `postcss-preset-env`와 같은 도구를 제거할 수 있다.

  ```javascript
  // postcss.config.mjs
  export default {
    plugins: {
      '@tailwindcss/postcss': {},
      // 'postcss-preset-env': {}, 이제 필요 없다 :) !
      // autoprefixer: {}, 이제 필요 없다 :) !
    },
  };
  ```

#### Simplified theme configuration

- Tailwind CSS v4.0에서는 테마 구성 작업이 크게 간소화되었고 특히, 디자인 토큰이 아닌 부분에 대해서는 더 이상 복잡한 구성이 필요하지 않다.
- 예를 들어, grid-cols-12, z-40과 같은 유틸리티 클래스는 이제 테마에 의존하지 않고 바로 작동하고 원하는 레이아웃을 위해 따로 설정을 추가할 필요가 없다.
- 기존에 grid-col-13,14,15... 와 같은 클래스들은 따로 설정을 해줘야 했지만 이제는 바로 사용할 수 있다.

```html
<div class="grid grid-cols-73">
  <div>1</div>
  <!-- ... -->
  <div>73</div>
</div>
```

#### 3D transforms

- 3D 변환을 위한 API를 추가되었다. 예시로 `rotate-x-_`, `rotate-y-_`, `scale-z-_`, `translate-z-_` 그리고 그 외 여러 가지가 있다.

```html
<div>
  <article
    class="transform-3d rotate-x-51 rotate-z-43 shadow-xl transition-all duration-500 hover:-translate-y-4 hover:rotate-x-49 hover:rotate-z-38 hover:shadow-2xl"
  >
    <!-- ... -->
  </article>
</div>
```

#### `not-*`, `nth-*` variants

- 새로운 `not-*`변형에서는 가상 클래스에 대한 지원이 추가되어 `:not(…)`특정 조건이 참이 아닐 때에도 스타일을 지정할 수 있다.

```html
<button class="bg-indigo-600 hover:not-focus:bg-indigo-700">
  <!-- ... -->
</button>
```

- `:nth-child(…)`, `:nth-last-child(…)`, `:nth-of-type(…)`, 그리고 `:nth-last-of-type(…)`가상 클래스에 대해 네 가지 새로운 변형을 추가했다.

```html
<div class="nth-3:underline">…</div>
<div class="nth-last-5:underline">…</div>
<div class="nth-of-type-4:underline">…</div>
<div class="nth-last-of-type-6:underline">…</div>
```

#### Descendant variant

- 자식요소들을 변형하는 방식은 비교적 최근에 추가된 기능이다. 4.0에 신규로 생기는 기능은 아니다.
- 기존에도 자식 요소들의 스타일을 추가하는 `*:` 방식이 있었는데 이번에 문서를 정독해보면서 있었는지 처음 알았다. 간혹 해당 기능이 필요하다 싶은적이 있었는데 앞으로 참고하도록 해야겠다.
- 4.0에서의 변경점은 모든 자식을 타겟으로 하는 방식도 추가되었다는 점이다. `**:` 방식이다.

  ```html
  <ul class="*:p-4">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>
  ```

  ```html
  <div class="**:data-avatar:rounded-full">
    <div>
      <img src="…" data-avatar />
      <!-- This element will be round -->
    </div>
    <p>…</p>
  </div>
  ```

## 마치며

---

- 위에 정리한 내용 외에도 더 많은 내용들이 문서에 담겨있고 각각의 상황에 맞게 필요한 기능들이 있을수도 있기때문에 눈여겨보면 좋을것 같다.
- 이번 4.0에 대한 변경점들은 문서를 참고하면 더 많은 내용들을 확인할 수 있다.
- 이번에 개선포인트들을 보면서 제일 많이 느낀부분은 속도도 속도지만, 호환성과 관련된 부분들을 굉장히 많이 신경써서 개선하는 부분들이 많다고 느껴지고 추가적으로 DX에 대한 부분들도 많이 개선되었다고 느껴졌고 정식으로 릴리즈되는 시점이 기대된다 😎

### Reference

- [tailwindcss 4.0 beta article](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [tailwindcss 4.0 alpha article](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [tailwindcss 4.0 beta document](https://tailwindcss.com/docs/v4-beta#whats-new-in-v4-0)
- [Lightning css document](https://lightningcss.dev/docs.html)
- [Mozila CSS Layer Rule document](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
