import Diagram from './Diagram';

const STEPS = [
  { x: 10, label: '사용자 동작', sub: '클릭·입력 등' },
  { x: 168, label: 'setState(새 값)', sub: '상태 변경 요청' },
  { x: 326, label: '컴포넌트 재실행', sub: '함수 다시 호출' },
  { x: 484, label: '화면 갱신', sub: '바뀐 곳만' },
];

const BOX_W = 130;
const BOX_H = 56;
const BOX_Y = 40;

export default function StateUpdateDiagram() {
  return (
    <Diagram
      title="state 변경 → 재렌더 사이클"
      viewBox="0 0 640 200"
      caption="setState로 새 값을 넘기면 React가 컴포넌트를 다시 실행해 화면을 갱신한다."
    >
      <defs>
        <marker
          id="arrow-state"
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
          <text x={s.x + BOX_W / 2} y={BOX_Y + 24} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
            {s.label}
          </text>
          <text x={s.x + BOX_W / 2} y={BOX_Y + 42} textAnchor="middle" fill="var(--text-dim)" fontSize={11}>
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
              markerEnd="url(#arrow-state)"
            />
          )}
        </g>
      ))}

      {/* 화면 갱신 → 다음 사용자 동작으로 되돌아가는 반복 화살표 */}
      <path
        d="M549 96 C549 150, 75 150, 75 102"
        fill="none"
        stroke="var(--text-dim)"
        strokeWidth={2}
        strokeDasharray="5 4"
        markerEnd="url(#arrow-state)"
      />
      <text x={312} y={168} textAnchor="middle" fill="var(--text-dim)" fontSize={12}>
        다시 상호작용하면 이 과정을 반복한다
      </text>
    </Diagram>
  );
}
