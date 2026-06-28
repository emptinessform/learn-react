import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Props03() {
  return (
    <>
      <Section title="props로 데이터 전달하기">
        <p>
          <TermLink termId="props">props</TermLink>는 부모{' '}
          <TermLink termId="component">컴포넌트</TermLink>가 자식 컴포넌트에 건네주는 입력값입니다.
          함수의 인자처럼, 같은 컴포넌트에 다른 값을 넘겨 다른 화면을 만들 수 있습니다.
        </p>
        <CodeBlock
          code={`function Welcome(props) {
  return <h2>안녕, {props.name}!</h2>;
}

// 사용하는 쪽
<Welcome name="민수" />`}
          caption="name이라는 prop을 받아 화면에 표시한다."
        />
      </Section>

      <Section title="구조 분해로 더 깔끔하게">
        <p>
          보통은 props 객체를 통째로 받기보다, 필요한 값만 중괄호로 꺼내 씁니다(구조 분해 할당).
        </p>
        <CodeBlock code={`function Welcome({ name }) {\n  return <h2>안녕, {name}!</h2>;\n}`} />
      </Section>

      <Section title="직접 해보기">
        <p>같은 컴포넌트에 다른 props를 넘겨 보세요. name과 emoji를 바꿔보면 됩니다.</p>
        <Playground
          noInline
          initialCode={`function Welcome({ name, emoji }) {
  return <p>{emoji} 안녕하세요, {name}님!</p>;
}

function App() {
  return (
    <div>
      <Welcome name="민수" emoji="👋" />
      <Welcome name="지영" emoji="✨" />
    </div>
  );
}

render(<App />);`}
        />
      </Section>

      <Callout type="warn">
        props는 <strong>읽기 전용</strong>입니다. 자식 컴포넌트는 받은 props를 직접 바꾸면 안 됩니다.
        값이 바뀌어야 한다면 다음 섹션의 상태(state)를 사용합니다.
      </Callout>
    </>
  );
}
