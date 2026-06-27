import Diagram from './Diagram';

type NodeBox = { id: string; x: number; y: number; label: string };

const NODES: NodeBox[] = [
  { id: 'app', x: 245, y: 30, label: '<App>' },
  { id: 'header', x: 90, y: 120, label: '<Header>' },
  { id: 'main', x: 245, y: 120, label: '<Main>' },
  { id: 'footer', x: 400, y: 120, label: '<Footer>' },
  { id: 'sidebar', x: 170, y: 210, label: '<Sidebar>' },
  { id: 'content', x: 320, y: 210, label: '<Content>' },
];

const EDGES: [string, string][] = [
  ['app', 'header'],
  ['app', 'main'],
  ['app', 'footer'],
  ['main', 'sidebar'],
  ['main', 'content'],
];

const NODE_W = 110;
const NODE_H = 44;

function center(n: NodeBox) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}

export default function ComponentTreeDiagram() {
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
  return (
    <Diagram
      title="컴포넌트 트리와 단방향 데이터 흐름"
      viewBox="0 0 560 290"
      caption="UI는 컴포넌트 트리로 구성되고, 데이터(props)는 부모에서 자식으로 한 방향으로만 흐른다."
    >
      <defs>
        <marker
          id="arrow-tree"
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

      {EDGES.map(([from, to]) => {
        const a = center(byId[from]);
        const b = center(byId[to]);
        return (
          <line
            key={`${from}-${to}`}
            x1={a.cx}
            y1={a.cy + NODE_H / 2}
            x2={b.cx}
            y2={b.cy - NODE_H / 2 - 2}
            stroke="var(--accent)"
            strokeWidth={2}
            markerEnd="url(#arrow-tree)"
          />
        );
      })}

      {NODES.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width={NODE_W} height={NODE_H} rx={9} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
          <text x={n.x + NODE_W / 2} y={n.y + NODE_H / 2 + 5} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
            {n.label}
          </text>
        </g>
      ))}

      <text x={480} y={150} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        props ↓
      </text>
      <text x={480} y={170} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        (위 → 아래)
      </text>
    </Diagram>
  );
}
