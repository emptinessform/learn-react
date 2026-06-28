import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const [theme, toggle] = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="테마 전환"
      style={{
        cursor: 'pointer',
        width: '100%',
        border: '1px solid var(--border)',
        background: 'var(--surface-2)',
        color: 'var(--text)',
        borderRadius: 'var(--radius)',
        padding: '0.35rem 0.6rem',
        fontSize: '0.85rem',
        marginBottom: '1rem',
      }}
    >
      {theme === 'dark' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
    </button>
  );
}
