type CalloutType = 'tip' | 'warn' | 'info' | 'key' | 'insight';

const STYLES: Record<CalloutType, { border: string; label: string }> = {
  tip: { border: 'var(--ok)', label: '💡 팁' },
  warn: { border: 'var(--warn)', label: '⚠️ 주의' },
  info: { border: 'var(--accent)', label: 'ℹ️ 참고' },
  key: { border: 'var(--accent-strong)', label: '🔑 핵심' },
  insight: { border: 'var(--accent)', label: '✦ 통찰' },
};

export default function Callout({
  type = 'info',
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const s = STYLES[type];
  const emphasized = type === 'key';
  return (
    <div
      style={{
        borderLeft: `4px solid ${s.border}`,
        background: emphasized
          ? 'color-mix(in srgb, var(--accent) 8%, var(--surface-2))'
          : 'var(--surface-2)',
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
