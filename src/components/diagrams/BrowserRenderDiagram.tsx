import Diagram from './Diagram';

type Stage = { x: number; label: string; sub: string };

const STAGES: Stage[] = [
  { x: 8, label: 'HTML + CSS', sub: '소스 코드' },
  { x: 142, label: 'DOM + CSSOM', sub: '파싱' },
  { x: 276, label: '렌더 트리', sub: '결합' },
  { x: 410, label: '레이아웃', sub: '위치·크기 계산' },
  { x: 544, label: '페인트 → 화면', sub: '픽셀 그리기' },
];

const BOX_W = 115;
const BOX_H = 60;
const BOX_Y = 92;

export default function BrowserRenderDiagram() {
  return (
    <Diagram
      title="브라우저 렌더링 흐름"
      viewBox="0 0 680 200"
      caption="브라우저는 소스를 파싱해 트리로 만들고, 배치한 뒤 화면에 그린다."
    >
      <defs>
        <marker
          id="arrow-render"
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

      {STAGES.map((s, i) => (
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
          <text
            x={s.x + BOX_W / 2}
            y={BOX_Y + 26}
            textAnchor="middle"
            fill="var(--text)"
            fontSize={15}
            fontWeight="bold"
          >
            {s.label}
          </text>
          <text
            x={s.x + BOX_W / 2}
            y={BOX_Y + 46}
            textAnchor="middle"
            fill="var(--text-dim)"
            fontSize={12}
          >
            {s.sub}
          </text>
          {i < STAGES.length - 1 && (
            <line
              x1={s.x + BOX_W + 1}
              y1={BOX_Y + BOX_H / 2}
              x2={STAGES[i + 1].x - 2}
              y2={BOX_Y + BOX_H / 2}
              stroke="var(--text-dim)"
              strokeWidth={2}
              markerEnd="url(#arrow-render)"
            />
          )}
        </g>
      ))}

      <text x={340} y={185} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        이 과정을 매번 손으로 다시 시키는 것이 "DOM 직접 조작"이다.
      </text>
    </Diagram>
  );
}
