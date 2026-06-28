import { NavLink } from 'react-router-dom';
import { lessonsBySection } from '../curriculum';
import { useProgress } from '../hooks/useProgress';
import SidebarSearch from './SidebarSearch';
import ThemeToggle from './ThemeToggle';

const REFS = [
  { to: '/', label: '개요' },
  { to: '/foundations', label: '배경과 원리' },
  { to: '/glossary', label: '용어 사전' },
  { to: '/qa', label: 'Q&A 모음' },
  { to: '/search', label: '검색' },
];

export default function Sidebar() {
  const { isDone } = useProgress();
  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        padding: '1rem',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
      }}
    >
      <ThemeToggle />
      <SidebarSearch />

      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>참고 자료</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {REFS.map((r) => (
          <li key={r.to}>
            <NavLink to={r.to} end style={{ display: 'block', padding: '0.3rem 0' }}>
              {r.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>커리큘럼</h3>
      {lessonsBySection().map((sec) => (
        <div key={sec.name}>
          <div style={{ fontWeight: 'bold', marginTop: '0.8rem' }}>{sec.name}</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sec.lessons.map((l) => (
              <li key={l.id}>
                <NavLink to={`/lesson/${l.id}`} style={{ display: 'block', padding: '0.25rem 0' }}>
                  {isDone(l.id) ? '✓ ' : '○ '}
                  {l.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
