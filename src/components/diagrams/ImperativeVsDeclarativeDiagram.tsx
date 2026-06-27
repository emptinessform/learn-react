import Diagram from './Diagram';

const IMPERATIVE_STEPS = [
  '1. 요소 찾기 (querySelector)',
  '2. 값 직접 바꾸기',
  '3. 이벤트 다시 연결',
  '4. 상태를 손으로 추적',
];

export default function ImperativeVsDeclarativeDiagram() {
  return (
    <Diagram
      title="명령형 vs 선언형"
      viewBox="0 0 640 320"
      caption="명령형은 '어떻게'를 단계마다 지시하고, 선언형은 '무엇을' 선언하면 React가 처리한다."
    >
      <defs>
        <marker
          id="arrow-decl"
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

      {/* 좌: 명령형 */}
      <text x={155} y={28} textAnchor="middle" fill="#e08a5b" fontSize={16} fontWeight="bold">
        명령형 (직접 DOM 조작)
      </text>
      {IMPERATIVE_STEPS.map((label, i) => (
        <g key={label}>
          <rect
            x={20}
            y={48 + i * 46}
            width={270}
            height={36}
            rx={8}
            fill="var(--surface)"
            stroke="#e08a5b"
            strokeWidth={1.5}
          />
          <text x={36} y={71 + i * 46} fill="var(--text)" fontSize={13}>
            {label}
          </text>
        </g>
      ))}
      <line
        x1={155}
        y1={48 + IMPERATIVE_STEPS.length * 46 - 2}
        x2={155}
        y2={262}
        stroke="var(--text-dim)"
        strokeWidth={2}
        markerEnd="url(#arrow-decl)"
      />
      <rect x={70} y={264} width={170} height={40} rx={8} fill="var(--surface-2)" stroke="var(--border)" />
      <text x={155} y={289} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
        실제 DOM
      </text>

      {/* 우: 선언형 */}
      <text x={485} y={28} textAnchor="middle" fill="var(--accent)" fontSize={16} fontWeight="bold">
        선언형 (React)
      </text>
      <rect x={350} y={48} width={270} height={48} rx={8} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.5} />
      <text x={485} y={70} textAnchor="middle" fill="var(--text)" fontSize={13}>
        원하는 결과를 상태(state)로
      </text>
      <text x={485} y={88} textAnchor="middle" fill="var(--text)" fontSize={13}>
        "선언"만 한다
      </text>

      <line x1={485} y1={98} x2={485} y2={142} stroke="var(--text-dim)" strokeWidth={2} markerEnd="url(#arrow-decl)" />
      <rect x={350} y={144} width={270} height={44} rx={8} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.5} />
      <text x={485} y={171} textAnchor="middle" fill="var(--text)" fontSize={13}>
        React가 차이를 계산해 처리
      </text>

      <line x1={485} y1={190} x2={485} y2={262} stroke="var(--text-dim)" strokeWidth={2} markerEnd="url(#arrow-decl)" />
      <rect x={400} y={264} width={170} height={40} rx={8} fill="var(--surface-2)" stroke="var(--border)" />
      <text x={485} y={289} textAnchor="middle" fill="var(--text)" fontSize={14} fontWeight="bold">
        실제 DOM
      </text>
    </Diagram>
  );
}
