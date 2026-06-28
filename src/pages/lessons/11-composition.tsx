import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Composition11() {
  return (
    <>
      <Section title="컴포넌트 합성">
        <p>
          React에서는 작은 컴포넌트를 조립해 큰 화면을 만듭니다. 이를{' '}
          <TermLink termId="composition">합성(composition)</TermLink>이라고 합니다. 핵심 도구는{' '}
          <TermLink termId="props">props</TermLink>의 특별한 값인 <code>children</code>입니다 — 여는
          태그와 닫는 태그 사이의 내용이 children으로 전달됩니다.
        </p>
        <CodeBlock
          code={`function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

// 사용: 사이의 내용이 children이 된다
<Card title="공지">
  <p>오늘 휴무입니다.</p>
</Card>`}
          caption="Card는 무엇이 들어올지 모른 채, 받은 children을 자리에 끼워 넣는다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>Card 사이에 아무 내용이나 넣어 보세요. Card는 그대로 감싸서 보여줍니다.</p>
        <Playground
          noInline
          initialCode={`function Card({ title, children }) {
  return (
    <div style={{ border: '1px solid #888', borderRadius: 8, padding: 12 }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="안내">
      <p>이 문단은 children으로 전달됩니다.</p>
      <button>버튼도 가능</button>
    </Card>
  );
}

render(<App />);`}
        />
      </Section>

      <Callout type="tip">
        다른 언어의 "상속"으로 기능을 확장하기보다, React에서는 컴포넌트를 <strong>합성</strong>해 재사용합니다.
        레이아웃·모달·카드처럼 "겉은 같고 속만 다른" 경우에 children이 특히 유용합니다.
      </Callout>
    </>
  );
}
