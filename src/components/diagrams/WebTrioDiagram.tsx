import Diagram from './Diagram';

function Box({ x, label, role, color }: { x: number; label: string; role: string; color: string }) {
  return (
    <g>
      <rect x={x} y={70} width={150} height={90} rx={10} fill="var(--surface)" stroke={color} strokeWidth={2} />
      <text x={x + 75} y={105} textAnchor="middle" fill={color} fontSize={20} fontWeight="bold">
        {label}
      </text>
      <text x={x + 75} y={135} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        {role}
      </text>
    </g>
  );
}

export default function WebTrioDiagram() {
  return (
    <Diagram
      title="웹 페이지의 3요소"
      caption="HTML은 구조, CSS는 표현, JavaScript는 동작을 담당한다."
    >
      <text x={300} y={40} textAnchor="middle" fill="var(--text)" fontSize={18} fontWeight="bold">
        하나의 웹 페이지
      </text>
      <Box x={30} label="HTML" role="구조 (뼈대)" color="#e08a5b" />
      <Box x={225} label="CSS" role="표현 (꾸밈)" color="#6ea8fe" />
      <Box x={420} label="JS" role="동작 (상호작용)" color="#f7d774" />
      <text x={300} y={210} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        React는 이 셋 중 주로 "동작 + 구조"를 더 잘 다루기 위해 등장했다.
      </text>
    </Diagram>
  );
}
