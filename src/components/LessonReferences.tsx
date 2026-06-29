import { references } from '../content/references';

export default function LessonReferences({ id }: { id: string }) {
  const list = references[id];
  if (!list || list.length === 0) return null;

  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
        <span aria-hidden="true">📚</span> 더 읽어보기
      </h3>
      <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
        {list.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
