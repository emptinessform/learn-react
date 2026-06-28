import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Forms06() {
  return (
    <>
      <Section title="폼 다루기">
        <p>
          React에서 입력 폼은 보통 입력값을 <TermLink termId="state">state</TermLink>로 관리합니다.
          입력 요소의 <code>value</code>를 state에 연결하고, <code>onChange</code>로 state를 갱신하는
          방식을 <TermLink termId="controlled-component">제어 컴포넌트</TermLink>라고 부릅니다.
        </p>
        <CodeBlock
          code={`const [name, setName] = useState('');

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
          caption="value는 state에서, 변경은 onChange에서 — 입력값의 '진실의 출처'가 state 하나로 모인다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>입력창에 글자를 쳐 보세요. 입력하는 즉시 아래 미리보기에 반영됩니다.</p>
        <Playground
          noInline
          initialCode={`function NameForm() {
  const [name, setName] = useState('');
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <p>입력한 이름: {name || '(아직 없음)'}</p>
    </div>
  );
}

render(<NameForm />);`}
        />
      </Section>

      <Section title="제출 다루기">
        <p>
          폼 제출 시 브라우저의 기본 새로고침을 막으려면 <code>onSubmit</code>에서{' '}
          <code>e.preventDefault()</code>를 호출합니다.
        </p>
        <CodeBlock
          code={`function handleSubmit(e) {
  e.preventDefault();
  // 제출 처리...
}

<form onSubmit={handleSubmit}>...</form>`}
        />
      </Section>

      <Callout type="info">
        제어 컴포넌트의 핵심은 "화면에 보이는 값 = state"라는 점입니다. 덕분에 입력값 검증·초기화·자동
        완성 같은 처리를 모두 state 한 곳에서 다룰 수 있습니다.
      </Callout>
    </>
  );
}
