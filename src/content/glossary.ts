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
];
