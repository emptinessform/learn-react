export type Reference = {
  label: string;
  url: string;
};

// 강의 id → 공식 문서 등 "더 읽어보기" 링크. Lesson 틀이 자동으로 렌더한다.
export const references: Record<string, Reference[]> = {
  '01-intro': [
    { label: 'React 공식 빠른 시작 (react.dev)', url: 'https://react.dev/learn' },
    { label: 'React로 사고하기', url: 'https://react.dev/learn/thinking-in-react' },
  ],
  '02-jsx': [
    { label: 'JSX로 마크업 작성하기', url: 'https://react.dev/learn/writing-markup-with-jsx' },
    { label: '중괄호로 JS 사용하기', url: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces' },
  ],
  '03-props': [
    { label: '컴포넌트에 props 전달하기', url: 'https://react.dev/learn/passing-props-to-a-component' },
  ],
  '04-events': [
    { label: '이벤트에 응답하기', url: 'https://react.dev/learn/responding-to-events' },
  ],
  '05-list': [
    { label: '리스트 렌더링', url: 'https://react.dev/learn/rendering-lists' },
    { label: '조건부 렌더링', url: 'https://react.dev/learn/conditional-rendering' },
  ],
  '06-forms': [
    { label: '상태로 입력에 반응하기', url: 'https://react.dev/learn/reacting-to-input-with-state' },
  ],
  '07-usestate': [
    { label: 'useState 레퍼런스', url: 'https://react.dev/reference/react/useState' },
    { label: 'state: 컴포넌트의 기억', url: 'https://react.dev/learn/state-a-components-memory' },
  ],
  '08-useeffect': [
    { label: 'useEffect 레퍼런스', url: 'https://react.dev/reference/react/useEffect' },
    { label: 'Effect와 동기화하기', url: 'https://react.dev/learn/synchronizing-with-effects' },
  ],
  '09-useref': [
    { label: 'useRef 레퍼런스', url: 'https://react.dev/reference/react/useRef' },
    { label: 'ref로 값 참조하기', url: 'https://react.dev/learn/referencing-values-with-refs' },
  ],
  '10-custom-hooks': [
    { label: '커스텀 훅으로 로직 재사용', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
  ],
  '11-composition': [
    {
      label: 'children으로 JSX 전달하기',
      url: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children',
    },
  ],
  '12-context': [
    { label: 'Context로 데이터 깊이 전달하기', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
    { label: 'useContext 레퍼런스', url: 'https://react.dev/reference/react/useContext' },
  ],
  '13-routing': [
    { label: 'React Router 공식 문서', url: 'https://reactrouter.com/' },
  ],
  '14-fetch': [
    { label: 'Effect가 필요 없을지도 모릅니다', url: 'https://react.dev/learn/you-might-not-need-an-effect' },
    { label: 'Effect와 동기화하기', url: 'https://react.dev/learn/synchronizing-with-effects' },
  ],
  '15-state-management': [
    { label: '컴포넌트 간 state 공유', url: 'https://react.dev/learn/sharing-state-between-components' },
  ],
  '16-performance': [
    { label: 'useMemo 레퍼런스', url: 'https://react.dev/reference/react/useMemo' },
    { label: 'memo 레퍼런스', url: 'https://react.dev/reference/react/memo' },
  ],
  '17-deploy': [
    { label: 'Vite 정적 배포 가이드', url: 'https://vite.dev/guide/static-deploy.html' },
  ],
  '18-capstone-todo': [
    { label: '공식 튜토리얼: 틱택토', url: 'https://react.dev/learn/tutorial-tic-tac-toe' },
  ],
  '19-capstone-stopwatch': [
    { label: 'useEffect로 외부 시스템 연결', url: 'https://react.dev/reference/react/useEffect' },
  ],
};
