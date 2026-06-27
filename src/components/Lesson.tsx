import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export type LessonNav = { id: string; title: string };

export default function Lesson({
  id,
  title,
  prev,
  next,
  children,
}: {
  id: string;
  title: string;
  prev?: LessonNav;
  next?: LessonNav;
  children: React.ReactNode;
}) {
  const { isDone, toggle } = useProgress();
  const done = isDone(id);

  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{title}</h1>
        <button
          onClick={() => toggle(id)}
          style={{
            cursor: 'pointer',
            border: `1px solid ${done ? 'var(--ok)' : 'var(--border)'}`,
            background: done ? 'rgba(74,222,128,0.15)' : 'var(--surface-2)',
            color: 'var(--text)',
            borderRadius: '999px',
            padding: '0.4rem 0.9rem',
          }}
        >
          {done ? '✓ 완료함' : '완료로 표시'}
        </button>
      </header>

      {children}

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2.5rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '1rem',
        }}
      >
        <span>{prev && <Link to={`/lesson/${prev.id}`}>← {prev.title}</Link>}</span>
        <span>{next && <Link to={`/lesson/${next.id}`}>{next.title} →</Link>}</span>
      </nav>
    </article>
  );
}
