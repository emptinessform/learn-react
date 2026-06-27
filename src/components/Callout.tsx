const STYLES: Record<string, { border: string; label: string }> = {
  tip: { border: 'var(--ok)', label: '💡 팁' },
  warn: { border: 'var(--warn)', label: '⚠️ 주의' },
  info: { border: 'var(--accent)', label: 'ℹ️ 참고' },
};

export default function Callout({
  type = 'info',
  children,
}: {
  type?: 'tip' | 'warn' | 'info';
  children: React.ReactNode;
}) {
  const s = STYLES[type];
  return (
    <div
      style={{
        borderLeft: `4px solid ${s.border}`,
        background: 'var(--surface-2)',
        padding: '0.8rem 1rem',
        borderRadius: '6px',
        margin: '1rem 0',
      }}
    >
      <strong>{s.label}</strong>
      <div>{children}</div>
    </div>
  );
}
