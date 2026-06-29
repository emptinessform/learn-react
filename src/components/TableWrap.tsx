/**
 * 가로 스크롤 가능한 표 래퍼. 안에 일반 <table>을 넣으면
 * 전역 .data-table 스타일(테두리·sticky 헤더)이 적용된다.
 */
export default function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        overflowX: 'auto',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        margin: '1.2rem 0',
      }}
    >
      <table className="data-table">{children}</table>
    </div>
  );
}
