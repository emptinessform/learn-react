import { Link, useSearchParams } from 'react-router-dom';
import { searchAll } from '../lib/search';
import Card from '../components/Card';

const BADGE: Record<string, string> = {
  강의: 'var(--accent)',
  용어: 'var(--ok)',
  'Q&A': 'var(--warn)',
};

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const results = searchAll(query);

  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>검색</h1>
      <input
        type="search"
        value={query}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        placeholder="강의·용어·Q&A에서 검색…"
        aria-label="검색어"
        autoFocus
        style={{
          width: '100%',
          background: 'var(--surface-2)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.6rem 0.8rem',
          fontSize: '1rem',
        }}
      />

      {query.trim() === '' ? (
        <p style={{ color: 'var(--text-dim)' }}>검색어를 입력하세요.</p>
      ) : results.length === 0 ? (
        <p style={{ color: 'var(--text-dim)' }}>“{query}”에 대한 결과가 없습니다.</p>
      ) : (
        <>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{results.length}개 결과</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((r) => (
              <li key={`${r.type}:${r.to}`} style={{ margin: '0.6rem 0' }}>
                <Card style={{ padding: '0.8rem 1rem' }}>
                  <Link to={r.to}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: BADGE[r.type],
                      border: `1px solid ${BADGE[r.type]}`,
                      borderRadius: '999px',
                      padding: '0.1rem 0.5rem',
                      marginRight: '0.5rem',
                    }}
                  >
                    {r.type}
                  </span>
                  <strong>{r.title}</strong>
                </Link>
                <p
                  style={{
                    margin: '0.3rem 0 0',
                    color: 'var(--text-dim)',
                    fontSize: '0.9rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  >
                    {r.snippet}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
