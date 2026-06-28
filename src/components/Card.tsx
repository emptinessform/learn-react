export default function Card({
  id,
  style,
  children,
}: {
  id?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1rem',
        background: 'var(--surface)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
