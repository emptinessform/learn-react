export default function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure style={{ margin: '1rem 0' }}>
      <pre
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '1rem',
          overflowX: 'auto',
        }}
      >
        <code>{code}</code>
      </pre>
      {caption && (
        <figcaption style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
