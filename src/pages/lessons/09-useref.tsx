import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function UseRef09() {
  return (
    <>
      <Section title="useRef로 값·DOM 참조하기">
        <p>
          <code>useRef</code>는 두 가지 용도로 씁니다. 하나는 실제 DOM 요소에 접근하는 것, 다른 하나는
          리렌더와 무관하게 값을 보관하는 것입니다. <code>ref.current</code>에 값이 담기며, 이 값을
          바꿔도 화면은 다시 그려지지 않습니다.
        </p>
        <CodeBlock
          code={`const inputRef = useRef(null);

// JSX에서 연결
<input ref={inputRef} />

// 나중에 DOM 직접 사용
inputRef.current.focus();`}
          caption="ref를 요소의 ref 속성에 연결하면 current로 그 DOM에 접근할 수 있다."
        />
      </Section>

      <Section title="state와의 차이">
        <p>
          <TermLink termId="state">state</TermLink>는 바뀌면 화면을 다시 그리지만, ref는 그렇지 않습니다.
          "화면에 보여줄 값"은 state, "화면과 무관하게 들고만 있을 값"(타이머 id, DOM 등)은 ref가
          적합합니다.
        </p>
      </Section>

      <Section title="직접 해보기">
        <p>버튼을 누르면 입력창에 자동으로 커서가 갑니다(focus). ref로 DOM을 직접 다루는 예입니다.</p>
        <Playground
          noInline
          initialCode={`function FocusInput() {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} placeholder="여기에 포커스됩니다" />{' '}
      <button onClick={() => inputRef.current.focus()}>입력창에 포커스</button>
    </div>
  );
}

render(<FocusInput />);`}
        />
      </Section>

      <Callout type="info">
        DOM을 직접 만지는 일은 가능하면 줄이고, 대부분은 state로 선언형으로 처리하는 것이 React다운
        방식입니다. ref는 focus·스크롤·타이머 보관처럼 꼭 필요할 때 씁니다.
      </Callout>
    </>
  );
}
