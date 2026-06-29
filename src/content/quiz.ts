export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // options 배열에서 정답의 인덱스
  explanation?: string;
};

// 강의 id → 객관식 자가 점검 문제. Lesson 틀이 자동으로 렌더한다.
export const quiz: Record<string, QuizQuestion[]> = {
  '01-intro': [
    {
      question: 'React를 가장 잘 설명한 것은?',
      options: ['백엔드 프레임워크', 'UI를 만드는 선언형 라이브러리', 'CSS 전처리기', '데이터베이스'],
      answer: 1,
      explanation: '상태를 선언하면 React가 화면을 맞춰 줍니다.',
    },
  ],
  '02-jsx': [
    {
      question: 'JSX의 중괄호 {} 안에 넣을 수 있는 것은?',
      options: ['자바스크립트 표현식', 'if 문', 'for 문', 'import 문'],
      answer: 0,
      explanation: '값을 만드는 "표현식"만 들어갑니다. 조건은 삼항/&&로.',
    },
  ],
  '03-props': [
    {
      question: '자식 컴포넌트 입장에서 props는?',
      options: ['자유롭게 수정 가능', '전역 변수', '읽기 전용', '함수만 담을 수 있음'],
      answer: 2,
      explanation: '값이 바뀌어야 하면 부모의 state를 바꾸도록 합니다.',
    },
  ],
  '04-events': [
    {
      question: 'onClick에 넘겨야 하는 것은?',
      options: ['함수 호출 결과', '함수 자체', '문자열', '숫자'],
      answer: 1,
      explanation: 'onClick={fn} 또는 인자가 필요하면 onClick={() => fn(x)}.',
    },
  ],
  '05-list': [
    {
      question: '리스트 렌더링에서 key의 역할은?',
      options: ['각 항목을 식별', '자동 정렬', '스타일 지정', '이벤트 연결'],
      answer: 0,
      explanation: '추가·삭제·변경을 React가 정확히 추적하도록 돕습니다.',
    },
  ],
  '06-forms': [
    {
      question: '제어 컴포넌트에서 input의 value는 무엇과 묶나요?',
      options: ['ref', 'state', 'props만', 'DOM 직접'],
      answer: 1,
      explanation: 'value=state, 변경은 onChange로. "진실의 출처"가 state.',
    },
  ],
  '07-usestate': [
    {
      question: 'useState가 돌려주는 것은?',
      options: ['현재 값과 변경 함수', '값만', '함수만', 'DOM 노드'],
      answer: 0,
      explanation: 'const [값, set값] = useState(초기값).',
    },
  ],
  '08-useeffect': [
    {
      question: 'useEffect의 의존성 배열을 []로 두면?',
      options: ['매 렌더마다 실행', '마운트 시 한 번만 실행', '실행되지 않음', '클릭할 때마다 실행'],
      answer: 1,
    },
  ],
  '09-useref': [
    {
      question: 'ref.current 값을 바꾸면?',
      options: ['리렌더가 일어나지 않는다', '항상 리렌더된다', '에러가 난다', 'state가 바뀐다'],
      answer: 0,
      explanation: '리렌더와 무관한 값(타이머 id, DOM 등)에 적합합니다.',
    },
  ],
  '10-custom-hooks': [
    {
      question: '커스텀 훅의 이름 규칙은?',
      options: ['get으로 시작', 'use로 시작', '대문자로 시작', '규칙 없음'],
      answer: 1,
      explanation: '내부에서 훅을 쓰며 이름이 use로 시작합니다.',
    },
  ],
  '11-composition': [
    {
      question: '여는/닫는 태그 사이의 내용을 받는 특별한 prop은?',
      options: ['children', 'content', 'slot', 'body'],
      answer: 0,
    },
  ],
  '12-context': [
    {
      question: 'Context로 값을 트리에 내려줄 때 쓰는 것은?',
      options: ['useState', 'Provider', 'props', 'useRef'],
      answer: 1,
      explanation: '<Ctx.Provider value={...}> 아래에서 useContext로 꺼냅니다.',
    },
  ],
  '13-routing': [
    {
      question: '주소의 동적 부분(:id)을 읽는 훅은?',
      options: ['useParams', 'useState', 'useEffect', 'useRef'],
      answer: 0,
    },
  ],
  '14-fetch': [
    {
      question: '데이터 가져오기(fetch)는 보통 어디서 하나요?',
      options: ['렌더 본문에서 직접', 'useEffect 안에서', 'JSX 안에서', '모듈 최상단에서'],
      answer: 1,
      explanation: '렌더 바깥의 일(사이드 이펙트)이라 useEffect에서 처리합니다.',
    },
  ],
  '15-state-management': [
    {
      question: '형제 컴포넌트가 같은 값을 공유하려면?',
      options: ['각자 state를 둔다', '공통 부모로 끌어올린다', '전역 변수를 쓴다', 'ref로 공유한다'],
      answer: 1,
    },
  ],
  '16-performance': [
    {
      question: 'useMemo가 기억(메모이제이션)하는 것은?',
      options: ['컴포넌트', '함수', '계산 결과 값', 'DOM 노드'],
      answer: 2,
      explanation: '함수는 useCallback, 컴포넌트는 React.memo.',
    },
  ],
  '17-deploy': [
    {
      question: 'Vite의 빌드 결과물이 생기는 폴더는?',
      options: ['dist', 'build', 'out', 'public'],
      answer: 0,
      explanation: 'npm run build → dist/ (정적 파일).',
    },
  ],
  '18-capstone-todo': [
    {
      question: 'state 배열에 항목을 추가하는 올바른 방법은?',
      options: ['todos.push(새값)', 'todos[n] = 새값', 'setTodos([...todos, 새값])', '직접 수정 후 그대로 둠'],
      answer: 2,
      explanation: '새 배열로 교체해야 React가 변경을 감지합니다(불변 업데이트).',
    },
  ],
  '19-capstone-stopwatch': [
    {
      question: 'setInterval을 useEffect 정리(cleanup)로 치우지 않으면?',
      options: ['인터벌이 쌓여 더 빨라진다', '자동으로 정리된다', '에러가 난다', '한 번만 실행된다'],
      answer: 0,
    },
  ],
};
