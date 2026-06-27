import Diagram from './Diagram';

type Step = { x: number; label: string; sub: string };

const STEPS: Step[] = [
  { x: 8, label: '프로젝트 생성', sub: 'Vite' },
  { x: 123, label: '컴포넌트 작성', sub: 'JSX / TSX' },
  { x: 238, label: 'props·state 연결', sub: '데이터·동작' },
  { x: 353, label: '개발 서버', sub: 'HMR로 즉시 확인' },
  { x: 468, label: '빌드', sub: 'npm run build' },
  { x: 583, label: '배포', sub: 'dist/ 공개' },
];

const BOX_W = 105;
const BOX_H = 64;
const BOX_Y = 70;

export default function ReactWorkflowDiagram() {
  return (
    <Diagram
      title="React 개발 과정"
      viewBox="0 0 700 190"
      caption="프로젝트 생성부터 배포까지 — 이 사이트도 같은 흐름으로 만들어졌다."
    >
      <defs>
        <marker
          id="arrow-flow"
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

      {STEPS.map((s, i) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx={10}
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth={2}
          />
          <text x={s.x + BOX_W / 2} y={BOX_Y + 27} textAnchor="middle" fill="var(--text)" fontSize={13} fontWeight="bold">
            {s.label}
          </text>
          <text x={s.x + BOX_W / 2} y={BOX_Y + 47} textAnchor="middle" fill="var(--text-dim)" fontSize={11}>
            {s.sub}
          </text>
          {i < STEPS.length - 1 && (
            <line
              x1={s.x + BOX_W + 1}
              y1={BOX_Y + BOX_H / 2}
              x2={STEPS[i + 1].x - 2}
              y2={BOX_Y + BOX_H / 2}
              stroke="var(--text-dim)"
              strokeWidth={2}
              markerEnd="url(#arrow-flow)"
            />
          )}
        </g>
      ))}

      <text x={350} y={175} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        작성 → 개발 서버에서 확인을 빠르게 반복하다가, 완성되면 빌드해서 배포한다.
      </text>
    </Diagram>
  );
}
