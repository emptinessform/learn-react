import { useMemo } from 'react'; // 플레이그라운드 scope로 전달하기 위해 가져온다
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Performance16() {
  return (
    <>
      <Section title="불필요한 작업 줄이기">
        <p>
          React는 빠르지만, 상태가 바뀔 때마다 컴포넌트가 다시 실행됩니다. 무거운 계산이나 큰 트리에서는
          이를 줄이는 <TermLink termId="memoization">메모이제이션</TermLink> 도구가 도움이 됩니다:{' '}
          <code>React.memo</code>, <code>useMemo</code>, <code>useCallback</code>.
        </p>
        <CodeBlock
          code={`// 1) 같은 props면 다시 안 그림
const Item = React.memo(function Item({ label }) { ... });

// 2) 무거운 계산 결과를 기억
const total = useMemo(() => heavyCalc(items), [items]);

// 3) 함수를 기억해서 자식의 불필요한 리렌더 방지
const handleClick = useCallback(() => doX(id), [id]);`}
          caption="memo는 컴포넌트, useMemo는 값, useCallback은 함수를 기억한다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>
          입력창에 타이핑해도 doubled 계산은 다시 일어나지 않습니다(의존성이 count뿐이라서). +1을 눌러야
          재계산됩니다.
        </p>
        <Playground
          noInline
          scope={{ useMemo }}
          initialCode={`function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const doubled = useMemo(() => {
    // 무거운 계산이라고 가정
    return count * 2;
  }, [count]);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="타이핑해도 재계산 안 됨"
      />
      <p>count: {count} / doubled: {doubled}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1 (재계산)</button>
    </div>
  );
}

render(<App />);`}
        />
      </Section>

      <Callout type="warn">
        최적화는 "먼저 측정하고 나중에" 하세요. 대부분의 컴포넌트는 메모이제이션 없이도 충분히 빠릅니다.
        근거 없이 useMemo/useCallback을 남발하면 코드만 복잡해지고 이득은 없을 수 있습니다.
      </Callout>
    </>
  );
}
