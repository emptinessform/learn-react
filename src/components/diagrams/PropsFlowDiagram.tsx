import Diagram from './Diagram';

export default function PropsFlowDiagram() {
  return (
    <Diagram
      title="props 전달 흐름"
      viewBox="0 0 600 220"
      caption="같은 컴포넌트에 다른 props를 넘기면 다른 결과가 나온다."
    >
      <defs>
        <marker
          id="arrow-props"
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

      {/* 부모 */}
      <rect x={215} y={16} width={170} height={44} rx={10} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
      <text x={300} y={43} textAnchor="middle" fill="var(--text)" fontSize={15} fontWeight="bold">
        {'<App> (부모)'}
      </text>

      {/* 화살표 */}
      <line x1={250} y1={62} x2={150} y2={114} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-props)" />
      <line x1={350} y1={62} x2={450} y2={114} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-props)" />
      <text x={185} y={92} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        name="민수"
      </text>
      <text x={420} y={92} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        name="지영"
      </text>

      {/* 자식 1 */}
      <rect x={25} y={118} width={250} height={74} rx={10} fill="var(--surface)" stroke="var(--border)" strokeWidth={1.5} />
      <text x={150} y={146} textAnchor="middle" fill="var(--text)" fontSize={13}>
        {'<Welcome name="민수" />'}
      </text>
      <text x={150} y={172} textAnchor="middle" fill="var(--ok)" fontSize={13}>
        → 안녕, 민수님
      </text>

      {/* 자식 2 */}
      <rect x={325} y={118} width={250} height={74} rx={10} fill="var(--surface)" stroke="var(--border)" strokeWidth={1.5} />
      <text x={450} y={146} textAnchor="middle" fill="var(--text)" fontSize={13}>
        {'<Welcome name="지영" />'}
      </text>
      <text x={450} y={172} textAnchor="middle" fill="var(--ok)" fontSize={13}>
        → 안녕, 지영님
      </text>
    </Diagram>
  );
}
