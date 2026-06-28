import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';
import StateUpdateDiagram from '../../components/diagrams/StateUpdateDiagram';

export default function UseState07() {
  return (
    <>
      <Section title="useState로 상태 관리하기">
        <p>
          <TermLink termId="hook">훅</TermLink>은 함수 컴포넌트에서 React 기능을 쓰게 해 주는 함수입니다.
          그중 <code>useState</code>는 컴포넌트가 기억할 <TermLink termId="state">상태</TermLink>를
          선언합니다. 상태가 바뀌면 컴포넌트가 자동으로 다시 그려집니다.
        </p>
        <CodeBlock
          code={`const [count, setCount] = useState(0);
//     현재값   바꾸는함수      초기값

setCount(count + 1); // 상태를 바꾸면 화면이 다시 그려진다`}
          caption="useState는 [현재 값, 변경 함수] 쌍을 돌려준다."
        />
        <StateUpdateDiagram />
      </Section>

      <Section title="함수형 업데이트">
        <p>
          이전 상태를 기반으로 바꿀 때는 값 대신 함수를 넘기는 것이 안전합니다. 짧은 시간에 여러 번
          갱신해도 누락되지 않습니다.
        </p>
        <CodeBlock code={`setCount((prev) => prev + 1);`} />
      </Section>

      <Section title="직접 해보기">
        <p>증가·감소·초기화 버튼이 같은 count 상태를 공유합니다. 버튼을 눌러 보세요.</p>
        <Playground
          noInline
          initialCode={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>현재 값: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>{' '}
      <button onClick={() => setCount((c) => c - 1)}>-1</button>{' '}
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  );
}

render(<Counter />);`}
        />
      </Section>

      <Callout type="tip">
        상태는 "직접 바꾸지 말고" 항상 <code>setState</code> 함수로 바꿉니다. 예를 들어 배열에 항목을
        추가할 때도 <code>arr.push()</code>가 아니라 <code>setArr([...arr, 새값])</code>처럼 새 값을
        넘겨야 React가 변경을 감지합니다.
      </Callout>
    </>
  );
}
