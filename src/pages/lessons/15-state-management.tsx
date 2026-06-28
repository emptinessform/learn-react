import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function StateManagement15() {
  return (
    <>
      <Section title="상태를 어디에 둘 것인가">
        <p>
          두 컴포넌트가 같은 값을 공유해야 한다면, 그 값을 둘의 공통 부모로 옮깁니다. 이것을{' '}
          <TermLink termId="lifting-state-up">상태 끌어올리기</TermLink>라고 합니다. 부모가 상태를
          가지고, 자식에게는 값과 "바꾸는 함수"를 props로 내려 줍니다.
        </p>
        <CodeBlock
          code={`function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Display value={count} />
      <Controls onInc={() => setCount((c) => c + 1)} />
    </>
  );
}`}
          caption="상태는 부모 한 곳에 두고, 자식들은 props로 읽고/요청한다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>버튼(자식)을 누르면 표시(다른 자식)가 함께 바뀝니다. 둘은 부모의 같은 상태를 공유합니다.</p>
        <Playground
          noInline
          initialCode={`function Display({ value }) {
  return <p>공유 중인 값: {value}</p>;
}

function Controls({ onInc }) {
  return <button onClick={onInc}>+1</button>;
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Display value={count} />
      <Controls onInc={() => setCount((c) => c + 1)} />
    </div>
  );
}

render(<App />);`}
        />
      </Section>

      <Section title="더 커지면">
        <p>
          공유 범위가 넓어지면 <TermLink termId="context">Context</TermLink>로 트리 전체에 값을 내려
          줍니다. 앱이 더 복잡해지면 Redux, Zustand, Jotai 같은 외부 상태 관리 라이브러리를 고려할 수
          있지만, 대부분은 useState + 끌어올리기 + Context로 충분합니다.
        </p>
      </Section>

      <Callout type="info">
        "이 상태를 누가 알아야 하는가?"를 먼저 묻고, 그들을 모두 포함하는 가장 가까운 공통 부모에 상태를
        두세요. 너무 위로 올리면 불필요한 리렌더가, 너무 아래에 두면 공유가 안 됩니다.
      </Callout>
    </>
  );
}
