import { useState } from 'react';
import Card from './Card';
import { quiz, type QuizQuestion } from '../content/quiz';

function QuizItem({ q, index, total }: { q: QuizQuestion; index: number; total: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === q.answer;

  return (
    <Card style={{ margin: '0.8rem 0' }}>
      <p style={{ margin: '0 0 0.6rem', fontWeight: 'bold' }}>
        {total > 1 ? `${index + 1}. ` : ''}
        {q.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.options.map((opt, oi) => {
          const isAnswer = oi === q.answer;
          const isPicked = oi === picked;
          let bg = 'var(--surface-2)';
          let mark = '';
          if (answered && isAnswer) {
            bg = 'rgba(74,222,128,0.15)';
            mark = '✓ ';
          } else if (answered && isPicked) {
            bg = 'rgba(255,107,107,0.15)';
            mark = '✗ ';
          }
          return (
            <button
              key={oi}
              type="button"
              onClick={() => setPicked(oi)}
              disabled={answered}
              style={{
                textAlign: 'left',
                cursor: answered ? 'default' : 'pointer',
                border: '1px solid var(--border)',
                background: bg,
                color: 'var(--text)',
                borderRadius: 'var(--radius)',
                padding: '0.45rem 0.7rem',
                fontSize: '0.95rem',
              }}
            >
              {mark}
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p style={{ margin: '0.6rem 0 0', color: correct ? 'var(--ok)' : 'var(--warn)' }}>
          {correct ? '정답입니다! ' : '아쉬워요. 정답은 위에 ✓로 표시했어요. '}
          {q.explanation}
        </p>
      )}
    </Card>
  );
}

export default function LessonQuiz({ id }: { id: string }) {
  const list = quiz[id];
  if (!list || list.length === 0) return null;

  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>🧩 이해도 점검</h3>
      {list.map((q, i) => (
        <QuizItem key={i} q={q} index={i} total={list.length} />
      ))}
    </section>
  );
}
