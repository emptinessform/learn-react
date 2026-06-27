import Diagram from './Diagram';

const STEPS = [
  { x: 8, label: '상태 변경' },
  { x: 162, label: '새 Virtual DOM' },
  { x: 316, label: '이전과 비교 (diff)' },
  { x: 470, label: '바뀐 노드만 패치' },
];

const STEP_W = 140;

function Node({ cx, cy, fill, stroke }: { cx: number; cy: number; fill: string; stroke: string }) {
  return <circle cx={cx} cy={cy} r={16} fill={fill} stroke={stroke} strokeWidth={2} />;
}

export default function VirtualDomDiagram() {
  return (
    <Diagram
      title="Virtual DOM 동작"
      viewBox="0 0 640 320"
      caption="새 트리를 이전 트리와 비교해, 실제로 바뀐 노드만 DOM에 반영한다."
    >
      <defs>
        <marker
          id="arrow-vdom"
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

      {/* 상단 4단계 흐름 */}
      {STEPS.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y={28} width={STEP_W} height={44} rx={9} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
          <text x={s.x + STEP_W / 2} y={55} textAnchor="middle" fill="var(--text)" fontSize={13} fontWeight="bold">
            {s.label}
          </text>
          {i < STEPS.length - 1 && (
            <line
              x1={s.x + STEP_W + 1}
              y1={50}
              x2={STEPS[i + 1].x - 2}
              y2={50}
              stroke="var(--text-dim)"
              strokeWidth={2}
              markerEnd="url(#arrow-vdom)"
            />
          )}
        </g>
      ))}

      {/* 이전 VDOM 트리 */}
      <text x={140} y={120} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        이전 Virtual DOM
      </text>
      <line x1={140} y1={150} x2={100} y2={205} stroke="var(--border)" strokeWidth={2} />
      <line x1={140} y1={150} x2={180} y2={205} stroke="var(--border)" strokeWidth={2} />
      <Node cx={140} cy={140} fill="var(--surface)" stroke="var(--text-dim)" />
      <Node cx={100} cy={215} fill="var(--surface)" stroke="var(--text-dim)" />
      <Node cx={180} cy={215} fill="var(--surface)" stroke="var(--text-dim)" />

      {/* 새 VDOM 트리 (한 노드 변경) */}
      <text x={360} y={120} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        새 Virtual DOM
      </text>
      <line x1={360} y1={150} x2={320} y2={205} stroke="var(--border)" strokeWidth={2} />
      <line x1={360} y1={150} x2={400} y2={205} stroke="var(--border)" strokeWidth={2} />
      <Node cx={360} cy={140} fill="var(--surface)" stroke="var(--text-dim)" />
      <Node cx={320} cy={215} fill="rgba(251,191,36,0.25)" stroke="var(--warn)" />
      <Node cx={400} cy={215} fill="var(--surface)" stroke="var(--text-dim)" />
      <text x={320} y={255} textAnchor="middle" fill="var(--warn)" fontSize={12}>
        바뀐 노드
      </text>

      {/* 실제 DOM 으로 최소 패치 */}
      <line x1={336} y1={215} x2={470} y2={215} stroke="var(--text-dim)" strokeWidth={2} markerEnd="url(#arrow-vdom)" />
      <rect x={472} y={192} width={150} height={46} rx={9} fill="var(--surface-2)" stroke="var(--ok)" strokeWidth={2} />
      <text x={547} y={212} textAnchor="middle" fill="var(--text)" fontSize={13} fontWeight="bold">
        실제 DOM
      </text>
      <text x={547} y={229} textAnchor="middle" fill="var(--ok)" fontSize={11}>
        바뀐 노드만 갱신
      </text>
    </Diagram>
  );
}
