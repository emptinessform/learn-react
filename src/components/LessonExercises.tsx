import CodeBlock from './CodeBlock';
import { exercises } from '../content/exercises';

export default function LessonExercises({ id }: { id: string }) {
  const list = exercises[id];
  if (!list || list.length === 0) return null;

  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>✏️ 연습문제</h3>
      {list.map((ex, i) => (
        <div
          key={i}
          style={{
            border: '1px dashed var(--accent)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
            margin: '0.8rem 0',
            background: 'var(--surface)',
          }}
        >
          <p style={{ margin: '0 0 0.5rem' }}>
            {list.length > 1 ? `${i + 1}. ` : ''}
            {ex.question}
          </p>
          <details>
            <summary style={{ cursor: 'pointer', color: 'var(--accent)' }}>
              💡 정답·힌트 보기
            </summary>
            <div style={{ marginTop: '0.6rem' }}>
              <p style={{ margin: 0 }}>{ex.answer}</p>
              {ex.answerCode && <CodeBlock code={ex.answerCode} />}
            </div>
          </details>
        </div>
      ))}
    </section>
  );
}
