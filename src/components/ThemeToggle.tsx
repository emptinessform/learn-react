import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const [theme, toggle] = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="테마 전환"
      className="btn"
      style={{ width: '100%', marginBottom: '1rem' }}
    >
      {theme === 'dark' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
    </button>
  );
}
