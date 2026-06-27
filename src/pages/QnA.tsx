import { qa } from '../content/qa';

export default function QnA() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>Q&amp;A 모음</h1>
      <p>학습 중 나온 질문과 답을 누적합니다.</p>
      {qa.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
            margin: '1rem 0',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem' }}>Q. {item.question}</h3>
          <p style={{ margin: 0 }}>A. {item.answer}</p>
          <small style={{ color: 'var(--text-dim)' }}>{item.date}</small>
        </div>
      ))}
    </article>
  );
}
