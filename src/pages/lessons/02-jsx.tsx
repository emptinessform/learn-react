import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import TermLink from '../../components/TermLink';

export default function Jsx02() {
  return (
    <>
      <Section title="JSX 이해하기">
        <p>
          <TermLink termId="jsx">JSX</TermLink>는 자바스크립트 안에서 UI를 HTML과 비슷한 문법으로
          표현하는 방법입니다. 아래 코드는 빌드 시 일반 함수 호출로 변환됩니다.
        </p>
        <CodeBlock
          code={`const element = <h1>안녕, React</h1>;`}
          caption="JSX 한 줄 — 화면에 제목을 표시한다."
        />
      </Section>
      <Section title="직접 해보기">
        <p>아래 코드를 고치면 오른쪽 미리보기가 즉시 바뀝니다.</p>
        <Playground
          noInline
          initialCode={`function App() {
  const name = '여러분';
  return <h2>JSX로 인사하기: 안녕, {name}!</h2>;
}

render(<App />);`}
        />
      </Section>
    </>
  );
}
