export type QnAItem = {
  id: string;
  question: string;
  answer: string;
  date: string;
  relatedLessonId?: string;
  tags?: string[];
};

export const qa: QnAItem[] = [
  {
    id: 'why-react',
    question: '왜 그냥 HTML/JS 대신 React를 쓰나요?',
    answer:
      'UI가 복잡해지면 DOM을 직접 조작하는 코드가 빠르게 얽힙니다. React는 "상태가 이러면 화면은 이렇다"를 선언적으로 작성하게 해 주고, 바뀐 부분만 효율적으로 갱신합니다. 배경과 원리 페이지에서 더 자세히 다룹니다.',
    date: '2026-06-27',
    relatedLessonId: '01-intro',
    tags: ['개념'],
  },
  {
    id: 'jsx-multiple-elements',
    question: 'JSX에서 여러 요소를 한 번에 반환하려면 왜 하나로 감싸야 하나요?',
    answer:
      '컴포넌트는 하나의 값만 반환할 수 있어서, 형제 요소 여러 개를 그대로 나열할 수 없습니다. 불필요한 div를 추가하기 싫다면 빈 태그 <>...</>(Fragment)로 감싸면 됩니다.',
    date: '2026-06-28',
    relatedLessonId: '02-jsx',
    tags: ['JSX', '문법'],
  },
  {
    id: 'jsx-classname',
    question: 'JSX에서는 왜 class 대신 className을 쓰나요?',
    answer:
      'JSX는 자바스크립트로 변환되는데, class는 자바스크립트의 예약어입니다. 그래서 DOM 속성 이름인 className을 씁니다. 마찬가지로 for는 htmlFor로 씁니다.',
    date: '2026-06-28',
    relatedLessonId: '02-jsx',
    tags: ['JSX', '문법'],
  },
  {
    id: 'props-vs-state',
    question: 'props와 state의 차이가 뭔가요?',
    answer:
      'props는 부모가 자식에게 건네주는 "입력값"으로 자식 입장에서는 읽기 전용입니다. state는 컴포넌트가 스스로 가지고 시간에 따라 바꾸는 "내부 값"입니다. 외부에서 받으면 props, 내가 바꾸면 state라고 기억하세요.',
    date: '2026-06-28',
    relatedLessonId: '03-props',
    tags: ['개념', 'props', 'state'],
  },
  {
    id: 'event-fires-immediately',
    question: 'onClick에 함수를 넣었는데 페이지가 열리자마자 실행돼요.',
    answer:
      'onClick={handleClick()}처럼 괄호를 붙이면 렌더 중에 즉시 호출되어 그 "반환값"이 연결됩니다. 함수 자체를 넘겨야 하므로 onClick={handleClick} 또는 인자가 필요하면 onClick={() => handleClick(x)}로 쓰세요.',
    date: '2026-06-28',
    relatedLessonId: '04-events',
    tags: ['이벤트', '실수'],
  },
  {
    id: 'list-key-index',
    question: '리스트의 key에 배열 인덱스를 써도 되나요?',
    answer:
      '항목이 추가·삭제·재정렬되지 않는 고정 목록이면 인덱스도 괜찮습니다. 하지만 순서가 바뀌거나 중간이 삭제되면 React가 항목을 잘못 매칭해 버그가 생길 수 있어, 가능하면 항목마다 고유한 id를 key로 쓰는 것이 안전합니다.',
    date: '2026-06-28',
    relatedLessonId: '05-list',
    tags: ['리스트', 'key'],
  },
  {
    id: 'input-readonly',
    question: 'input에 value를 줬더니 타이핑이 안 돼요.',
    answer:
      'value를 state에 묶으면 그 입력은 state가 "진실의 출처"가 됩니다. onChange로 state를 갱신해 주지 않으면 값이 고정되어 읽기 전용이 됩니다. value와 onChange는 항상 짝으로 쓰세요(제어 컴포넌트).',
    date: '2026-06-28',
    relatedLessonId: '06-forms',
    tags: ['폼', '실수'],
  },
  {
    id: 'state-not-mutate',
    question: 'state 배열에 push 했는데 화면이 안 바뀌어요.',
    answer:
      'React는 state가 "새 값"으로 바뀌었는지로 변경을 감지합니다. arr.push()는 같은 배열을 그대로 바꾸기 때문에 감지되지 않습니다. setArr([...arr, 새값])처럼 새 배열/새 객체를 만들어 넘기세요.',
    date: '2026-06-28',
    relatedLessonId: '07-usestate',
    tags: ['state', '실수'],
  },
  {
    id: 'state-async',
    question: 'setState 바로 다음 줄에서 값을 읽으면 옛날 값이 나와요.',
    answer:
      '상태 변경은 즉시 반영되지 않고 다음 렌더에 적용됩니다. 그래서 setCount(count+1) 직후의 count는 아직 옛 값입니다. 새 값이 필요하면 변수에 따로 담거나, 이전 값 기반이면 setCount(c => c + 1) 함수형 업데이트를 쓰세요.',
    date: '2026-06-28',
    relatedLessonId: '07-usestate',
    tags: ['state', '개념'],
  },
  {
    id: 'useeffect-infinite',
    question: 'useEffect가 무한 반복해요. 왜죠?',
    answer:
      '대개 이펙트 안에서 state를 바꾸는데 그 state가 의존성 배열에 들어가 있어 "변경 → 재실행 → 또 변경"이 반복되는 경우입니다. 의존성 배열을 정확히 지정하고, 한 번만 실행할 일이면 []로 두세요. 객체/함수를 의존성에 넣으면 매 렌더마다 새로 만들어져 반복될 수도 있습니다.',
    date: '2026-06-28',
    relatedLessonId: '08-useeffect',
    tags: ['useEffect', '실수'],
  },
  {
    id: 'why-rerender',
    question: '컴포넌트가 자꾸 다시 실행되는데, 비효율 아닌가요?',
    answer:
      '함수 컴포넌트는 state/props가 바뀌면 다시 실행되는 게 정상입니다. 다시 실행돼도 React는 바뀐 DOM만 갱신하므로 보통 충분히 빠릅니다. 실제로 느릴 때만 측정 후 memo/useMemo/useCallback으로 최적화하세요.',
    date: '2026-06-28',
    relatedLessonId: '16-performance',
    tags: ['성능', '개념'],
  },
];
