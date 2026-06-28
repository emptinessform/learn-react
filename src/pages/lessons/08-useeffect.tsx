import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';
import UseEffectLifecycleDiagram from '../../components/diagrams/UseEffectLifecycleDiagram';

export default function UseEffect08() {
  return (
    <>
      <Section title="useEffect로 사이드 이펙트 다루기">
        <p>
          데이터 가져오기(fetch), 타이머, 구독처럼 렌더링 바깥에서 일어나는 일을{' '}
          <TermLink termId="side-effect">사이드 이펙트</TermLink>라고 합니다. <code>useEffect</code>는
          렌더링이 끝난 뒤 이런 작업을 실행하게 해 줍니다.
        </p>
        <CodeBlock
          code={`useEffect(() => {
  // 렌더 후 실행할 작업
  document.title = \`클릭 \${count}회\`;
}, [count]); // 의존성 배열`}
          caption="두 번째 인자가 의존성 배열. 그 안의 값이 바뀔 때만 다시 실행된다."
        />
      </Section>

      <Section title="의존성 배열과 정리(cleanup)">
        <p>
          <TermLink termId="dependency-array">의존성 배열</TermLink>이 <code>[]</code>면 처음 한 번만
          실행됩니다. 또 이펙트가 함수를 반환하면 그 함수는 다음 실행 전이나 컴포넌트가 사라질 때
          호출되어, 타이머 해제 같은 <strong>정리</strong>를 합니다.
        </p>
        <CodeBlock
          code={`useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // 정리
}, []);`}
        />
        <UseEffectLifecycleDiagram />
      </Section>

      <Section title="직접 해보기">
        <p>1초마다 자동으로 올라가는 타이머입니다. 정리 함수 덕분에 인터벌이 중복되지 않습니다.</p>
        <Playground
          noInline
          initialCode={`function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{seconds}초 경과</p>;
}

render(<Timer />);`}
        />
      </Section>

      <Callout type="warn">
        의존성 배열을 비우거나 빠뜨리면 의도치 않은 동작이 생깁니다. "이 이펙트가 어떤 값에 의존하는가"를
        떠올려 그 값들을 배열에 정확히 넣는 것이 핵심입니다.
      </Callout>
    </>
  );
}
