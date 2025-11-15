---
title: 'WIL - week35'
date: '2022-02-13'
subheading: 'WIL week 35'
completed: true
category:
  - WIL
---

## (1) WIL week35

- convenience-tools
  - server 아키텍쳐 레이어 고민 및 리팩토링
  - vue3(setup + composition api) + typescript
- google은 완벽하지 않다
- 항해99 5기 FrontEnd분들의 작업물 comment작성

## (2) 이번주 한 일

- 회사에서 지금은 google 마케팅과 관련된 서비스를 담당하고있는데 google api들을 사용하면서 느낀건 google도 역시 완벽하지는 않다는걸 몸소 체험중이다. 우리의 잘못인줄 알았던게 google api에 문제가 있었던적도있고 문서에 명시된 내용과 실제로 달랐던 부분들도있고... 여러가지로 많은 경험이 되기도하였다.
- 현재 개인 프로젝트를 작성하면서 server 개발을 하면서 뭔가 구조가 마음에 들지 않아서 고민하다가 조금 더 레이어를 분리해서 만든다면 그래도 좀 더 지금보다는 더 명확한 아키텍쳐가 될 것 같아서 리팩토링 작업을했다. repositories 레이어를 한 개 더 만들어서 분리를 진행했고 우선은 이정도선에서 개발을 쭉 진행해볼 예정이다.
  - controller - service - repositories - models
- 현재 클라이언트는 vue3와 typescript를 이용해서 개발을 진행하고있는데 우선 composition api에 아직 익숙하지도 않고해서 기존에 이걸 좀 더 편하게 사용할 수 있도록하는 vueuse라는 라이브러리를 설치해서 사용했었는데, 흠.... 이러면 뭔가 composition api를 제대로 이해하고 사용한다고 생각되지 않아서 과감하게 삭제하고 순수하게 composition api와 typescript만을 이용해서 개발을 진행해보려고 한다.

- 항해 5기분들의 주특기 주차가 끝나서 front-end분들의 작업물을 보면서 comment를 작성했었다. redux와 좋아요 기능과 관련되서 어려움을 겪으시는 분들이 많았는데 확실히 firebase를 이용해서 개발을 진행하다보니 fe,be를 모두 건드리는것과 비슷하기 때문에 조금 더 어려움을 겪으시지 않았을까 생각이든다. 내가 작성한 comment들이 도움이 되었으면 좋겠다 🙂

## (3) 느낀점

- 개인 프로젝트 하면서 확실히 공부가 많이 되고있는것 같다. 요즘 정신이 없어서 시간을 많이 쓰고있지는 못하지만 확실히 도움이 되고있는걸 느끼고있고 얼른 완성해서 직접 사용하고싶다..ㅎ
- vue3 composition api와 typescript로 개발을 해보니까 확실히 vue2랑 개발할때랑 많이 다른느낌이다. 약간 react와 뭔가 비슷해진 느낌도들고 typescript까지 사용할 수 있어서 더 재미있기도하고 확실히 지금 공부를 많이 해두면 추후에 회사에서 3로 migration을 진행할때 도움이 많이 될 수 있을것같다. 시간날때 틈틈히 열심히 개발해보도록 해야겠다.
- 요즘 크게 느끼는건 확실히 여러가지를 한 번에 공부하려고 하면 안되는것 같다고 많이 생각하고있다. 회사업무외에 개인적으로 공부할때 시간 분배를 잘하면 좋을것 같은데 어떤식으로 해야 좀 더 효율적일지 고민이 많이되는 요즘이다. 조금 더 생각해보고 나에게 맞는 분배방식을 결정해서 적용해보도록 해야겠다.

## (4) 다음주 계획

- convenience-tools todo part front작업 종료
- typescript part2 읽기

## (5) 개인 프로젝트

- convenience-tools : https://github.com/dltmdrbtjd/Convenience-Tools
