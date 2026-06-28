import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function CustomHooks10() {
  return (
    <>
      <Section title="커스텀 훅 만들기">
        <p>
          여러 컴포넌트에서 같은 상태 로직을 반복한다면, 그 로직을{' '}
          <TermLink termId="custom-hook">커스텀 훅</TermLink>으로 빼낼 수 있습니다. 커스텀 훅은 이름이{' '}
          <code>use</code>로 시작하는 보통의 함수이며, 내부에서 <code>useState</code> 같은 기본 훅을
          사용합니다.
        </p>
        <CodeBlock
          code={`function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}`}
          caption="상태 로직을 함수로 묶어 재사용한다. 반환값의 모양은 자유롭게 정한다."
        />
      </Section>

      <Section title="쓰는 쪽은 단순해진다">
        <p>커스텀 훅을 쓰면 컴포넌트는 "무엇을 보여줄지"에만 집중할 수 있습니다.</p>
        <CodeBlock
          code={`function App() {
  const { count, increment, reset } = useCounter(0);
  // ...
}`}
        />
      </Section>

      <Section title="직접 해보기">
        <p>useCounter 훅을 두 곳에서 따로 쓰면, 각자 독립된 상태를 가집니다. 버튼을 눌러 확인해 보세요.</p>
        <Playground
          noInline
          initialCode={`function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

function App() {
  const a = useCounter(0);
  const b = useCounter(10);
  return (
    <div>
      <button onClick={a.increment}>A: {a.count}</button>{' '}
      <button onClick={b.increment}>B: {b.count}</button>
    </div>
  );
}

render(<App />);`}
        />
      </Section>

      <Callout type="tip">
        커스텀 훅은 <strong>상태(값)를 공유하는 게 아니라 로직을 공유</strong>합니다. 위 예제의 A와 B는
        같은 훅을 쓰지만 서로 다른 count를 가집니다.
      </Callout>
    </>
  );
}
