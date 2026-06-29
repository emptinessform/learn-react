import Diagram from './Diagram';

export default function CustomHookDiagram() {
  return (
    <Diagram
      title="커스텀 훅으로 로직 공유"
      viewBox="0 0 600 220"
      caption="같은 훅을 써도 컴포넌트마다 상태는 독립적이다 — 로직을 공유할 뿐 값은 공유하지 않는다."
    >
      <defs>
        <marker
          id="arrow-hook"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* 커스텀 훅 */}
      <rect x={200} y={16} width={200} height={56} rx={10} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
      <text x={300} y={40} textAnchor="middle" fill="var(--text)" fontSize={15} fontWeight="bold">
        useCounter()
      </text>
      <text x={300} y={59} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        상태 로직 (재사용)
      </text>

      {/* 화살표 */}
      <line x1={250} y1={74} x2={150} y2={126} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-hook)" />
      <line x1={350} y1={74} x2={450} y2={126} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-hook)" />
      <text x={120} y={104} textAnchor="middle" fill="var(--text-dim)" fontSize={11}>
        useCounter(0)
      </text>
      <text x={480} y={104} textAnchor="middle" fill="var(--text-dim)" fontSize={11}>
        useCounter(10)
      </text>

      {/* 컴포넌트 A */}
      <rect x={40} y={130} width={210} height={64} rx={10} fill="var(--surface)" stroke="var(--border)" strokeWidth={1.5} />
      <text x={145} y={158} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
        {'<CompA>'}
      </text>
      <text x={145} y={180} textAnchor="middle" fill="var(--ok)" fontSize={13}>
        count: 0 (독립)
      </text>

      {/* 컴포넌트 B */}
      <rect x={350} y={130} width={210} height={64} rx={10} fill="var(--surface)" stroke="var(--border)" strokeWidth={1.5} />
      <text x={455} y={158} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
        {'<CompB>'}
      </text>
      <text x={455} y={180} textAnchor="middle" fill="var(--ok)" fontSize={13}>
        count: 10 (독립)
      </text>
    </Diagram>
  );
}
