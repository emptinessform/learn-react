import Diagram from './Diagram';

type Row = { y: number; phase: string; action: string; color: string };

const ROWS: Row[] = [
  { y: 44, phase: '마운트 (처음 등장)', action: '렌더 → 이펙트 실행', color: 'var(--ok)' },
  { y: 110, phase: '의존성 값 변경', action: '정리(cleanup) → 이펙트 다시 실행', color: 'var(--accent)' },
  { y: 176, phase: '언마운트 (사라짐)', action: '정리(cleanup) 실행', color: 'var(--warn)' },
];

export default function UseEffectLifecycleDiagram() {
  return (
    <Diagram
      title="useEffect 생명주기"
      viewBox="0 0 600 240"
      caption="이펙트는 렌더 후 실행되고, 의존성이 바뀌거나 언마운트될 때 정리(cleanup)가 먼저 호출된다."
    >
      <defs>
        <marker
          id="arrow-effect"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text-dim)" />
        </marker>
      </defs>

      {/* 세로 타임라인 축 */}
      <line x1={30} y1={40} x2={30} y2={210} stroke="var(--border)" strokeWidth={2} />

      {ROWS.map((r, i) => (
        <g key={r.phase}>
          <circle cx={30} cy={r.y + 20} r={7} fill={r.color} />
          <rect x={56} y={r.y} width={520} height={48} rx={9} fill="var(--surface)" stroke={r.color} strokeWidth={1.5} />
          <text x={72} y={r.y + 20} fill={r.color} fontSize={14} fontWeight="bold">
            {r.phase}
          </text>
          <text x={72} y={r.y + 39} fill="var(--text)" fontSize={13}>
            {r.action}
          </text>
          {i < ROWS.length - 1 && (
            <line
              x1={30}
              y1={r.y + 48}
              x2={30}
              y2={ROWS[i + 1].y + 8}
              stroke="var(--text-dim)"
              strokeWidth={2}
              markerEnd="url(#arrow-effect)"
            />
          )}
        </g>
      ))}
    </Diagram>
  );
}
