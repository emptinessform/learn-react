import Diagram from './Diagram';

const ITEMS = ['사과', '바나나', '포도'];

export default function ListRenderDiagram() {
  return (
    <Diagram
      title="리스트 렌더링 (map + key)"
      viewBox="0 0 600 210"
      caption="배열의 각 항목을 map으로 JSX로 변환하고, key로 항목을 식별한다."
    >
      <defs>
        <marker
          id="arrow-list"
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

      {/* 배열 */}
      <rect x={20} y={60} width={170} height={90} rx={10} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
      <text x={105} y={50} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        배열
      </text>
      {ITEMS.map((it, i) => (
        <text key={it} x={105} y={88 + i * 22} textAnchor="middle" fill="var(--text)" fontSize={14}>
          '{it}'
        </text>
      ))}

      {/* 변환 화살표 */}
      <line x1={192} y1={105} x2={330} y2={105} stroke="var(--text-dim)" strokeWidth={2} markerEnd="url(#arrow-list)" />
      <text x={261} y={95} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        .map()
      </text>

      {/* 결과 리스트 */}
      {ITEMS.map((it, i) => (
        <g key={it}>
          <rect x={345} y={56 + i * 36} width={230} height={30} rx={7} fill="var(--surface)" stroke="var(--border)" strokeWidth={1.5} />
          <text x={360} y={76 + i * 36} fill="var(--text)" fontSize={13}>
            {`<li key="${it}">${it}</li>`}
          </text>
        </g>
      ))}
    </Diagram>
  );
}
