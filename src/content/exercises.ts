export type Exercise = {
  question: string;
  answer: string;
  answerCode?: string;
};

// 강의 id → 연습문제 목록. Lesson 틀이 자동으로 렌더한다(2개 이상이면 번호 표시).
export const exercises: Record<string, Exercise[]> = {
  '01-intro': [
    {
      question: 'DOM을 직접 조작하는 방식과 비교해, React의 핵심 장점을 한 문장으로 설명해 보세요.',
      answer:
        'React는 선언형입니다. "상태가 이러면 화면은 이렇다"만 정의하면 바뀐 부분을 React가 알아서 효율적으로 갱신합니다. 우리는 갱신 절차를 직접 지시하지 않습니다.',
    },
    {
      question: '"명령형"과 "선언형"의 차이를 한 줄로 구분해 보세요.',
      answer:
        '명령형은 "어떻게 바꿀지"를 단계마다 직접 지시하고, 선언형은 "무엇을 보여줄지"를 상태로 선언하면 라이브러리가 화면을 맞춰 줍니다.',
    },
  ],
  '02-jsx': [
    {
      question: 'name 값이 "세계"일 때, 아래 JSX의 렌더 결과는?  const el = <h2>안녕, {name}!</h2>;',
      answer: '중괄호 안의 표현식이 값으로 치환됩니다.',
      answerCode: '<h2>안녕, 세계!</h2>',
    },
    {
      question: 'JSX 안에서는 왜 if문을 그대로 못 쓰고 삼항/&&를 쓰나요?',
      answer:
        'JSX의 중괄호 자리에는 값을 만드는 "표현식"만 올 수 있는데, if는 값이 아닌 "문(statement)"입니다. 그래서 조건부 렌더링은 삼항(a ? b : c)이나 && 같은 표현식으로 합니다.',
      answerCode: '{isLoggedIn ? <p>환영</p> : <p>로그인</p>}',
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
    {
      question: '자식 컴포넌트가 받은 props를 직접 바꾸면 어떻게 되나요?',
      answer:
        'props는 읽기 전용이라 바꾸면 안 됩니다. 값이 바뀌어야 한다면 부모가 state로 들고 있고, 자식에는 "바꾸는 함수(콜백)"를 props로 내려 주어 자식이 그 함수를 호출하게 합니다.',
    },
  ],
  '04-events': [
    {
      question: '버튼을 누를 때마다 count가 2씩 증가하도록 onClick을 고쳐 보세요.',
      answer: '함수형 업데이트로 이전 값에 2를 더합니다.',
      answerCode: 'onClick={() => setCount((c) => c + 2)}',
    },
    {
      question: '삭제 버튼이 onDelete(id)처럼 인자를 넘겨 호출되게 하려면?',
      answer:
        '핸들러에 인자를 넘길 때는 화살표 함수로 감쌉니다. onClick={onDelete(id)}처럼 바로 호출하면 렌더 중 실행되니 주의하세요.',
      answerCode: '<button onClick={() => onDelete(id)}>삭제</button>',
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
    {
      question: '목록이 비어 있을 때 "항목이 없습니다"를 보여주려면?',
      answer: '배열 길이를 검사해 조건부로 렌더링합니다.',
      answerCode: `{items.length === 0
  ? <p>항목이 없습니다</p>
  : items.map((it) => <li key={it.id}>{it.name}</li>)}`,
    },
  ],
  '06-forms': [
    {
      question: '입력한 이름을 항상 대문자로 미리보기에 표시하려면 어디를 바꾸면 될까요?',
      answer: '표시할 때 변환하거나(예: name.toUpperCase()) onChange에서 변환해 저장합니다.',
      answerCode: '<p>입력: {name.toUpperCase()}</p>',
    },
    {
      question: '체크박스(checkbox)는 value 대신 무엇을 state에 연결하나요?',
      answer: 'checked 속성을 boolean state에 연결하고, onChange에서 e.target.checked를 읽어 저장합니다.',
      answerCode: `<input
  type="checkbox"
  checked={agree}
  onChange={(e) => setAgree(e.target.checked)}
/>`,
    },
  ],
  '07-usestate': [
    {
      question: '초기값 10에서 시작해, 버튼을 누를 때마다 값이 절반이 되게 만들어 보세요.',
      answer: '함수형 업데이트로 이전 값을 2로 나눕니다.',
      answerCode: `const [n, setN] = useState(10);

<button onClick={() => setN((v) => v / 2)}>절반</button>`,
    },
    {
      question: '객체 state { name, age }에서 name만 바꾸려면 어떻게 setState 하나요?',
      answer:
        '기존 객체를 펼친 뒤 바꿀 필드만 덮어쓴 "새 객체"를 넘깁니다. 직접 user.name = ... 으로 바꾸면 안 됩니다.',
      answerCode: 'setUser((u) => ({ ...u, name: "지영" }));',
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
    {
      question: '검색어 query가 바뀔 때마다 데이터를 다시 불러오려면 의존성 배열에 무엇을 넣나요?',
      answer: 'query를 의존성 배열에 넣으면 query가 바뀔 때마다 이펙트가 다시 실행됩니다.',
      answerCode: `useEffect(() => {
  fetchResults(query);
}, [query]);`,
    },
  ],
  '09-useref': [
    {
      question:
        'state와 ref 중, "화면에 보여줄 값"과 "리렌더 없이 들고만 있을 값"에는 각각 무엇이 적합할까요?',
      answer:
        '화면에 보여줄 값은 state(바뀌면 다시 그림), 화면과 무관하게 보관만 할 값(타이머 id, DOM 등)은 ref가 적합합니다.',
    },
    {
      question: 'setInterval의 id를 보관해 나중에 정리하려고 합니다. state와 ref 중 무엇이 적합할까요?',
      answer:
        'ref가 적합합니다. 타이머 id는 화면에 보여줄 값이 아니고, 바뀌어도 다시 그릴 필요가 없기 때문입니다. ref.current에 담아 두고 clearInterval에 씁니다.',
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
    {
      question: '커스텀 훅과 그냥 일반 함수의 차이는 무엇인가요?',
      answer:
        '커스텀 훅은 내부에서 useState 같은 훅을 사용하고 이름이 use로 시작합니다. 일반 함수는 훅을 호출할 수 없습니다(훅 규칙). 그래서 상태 로직을 담으려면 커스텀 훅으로 만듭니다.',
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
    {
      question: '같은 테두리·배경을 쓰되 내용만 다른 모달을 여러 개 만들려면 무엇을 활용하나요?',
      answer:
        'children(합성)을 활용합니다. 공통 껍데기는 Modal이 그리고, 다른 내용은 사이에 넣어 전달합니다.',
      answerCode: `<Modal>
  <p>정말 삭제할까요?</p>
</Modal>`,
    },
  ],
  '12-context': [
    {
      question: 'Provider로 감싸지 않은 곳에서 useContext를 쓰면 어떤 값이 나올까요?',
      answer: 'createContext(기본값)에 준 기본값이 쓰입니다. Provider가 있으면 그 value가 우선합니다.',
      answerCode: `const ThemeContext = createContext('light'); // 기본값
// Provider 밖에서 useContext(ThemeContext) → 'light'`,
    },
    {
      question: 'Context의 value가 바뀌면 어떤 컴포넌트들이 다시 그려지나요?',
      answer:
        '그 Context를 useContext로 구독하는 모든 컴포넌트가 다시 그려집니다. 그래서 자주 바뀌는 값을 큰 범위 Context에 넣으면 불필요한 리렌더가 생길 수 있습니다.',
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
    {
      question: '현재 활성화된 링크만 다른 색으로 강조하려면 Link 대신 무엇을 쓰나요?',
      answer:
        'NavLink를 씁니다. 활성 상태를 알려주므로 style/className을 함수로 받아 활성일 때만 강조할 수 있습니다(이 사이트 사이드바가 그 예).',
      answerCode: `<NavLink
  to="/about"
  style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
>
  소개
</NavLink>`,
    },
  ],
  '14-fetch': [
    {
      question: '데이터 요청이 실패했을 때 화면에 "불러오기 실패"를 보여주려면 무엇이 필요할까요?',
      answer: 'error 상태를 두고, 실패 시 setError 하고, 렌더에서 error가 있으면 메시지를 보여줍니다.',
      answerCode: 'if (error) return <p>불러오기 실패</p>;',
    },
    {
      question: '요청이 끝나기 전에 컴포넌트가 사라지면 어떤 문제가 생기고, 어떻게 막나요?',
      answer:
        '이미 사라진 컴포넌트의 state를 갱신하려다 경고가 나거나 불필요한 작업이 남습니다. useEffect의 cleanup에서 AbortController로 요청을 중단하거나, "무시" 플래그를 둬서 늦게 온 응답을 버립니다.',
      answerCode: `useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal })/* ... */;
  return () => ctrl.abort();
}, [url]);`,
    },
  ],
  '15-state-management': [
    {
      question: '형제 관계인 두 컴포넌트가 같은 값을 공유해야 합니다. 상태를 어디에 둬야 할까요?',
      answer:
        '두 컴포넌트를 모두 포함하는 가장 가까운 공통 부모로 상태를 끌어올립니다(lifting state up).',
    },
    {
      question: '상태를 필요 이상으로 위(루트 등)로 끌어올리면 생기는 단점은?',
      answer:
        '관련 없는 컴포넌트까지 함께 리렌더되고, 컴포넌트 간 결합도가 올라가 재사용·이해가 어려워집니다. 그래서 "그 상태가 필요한 가장 가까운 공통 부모"에만 둡니다.',
    },
  ],
  '16-performance': [
    {
      question: 'useMemo(() => calc(), []) 처럼 의존성 배열을 빈 []로 두면 어떤 의미일까요?',
      answer:
        '처음 계산한 값을 계속 재사용하고, 이후 리렌더에서는 다시 계산하지 않습니다(의존성이 절대 바뀌지 않으므로).',
    },
    {
      question: 'useCallback은 무엇을 기억하며 언제 쓰면 좋은가요?',
      answer:
        'useCallback은 "함수"를 기억합니다(같은 참조 유지). React.memo로 감싼 자식에게 함수를 prop으로 넘길 때, 매 렌더마다 새 함수가 생겨 자식이 불필요하게 다시 그려지는 것을 막는 데 유용합니다.',
      answerCode: 'const handleClick = useCallback(() => doX(id), [id]);',
    },
  ],
  '17-deploy': [
    {
      question: 'BrowserRouter로 만든 SPA를 정적 호스팅에 올릴 때, 딥링크 새로고침 404를 막는 두 가지 방법은?',
      answer:
        '(1) history fallback — 모든 경로를 index.html로 돌려보내기(예: 404.html=index.html). (2) HashRouter로 전환 — 주소에 #을 써서 서버가 항상 같은 파일만 받게 하기. 이 사이트는 후자를 씁니다.',
    },
    {
      question: 'npm run build의 결과물은 어느 폴더에 생기고, 그걸로 무엇을 하나요?',
      answer:
        'dist/ 폴더에 최적화된 정적 파일(HTML·CSS·JS)이 생깁니다. 이 폴더를 정적 호스팅(Vercel·Netlify·GitHub Pages 등)에 올리면 배포가 됩니다. 서버 코드는 필요 없습니다.',
    },
  ],
};
