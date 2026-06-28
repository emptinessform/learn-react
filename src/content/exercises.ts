export type Exercise = {
  question: string;
  answer: string;
  answerCode?: string;
};

// 강의 id → 연습문제 목록. Lesson 틀이 자동으로 렌더한다.
export const exercises: Record<string, Exercise[]> = {
  '01-intro': [
    {
      question: 'DOM을 직접 조작하는 방식과 비교해, React의 핵심 장점을 한 문장으로 설명해 보세요.',
      answer:
        'React는 선언형입니다. "상태가 이러면 화면은 이렇다"만 정의하면 바뀐 부분을 React가 알아서 효율적으로 갱신합니다. 우리는 갱신 절차를 직접 지시하지 않습니다.',
    },
  ],
  '02-jsx': [
    {
      question: 'name 값이 "세계"일 때, 아래 JSX의 렌더 결과는?  const el = <h2>안녕, {name}!</h2>;',
      answer: '중괄호 안의 표현식이 값으로 치환됩니다.',
      answerCode: '<h2>안녕, 세계!</h2>',
    },
  ],
  '03-props': [
    {
      question: 'Welcome 컴포넌트가 age prop도 받아 "민수 (33세)"처럼 표시하도록 고쳐 보세요.',
      answer: 'props에 age를 추가하고 JSX에서 함께 표시합니다.',
      answerCode: `function Welcome({ name, age }) {
  return <p>{name} ({age}세)</p>;
}

<Welcome name="민수" age={33} />`,
    },
  ],
  '04-events': [
    {
      question: '버튼을 누를 때마다 count가 2씩 증가하도록 onClick을 고쳐 보세요.',
      answer: '함수형 업데이트로 이전 값에 2를 더합니다.',
      answerCode: 'onClick={() => setCount((c) => c + 2)}',
    },
  ],
  '05-list': [
    {
      question: '숫자 배열 [1, 2, 3]을 <li>로 렌더링하고 key를 붙여 보세요.',
      answer: 'map으로 각 항목을 <li>로 변환하고 고유한 값을 key로 씁니다.',
      answerCode: `{[1, 2, 3].map((n) => (
  <li key={n}>{n}</li>
))}`,
    },
  ],
  '06-forms': [
    {
      question: '입력한 이름을 항상 대문자로 미리보기에 표시하려면 어디를 바꾸면 될까요?',
      answer: '표시할 때 변환하거나(예: name.toUpperCase()) onChange에서 변환해 저장합니다.',
      answerCode: '<p>입력: {name.toUpperCase()}</p>',
    },
  ],
  '07-usestate': [
    {
      question: '초기값 10에서 시작해, 버튼을 누를 때마다 값이 절반이 되게 만들어 보세요.',
      answer: '함수형 업데이트로 이전 값을 2로 나눕니다.',
      answerCode: `const [n, setN] = useState(10);

<button onClick={() => setN((v) => v / 2)}>절반</button>`,
    },
  ],
  '08-useeffect': [
    {
      question:
        '컴포넌트가 화면에 처음 나타날 때 딱 한 번만 실행되게 하려면, useEffect의 의존성 배열을 어떻게 둬야 할까요?',
      answer: '빈 배열 []을 넘기면 마운트 시 한 번만 실행됩니다.',
      answerCode: `useEffect(() => {
  console.log('처음 한 번');
}, []);`,
    },
  ],
  '09-useref': [
    {
      question:
        'state와 ref 중, "화면에 보여줄 값"과 "리렌더 없이 들고만 있을 값"에는 각각 무엇이 적합할까요?',
      answer:
        '화면에 보여줄 값은 state(바뀌면 다시 그림), 화면과 무관하게 보관만 할 값(타이머 id, DOM 등)은 ref가 적합합니다.',
    },
  ],
  '10-custom-hooks': [
    {
      question: '참/거짓을 뒤집는 useToggle 커스텀 훅을 만들어 보세요. [현재값, 토글함수]를 반환합니다.',
      answer: '내부에서 useState를 쓰고 토글 함수를 함께 반환합니다.',
      answerCode: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle];
}`,
    },
  ],
  '11-composition': [
    {
      question: 'Card가 본문(children) 외에 footer 영역도 따로 받게 하려면 어떻게 할까요?',
      answer: 'children과 별개로 footer를 prop으로 받아 원하는 위치에 렌더합니다.',
      answerCode: `function Card({ children, footer }) {
  return (
    <div>
      <div>{children}</div>
      <hr />
      <div>{footer}</div>
    </div>
  );
}`,
    },
  ],
  '12-context': [
    {
      question: 'Provider로 감싸지 않은 곳에서 useContext를 쓰면 어떤 값이 나올까요?',
      answer: 'createContext(기본값)에 준 기본값이 쓰입니다. Provider가 있으면 그 value가 우선합니다.',
      answerCode: `const ThemeContext = createContext('light'); // 기본값
// Provider 밖에서 useContext(ThemeContext) → 'light'`,
    },
  ],
  '13-routing': [
    {
      question: '/users/42 처럼 주소의 동적 부분(42)을 컴포넌트에서 읽으려면?',
      answer: '경로에 :파라미터를 쓰고 useParams로 읽습니다.',
      answerCode: `<Route path="/users/:id" element={<User />} />

function User() {
  const { id } = useParams();
  return <p>사용자 {id}</p>;
}`,
    },
  ],
  '14-fetch': [
    {
      question: '데이터 요청이 실패했을 때 화면에 "불러오기 실패"를 보여주려면 무엇이 필요할까요?',
      answer: 'error 상태를 두고, 실패 시 setError 하고, 렌더에서 error가 있으면 메시지를 보여줍니다.',
      answerCode: 'if (error) return <p>불러오기 실패</p>;',
    },
  ],
  '15-state-management': [
    {
      question: '형제 관계인 두 컴포넌트가 같은 값을 공유해야 합니다. 상태를 어디에 둬야 할까요?',
      answer:
        '두 컴포넌트를 모두 포함하는 가장 가까운 공통 부모로 상태를 끌어올립니다(lifting state up).',
    },
  ],
  '16-performance': [
    {
      question: 'useMemo(() => calc(), []) 처럼 의존성 배열을 빈 []로 두면 어떤 의미일까요?',
      answer:
        '처음 계산한 값을 계속 재사용하고, 이후 리렌더에서는 다시 계산하지 않습니다(의존성이 절대 바뀌지 않으므로).',
    },
  ],
  '17-deploy': [
    {
      question: 'BrowserRouter로 만든 SPA를 정적 호스팅에 올릴 때, 딥링크 새로고침 404를 막는 두 가지 방법은?',
      answer:
        '(1) history fallback — 모든 경로를 index.html로 돌려보내기(예: 404.html=index.html). (2) HashRouter로 전환 — 주소에 #을 써서 서버가 항상 같은 파일만 받게 하기. 이 사이트는 후자를 씁니다.',
    },
  ],
};
