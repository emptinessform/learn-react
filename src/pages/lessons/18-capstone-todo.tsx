import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function CapstoneTodo18() {
  return (
    <>
      <Section title="캡스톤: 할 일 앱 만들기">
        <p>
          지금까지 배운 것을 한데 모아 작은 <strong>할 일(Todo) 앱</strong>을 만들어 봅니다. 한
          화면에서 <TermLink termId="state">state</TermLink>, <TermLink termId="event-handler">이벤트</TermLink>,{' '}
          <TermLink termId="controlled-component">제어 컴포넌트</TermLink>, 리스트와{' '}
          <TermLink termId="list-key">key</TermLink>가 어떻게 함께 동작하는지 보입니다.
        </p>
      </Section>

      <Section title="필요한 상태와 동작">
        <p>두 가지 상태가 필요합니다 — 할 일 목록(배열)과 입력창의 현재 글자. 동작은 추가·완료토글·삭제 셋입니다.</p>
        <CodeBlock
          code={`const [todos, setTodos] = useState([]); // {id, text, done}[]
const [text, setText] = useState('');

// 추가: 새 배열로 교체(불변 업데이트)
setTodos([...todos, { id: Date.now(), text, done: false }]);

// 완료 토글: 해당 항목만 새 객체로
setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

// 삭제: 거른 새 배열
setTodos(todos.filter((t) => t.id !== id));`}
          caption="모든 변경은 원본을 건드리지 않고 '새 값'으로 교체한다 — 그래야 React가 변경을 감지한다."
        />
      </Section>

      <Section title="완성된 앱 — 직접 고쳐 보기">
        <p>아래에서 할 일을 추가·완료·삭제해 보세요. 코드를 고치면 즉시 반영됩니다.</p>
        <Playground
          noInline
          initialCode={`function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 배우기', done: true },
    { id: 2, text: '할 일 앱 만들기', done: false },
  ]);
  const [text, setText] = useState('');

  const add = () => {
    const value = text.trim();
    if (!value) return;
    setTodos([...todos, { id: Date.now(), text: value, done: false }]);
    setText('');
  };
  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));

  const left = todos.filter((t) => !t.done).length;

  return (
    <div>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />{' '}
        <button onClick={add}>추가</button>
      </div>
      <p>남은 할 일: {left}개</p>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggle(t.id)}
              style={{ cursor: 'pointer', textDecoration: t.done ? 'line-through' : 'none' }}
            >
              {t.text}
            </span>{' '}
            <button onClick={() => remove(t.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<TodoApp />);`}
        />
      </Section>

      <Callout type="tip">
        한 앱 안에서 여러 개념이 자연스럽게 맞물립니다: 입력은 제어 컴포넌트, 추가/삭제/토글은 이벤트
        핸들러, 목록은 map + key, 그리고 모든 변경은 불변 업데이트(새 배열·새 객체)로 이뤄집니다.
      </Callout>

      <Callout type="info">
        다음 단계로, 이 앱에 "전체 삭제", "완료한 항목 숨기기" 필터, 또는 localStorage 저장을 직접
        붙여 보세요. 막히면 Q&A와 용어 사전을 함께 활용하면 좋습니다.
      </Callout>
    </>
  );
}
