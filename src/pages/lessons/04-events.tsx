import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Events04() {
  return (
    <>
      <Section title="이벤트 다루기">
        <p>
          버튼 클릭, 입력 같은 사용자 동작에 반응하려면{' '}
          <TermLink termId="event-handler">이벤트 핸들러</TermLink> 함수를 연결합니다. JSX에서는{' '}
          <code>onClick</code>, <code>onChange</code>처럼 camelCase 속성에 함수를 넘깁니다.
        </p>
        <CodeBlock
          code={`function Button() {
  return <button onClick={() => alert('클릭!')}>눌러보세요</button>;
}`}
          caption="onClick에 '실행할 함수'를 넘긴다. 호출(())이 아니라 함수 자체를 넘기는 점에 주의."
        />
      </Section>

      <Section title="이벤트 객체">
        <p>
          핸들러는 이벤트 객체를 받습니다. 입력값은 보통 <code>e.target.value</code>로 읽습니다.
        </p>
        <CodeBlock
          code={`<input onChange={(e) => console.log(e.target.value)} />`}
        />
      </Section>

      <Section title="직접 해보기">
        <p>
          버튼을 누를 때마다 숫자가 올라갑니다. onClick 안의 동작을 바꿔 보세요. (예제에 나오는{' '}
          <TermLink termId="state">state</TermLink>는 "클릭하면 값이 바뀐다" 정도로만 보면 됩니다 —
          자세한 설명은 바로 아래와 '상태와 Hooks' 섹션에 있습니다.)
        </p>
        <Playground
          noInline
          initialCode={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}번 클릭했어요
    </button>
  );
}

render(<Counter />);`}
        />
      </Section>

      <Callout type="info">
        위 예제의 <TermLink termId="state">state</TermLink>(<code>useState</code>)는 "클릭하면 값이
        바뀌고 화면이 다시 그려진다" 정도로만 이해하고 넘어가세요. 자세한 내용은 '상태와 Hooks'
        섹션에서 다룹니다.
      </Callout>
    </>
  );
}
