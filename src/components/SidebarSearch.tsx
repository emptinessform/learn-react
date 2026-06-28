import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarSearch({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onNavigate?.();
    }
  };

  return (
    <form onSubmit={submit} role="search" style={{ margin: '0 0 1rem' }}>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="검색…"
        aria-label="사이드바 검색"
        style={{
          width: '100%',
          background: 'var(--surface-2)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.4rem 0.6rem',
          fontSize: '0.9rem',
        }}
      />
    </form>
  );
}
