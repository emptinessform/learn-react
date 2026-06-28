import { Link } from 'react-router-dom';
import { lessons, lessonsBySection, totalLessons } from '../curriculum';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';
import DataBackup from '../components/DataBackup';

export default function Overview() {
  const { isDone, count } = useProgress();
  const nextLesson = lessons.find((l) => !isDone(l.id));

  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>React 강의 자료</h1>
      <p>
        직접 만들면서 배우는 React 커리큘럼입니다. 각 강의는 설명과 예제, 그리고 직접 고쳐볼 수 있는
        플레이그라운드로 구성됩니다.
      </p>

      <ProgressBar value={totalLessons ? count / totalLessons : 0} label={`전체 진행률 (${count}/${totalLessons})`} />

      {nextLesson ? (
        <p>
          <Link to={`/lesson/${nextLesson.id}`}>▶ 이어서 학습하기: {nextLesson.title}</Link>
        </p>
      ) : (
        <p>🎉 모든 강의를 완료했습니다!</p>
      )}

      <h2>커리큘럼</h2>
      {lessonsBySection().map((sec) => (
        <div key={sec.name}>
          <h3>{sec.name}</h3>
          <ul>
            {sec.lessons.map((l) => (
              <li key={l.id}>
                <Link to={`/lesson/${l.id}`}>{l.title}</Link> {isDone(l.id) && '✓'}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <DataBackup />
    </article>
  );
}
