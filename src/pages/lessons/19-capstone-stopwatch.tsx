import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function CapstoneStopwatch19() {
  return (
    <>
      <Section title="캡스톤: 스톱워치 만들기">
        <p>
          이번엔 시간이 흐르는 화면을 만들어 봅니다. 핵심은{' '}
          <TermLink termId="side-effect">사이드 이펙트</TermLink>인 타이머를{' '}
          <code>useEffect</code>로 켜고 끄고, 멈출 때 반드시 정리(cleanup)하는 것입니다.
        </p>
      </Section>

      <Section title="동작 설계">
        <p>
          경과 시간(<TermLink termId="state">state</TermLink>)과 "실행 중인지" 두 상태를 둡니다. 실행
          중일 때만 인터벌을 돌리고, 멈추거나 화면을 떠날 때 인터벌을 정리합니다.
        </p>
        <CodeBlock
          code={`const [ms, setMs] = useState(0);
const [running, setRunning] = useState(false);

useEffect(() => {
  if (!running) return;                 // 멈춰 있으면 아무것도 안 함
  const id = setInterval(() => setMs((m) => m + 100), 100);
  return () => clearInterval(id);        // 정지·언마운트 시 정리
}, [running]);                            // running이 바뀔 때만 재설정`}
          caption="정리 함수가 없으면 시작/정지를 반복할 때 인터벌이 쌓여 시간이 더 빨리 흐른다."
        />
      </Section>

      <Section title="완성된 스톱워치 — 직접 해보기">
        <p>시작/정지/리셋을 눌러 보세요. 정지 후 다시 시작하면 이어서 셉니다.</p>
        <Playground
          noInline
          initialCode={`function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setMs((m) => m + 100), 100);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div>
      <p style={{ fontSize: '1.8rem', margin: '0 0 0.5rem' }}>
        {(ms / 1000).toFixed(1)}초
      </p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? '정지' : '시작'}
      </button>{' '}
      <button onClick={() => { setRunning(false); setMs(0); }}>리셋</button>
    </div>
  );
}

render(<Stopwatch />);`}
        />
      </Section>

      <Callout type="tip">
        <code>setMs((m) =&gt; m + 100)</code>처럼 함수형 업데이트를 쓰면 이펙트의{' '}
        <TermLink termId="dependency-array">의존성 배열</TermLink>에 ms를 넣지 않아도 됩니다. 덕분에
        매 틱마다 인터벌을 다시 만들지 않고, running이 바뀔 때만 깔끔하게 켜고 끕니다.
      </Callout>

      <Callout type="info">
        도전: "랩(lap) 기록" 버튼을 추가해 보세요. laps 배열 state를 두고 버튼을 누를 때 현재 ms를
        추가한 뒤, map과 key로 목록을 렌더하면 됩니다.
      </Callout>
    </>
  );
}
