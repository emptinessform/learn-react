import { glossary } from '../content/glossary';

export default function Glossary() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>용어 사전</h1>
      <p>학습하면서 마주친 용어를 한곳에 모아 정리합니다.</p>
      <dl>
        {glossary.map((t) => (
          <div key={t.id} id={t.id} style={{ margin: '1.2rem 0', scrollMarginTop: '1rem' }}>
            <dt style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{t.term}</dt>
            <dd style={{ margin: '0.3rem 0 0' }}>{t.definition}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
