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
];
