import { Link } from 'react-router-dom';
import { qa } from '../content/qa';
import { getLesson } from '../curriculum';

export default function QnA() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>Q&amp;A 모음</h1>
      <p>학습 중 자주 나오는 질문과 답을 누적합니다.</p>
      {qa.map((item) => {
        const lesson = item.relatedLessonId ? getLesson(item.relatedLessonId) : undefined;
        return (
          <div
            key={item.id}
            id={item.id}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1rem',
              margin: '1rem 0',
              scrollMarginTop: '1rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem' }}>Q. {item.question}</h3>
            <p style={{ margin: 0 }}>A. {item.answer}</p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                alignItems: 'center',
                marginTop: '0.6rem',
              }}
            >
              {(item.tags ?? []).map((tag, i) => (
                <span
                  key={`${item.id}-${tag}-${i}`}
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-dim)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    padding: '0.1rem 0.5rem',
                  }}
                >
                  #{tag}
                </span>
              ))}
              {lesson && (
                <Link to={`/lesson/${lesson.id}`} style={{ fontSize: '0.8rem' }}>
                  관련 강의: {lesson.title} →
                </Link>
              )}
              <small style={{ color: 'var(--text-dim)', marginLeft: 'auto' }}>{item.date}</small>
            </div>
          </div>
        );
      })}
    </article>
  );
}
