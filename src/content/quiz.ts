export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // options 배열에서 정답의 인덱스
  explanation?: string;
};

// 강의 id → 객관식 자가 점검 문제. Lesson 틀이 자동으로 렌더한다(2개 이상이면 번호 표시).
export const quiz: Record<string, QuizQuestion[]> = {
  '01-intro': [
    {
      question: 'React를 가장 잘 설명한 것은?',
      options: ['백엔드 프레임워크', 'UI를 만드는 선언형 라이브러리', 'CSS 전처리기', '데이터베이스'],
      answer: 1,
      explanation: '상태를 선언하면 React가 화면을 맞춰 줍니다.',
    },
    {
      question: 'DOM을 직접 조작하는 방식의 단점은?',
      options: ['복잡해질수록 코드가 얽힌다', '항상 더 빠르다', '상태가 자동 관리된다', '브라우저가 필요 없다'],
      answer: 0,
    },
  ],
  '02-jsx': [
    {
      question: 'JSX의 중괄호 {} 안에 넣을 수 있는 것은?',
      options: ['자바스크립트 표현식', 'if 블록(statement)', 'for 블록', 'import 문'],
      answer: 0,
      explanation: '값을 만드는 "표현식"만 들어갑니다. 조건은 삼항/&&로.',
    },
    {
      question: 'JSX에서 CSS 클래스를 지정하는 속성은?',
      options: ['class', 'className', 'classNames', 'css'],
      answer: 1,
      explanation: 'class는 JS 예약어라 className을 씁니다.',
    },
  ],
  '03-props': [
    {
      question: '자식 컴포넌트 입장에서 props는?',
      options: ['자유롭게 수정 가능', '전역 변수', '읽기 전용', '함수만 담을 수 있음'],
      answer: 2,
      explanation: '값이 바뀌어야 하면 부모의 state를 바꾸도록 합니다.',
    },
    {
      question: 'props에서 name만 꺼내 받는 구조 분해 문법은?',
      options: ['function C(props)', 'function C({ name })', 'function C([name])', 'function C(name)'],
      answer: 1,
    },
  ],
  '04-events': [
    {
      question: 'onClick에 넘겨야 하는 것은?',
      options: ['함수 호출 결과', '함수 자체', '문자열', '숫자'],
      answer: 1,
      explanation: 'onClick={fn} 또는 인자가 필요하면 onClick={() => fn(x)}.',
    },
    {
      question: '입력값(onChange)을 읽을 때 흔히 쓰는 것은?',
      options: ['e.value', 'e.target.value', 'e.input', 'value()'],
      answer: 1,
    },
  ],
  '05-list': [
    {
      question: '리스트 렌더링에서 key의 역할은?',
      options: ['각 항목을 식별', '자동 정렬', '스타일 지정', '이벤트 연결'],
      answer: 0,
      explanation: '추가·삭제·변경을 React가 정확히 추적하도록 돕습니다.',
    },
    {
      question: '"조건이 참일 때만" 요소를 보여주는 데 흔히 쓰는 연산자는?',
      options: ['&&', '||', '??', '!'],
      answer: 0,
      explanation: '{조건 && <X />} 형태로 씁니다.',
    },
  ],
  '06-forms': [
    {
      question: '제어 컴포넌트에서 input의 value는 무엇과 묶나요?',
      options: ['ref', 'state', 'props만', 'DOM 직접'],
      answer: 1,
      explanation: 'value=state, 변경은 onChange로. "진실의 출처"가 state.',
    },
    {
      question: '폼 제출 시 브라우저 새로고침을 막으려면?',
      options: ['e.stopPropagation()', 'e.preventDefault()', 'return false 만', '아무것도 안 함'],
      answer: 1,
    },
  ],
  '07-usestate': [
    {
      question: 'useState가 돌려주는 것은?',
      options: ['현재 값과 변경 함수', '값만', '함수만', 'DOM 노드'],
      answer: 0,
      explanation: 'const [값, set값] = useState(초기값).',
    },
    {
      question: '이전 값을 기반으로 안전하게 갱신하는 방법은?',
      options: ['setX(x + 1)', 'setX((x) => x + 1)', 'x = x + 1', 'x++'],
      answer: 1,
      explanation: '함수형 업데이트는 같은 이벤트에서 연달아 갱신해도 안전합니다.',
    },
  ],
  '08-useeffect': [
    {
      question: 'useEffect의 의존성 배열을 []로 두면?',
      options: ['매 렌더마다 실행', '마운트 시 한 번만 실행', '실행되지 않음', '클릭할 때마다 실행'],
      answer: 1,
    },
    {
      question: '이펙트의 정리(cleanup)는 무엇으로 작성하나요?',
      options: ['객체를 return', '함수를 return', 'throw로', '별도의 훅으로'],
      answer: 1,
      explanation: 'useEffect의 콜백이 반환한 함수가 정리 시 호출됩니다.',
    },
  ],
  '09-useref': [
    {
      question: 'ref.current 값을 바꾸면?',
      options: ['리렌더가 일어나지 않는다', '항상 리렌더된다', '에러가 난다', 'state가 바뀐다'],
      answer: 0,
      explanation: '리렌더와 무관한 값(타이머 id, DOM 등)에 적합합니다.',
    },
    {
      question: 'DOM 요소에 ref를 연결하는 JSX 속성은?',
      options: ['ref', 'dom', 'node', 'bind'],
      answer: 0,
    },
  ],
  '10-custom-hooks': [
    {
      question: '커스텀 훅의 이름 규칙은?',
      options: ['get으로 시작', 'use로 시작', '대문자로 시작', '규칙 없음'],
      answer: 1,
      explanation: '내부에서 훅을 쓰며 이름이 use로 시작합니다.',
    },
    {
      question: '커스텀 훅이 컴포넌트 사이에서 공유하는 것은?',
      options: ['상태 값 자체', '상태 로직', 'DOM', 'CSS'],
      answer: 1,
      explanation: '로직을 공유할 뿐, 각 컴포넌트의 상태는 독립적입니다.',
    },
  ],
  '11-composition': [
    {
      question: '여는/닫는 태그 사이의 내용을 받는 특별한 prop은?',
      options: ['children', 'content', 'slot', 'body'],
      answer: 0,
    },
    {
      question: 'React가 재사용을 위해 권장하는 방식은?',
      options: ['상속', '합성(composition)', '전역 변수', '복사-붙여넣기'],
      answer: 1,
    },
  ],
  '12-context': [
    {
      question: 'Context로 값을 트리에 내려줄 때 쓰는 것은?',
      options: ['useState', 'Provider', 'props', 'useRef'],
      answer: 1,
      explanation: '<Ctx.Provider value={...}> 아래에서 useContext로 꺼냅니다.',
    },
    {
      question: 'Context 객체를 만드는 함수는?',
      options: ['makeContext', 'createContext', 'useContext', 'newContext'],
      answer: 1,
    },
  ],
  '13-routing': [
    {
      question: '주소의 동적 부분(:id)을 읽는 훅은?',
      options: ['useParams', 'useState', 'useEffect', 'useRef'],
      answer: 0,
    },
    {
      question: '현재 활성화된 링크를 강조하기 좋은 컴포넌트는?',
      options: ['Link', 'NavLink', 'Route', 'Anchor'],
      answer: 1,
    },
  ],
  '14-fetch': [
    {
      question: '데이터 가져오기(fetch)는 보통 어디서 하나요?',
      options: ['렌더 본문에서 직접', 'useEffect 안에서', 'JSX 안에서', '모듈 최상단에서'],
      answer: 1,
      explanation: '렌더 바깥의 일(사이드 이펙트)이라 useEffect에서 처리합니다.',
    },
    {
      question: '데이터를 다룰 때 함께 관리하면 좋은 상태는?',
      options: ['로딩·에러 상태', '글꼴', '색상', '라우트'],
      answer: 0,
      explanation: '"아직 안 옴 / 왔음 / 실패함" 세 경우를 모두 그려 줍니다.',
    },
  ],
  '15-state-management': [
    {
      question: '형제 컴포넌트가 같은 값을 공유하려면?',
      options: ['각자 state를 둔다', '공통 부모로 끌어올린다', '전역 변수를 쓴다', 'ref로 공유한다'],
      answer: 1,
    },
    {
      question: '상태를 필요 이상으로 위(루트 등)로 끌어올리면?',
      options: ['불필요한 리렌더가 늘 수 있다', '항상 더 빨라진다', '버그가 사라진다', '타입이 강해진다'],
      answer: 0,
    },
  ],
  '16-performance': [
    {
      question: 'useMemo가 기억(메모이제이션)하는 것은?',
      options: ['컴포넌트', '함수', '계산 결과 값', 'DOM 노드'],
      answer: 2,
      explanation: '함수는 useCallback, 컴포넌트는 React.memo.',
    },
    {
      question: '함수를 메모이제이션하는 훅은?',
      options: ['useMemo', 'useCallback', 'useRef', 'useState'],
      answer: 1,
    },
  ],
  '17-deploy': [
    {
      question: 'Vite의 빌드 결과물이 생기는 폴더는?',
      options: ['dist', 'build', 'out', 'public'],
      answer: 0,
      explanation: 'npm run build → dist/ (정적 파일).',
    },
    {
      question: '다음 중 정적 호스팅이 아닌 것은?',
      options: ['Vercel', 'Netlify', 'GitHub Pages', 'MySQL'],
      answer: 3,
      explanation: 'MySQL은 데이터베이스입니다.',
    },
  ],
  '18-capstone-todo': [
    {
      question: 'state 배열에 항목을 추가하는 올바른 방법은?',
      options: ['todos.push(새값)', 'todos[n] = 새값', 'setTodos([...todos, 새값])', '직접 수정 후 그대로 둠'],
      answer: 2,
      explanation: '새 배열로 교체해야 React가 변경을 감지합니다(불변 업데이트).',
    },
    {
      question: '배열의 각 항목을 변환해 새 배열을 만드는 메서드는?',
      options: ['push', 'map', 'sort', 'reverse'],
      answer: 1,
      explanation: '완료 토글·렌더링 모두 map으로 새 배열을 만듭니다.',
    },
  ],
  '19-capstone-stopwatch': [
    {
      question: 'setInterval을 useEffect 정리(cleanup)로 치우지 않으면?',
      options: ['인터벌이 쌓여 더 빨라진다', '자동으로 정리된다', '에러가 난다', '한 번만 실행된다'],
      answer: 0,
    },
    {
      question: '타이머 id처럼 "리렌더와 무관한 값" 보관에 적합한 것은?',
      options: ['useState', 'useRef', 'useMemo', 'props'],
      answer: 1,
    },
  ],
};
