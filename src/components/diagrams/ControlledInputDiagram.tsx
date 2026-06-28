import Diagram from './Diagram';

// 시계 방향 사이클: 4개 노드를 사각 배치하고 화살표로 잇는다.
const NODES = [
  { x: 200, y: 30, w: 200, h: 46, label: '입력창에 타이핑', sub: '사용자' },
  { x: 410, y: 95, w: 180, h: 46, label: 'onChange(e)', sub: 'e.target.value' },
  { x: 200, y: 160, w: 200, h: 46, label: 'setState(값)', sub: '상태 갱신' },
  { x: 10, y: 95, w: 180, h: 46, label: 'value = state', sub: '리렌더로 반영' },
];

export default function ControlledInputDiagram() {
  return (
    <Diagram
      title="제어 컴포넌트 데이터 흐름"
      viewBox="0 0 600 230"
      caption="입력 → onChange → setState → 리렌더로 value 반영. 화면의 값과 state가 항상 일치한다."
    >
      <defs>
        <marker
          id="arrow-ctrl"
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

      {NODES.map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
          <text x={n.x + n.w / 2} y={n.y + 20} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
            {n.label}
          </text>
          <text x={n.x + n.w / 2} y={n.y + 37} textAnchor="middle" fill="var(--text-dim)" fontSize={11}>
            {n.sub}
          </text>
        </g>
      ))}

      {/* 시계 방향 화살표 */}
      <line x1={400} y1={62} x2={448} y2={92} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-ctrl)" />
      <line x1={448} y1={141} x2={400} y2={172} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-ctrl)" />
      <line x1={200} y1={183} x2={152} y2={141} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-ctrl)" />
      <line x1={152} y1={92} x2={200} y2={62} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-ctrl)" />
    </Diagram>
  );
}
