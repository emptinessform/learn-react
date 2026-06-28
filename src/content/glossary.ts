export type Term = {
  id: string;
  term: string;
  definition: string;
  related?: string[];
  relatedLessonId?: string;
};

export const glossary: Term[] = [
  {
    id: 'component',
    term: '컴포넌트(Component)',
    definition:
      'UI를 독립적이고 재사용 가능한 조각으로 나눈 단위. React에서는 보통 JSX를 반환하는 함수로 작성한다.',
    related: ['jsx', 'props'],
    relatedLessonId: '01-intro',
  },
  {
    id: 'jsx',
    term: 'JSX',
    definition:
      '자바스크립트 안에서 UI 구조를 HTML과 비슷한 문법으로 표현하는 확장 문법. 빌드 시 일반 함수 호출로 변환된다.',
    related: ['component'],
    relatedLessonId: '02-jsx',
  },
  {
    id: 'props',
    term: 'props',
    definition:
      '부모 컴포넌트가 자식 컴포넌트에 전달하는 입력값. 읽기 전용이며 함수의 인자처럼 사용된다.',
    related: ['component'],
  },
  {
    id: 'dom',
    term: 'DOM (Document Object Model)',
    definition:
      '브라우저가 HTML 문서를 트리 구조의 객체로 표현한 것. JavaScript는 이 DOM을 읽고 바꿔 화면을 변경한다.',
    related: ['virtual-dom'],
  },
  {
    id: 'virtual-dom',
    term: 'Virtual DOM',
    definition:
      'UI 상태를 메모리상의 가벼운 트리로 표현한 것. React는 새 트리를 이전 트리와 비교(diff)해 실제로 바뀐 노드만 DOM에 반영한다.',
    related: ['dom', 'declarative'],
  },
  {
    id: 'declarative',
    term: '선언형 (Declarative)',
    definition:
      '"무엇을 보여줄지"를 상태로 선언하면 라이브러리가 화면을 맞춰 주는 방식. React가 택한 접근으로, 갱신 과정을 직접 지시하지 않는다.',
    related: ['imperative', 'virtual-dom'],
  },
  {
    id: 'imperative',
    term: '명령형 (Imperative)',
    definition:
      '요소를 찾아 값을 바꾸고 이벤트를 다시 연결하는 등 "어떻게 바꿀지"를 단계마다 직접 지시하는 방식. 순수 DOM 조작이 여기에 해당한다.',
    related: ['declarative', 'dom'],
  },
  {
    id: 'hmr',
    term: 'HMR (Hot Module Replacement)',
    definition:
      '개발 서버가 코드 변경분만 즉시 교체해 새로고침 없이 화면에 반영하는 기능. Vite 개발 서버가 제공한다.',
  },
  {
    id: 'event-handler',
    term: '이벤트 핸들러 (Event Handler)',
    definition:
      '클릭·입력 같은 사용자 동작에 반응해 실행되는 함수. JSX에서는 onClick, onChange 같은 camelCase 속성에 함수를 넘겨 연결한다.',
    relatedLessonId: '04-events',
  },
  {
    id: 'state',
    term: '상태 (state)',
    definition:
      '컴포넌트가 시간에 따라 바뀌는 값을 기억하는 것. state가 바뀌면 React가 화면을 다시 그린다. useState로 선언하며, 자세한 내용은 "상태와 Hooks" 섹션에서 다룬다.',
    related: ['component', 'props'],
    relatedLessonId: '04-events',
  },
  {
    id: 'list-key',
    term: 'key (리스트 키)',
    definition:
      '배열을 리스트로 렌더링할 때 각 항목에 붙이는 고유 식별값. React가 어떤 항목이 추가·삭제·변경됐는지 빠르게 알아내도록 돕는다.',
    relatedLessonId: '05-list',
  },
  {
    id: 'controlled-component',
    term: '제어 컴포넌트 (Controlled Component)',
    definition:
      '입력 요소의 value를 state에 연결하고 onChange로 갱신해, 입력값을 state로 관리하는 폼 요소. "화면에 보이는 값 = state"가 핵심이다.',
    related: ['state'],
    relatedLessonId: '06-forms',
  },
  {
    id: 'hook',
    term: '훅 (Hook)',
    definition:
      '함수 컴포넌트에서 상태·생명주기 같은 React 기능을 쓰게 해 주는 함수. 이름이 use로 시작한다(useState, useEffect 등). 컴포넌트 최상위에서만 호출해야 한다.',
    related: ['state', 'custom-hook'],
    relatedLessonId: '07-usestate',
  },
  {
    id: 'side-effect',
    term: '사이드 이펙트 (Side Effect)',
    definition:
      '데이터 가져오기, 타이머, 구독, DOM 직접 변경처럼 렌더링 결과 바깥에서 일어나는 작업. React에서는 useEffect 안에서 처리한다.',
    related: ['dependency-array'],
    relatedLessonId: '08-useeffect',
  },
  {
    id: 'dependency-array',
    term: '의존성 배열 (Dependency Array)',
    definition:
      'useEffect의 두 번째 인자. 배열 안의 값이 바뀔 때만 이펙트를 다시 실행한다. []이면 처음 한 번만 실행된다.',
    related: ['side-effect'],
    relatedLessonId: '08-useeffect',
  },
  {
    id: 'custom-hook',
    term: '커스텀 훅 (Custom Hook)',
    definition:
      '상태 로직을 재사용하려고 직접 만든 훅. 이름이 use로 시작하는 함수이며 내부에서 기본 훅을 사용한다. 상태가 아니라 로직을 공유한다.',
    related: ['hook'],
    relatedLessonId: '10-custom-hooks',
  },
];
