type PillTone = 'accent' | 'ok' | 'warn' | 'bad' | 'neutral';

const COLOR: Record<PillTone, string> = {
  accent: 'var(--accent)',
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  bad: 'var(--bad)',
  neutral: 'var(--text-dim)',
};

export default function Pill({
  tone = 'accent',
  children,
}: {
  tone?: PillTone;
  children: React.ReactNode;
}) {
  const c = COLOR[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.72rem',
        fontWeight: 'bold',
        color: c,
        border: `1px solid ${c}`,
        borderRadius: '999px',
        padding: '0.1rem 0.5rem',
        lineHeight: 1.6,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
