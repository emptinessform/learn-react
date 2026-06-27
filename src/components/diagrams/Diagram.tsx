export default function Diagram({
  title,
  caption,
  viewBox = '0 0 600 260',
  children,
}: {
  title: string;
  caption?: string;
  viewBox?: string;
  children: React.ReactNode;
}) {
  return (
    <figure style={{ margin: '1.5rem 0' }}>
      <svg
        role="img"
        aria-label={title}
        viewBox={viewBox}
        style={{
          width: '100%',
          height: 'auto',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
        }}
      >
        <title>{title}</title>
        {children}
      </svg>
      {caption && (
        <figcaption style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
