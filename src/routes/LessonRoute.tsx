import { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getLesson, getAdjacent } from '../curriculum';
import Lesson from '../components/Lesson';

export default function LessonRoute() {
  const { id } = useParams<{ id: string }>();
  const meta = id ? getLesson(id) : undefined;
  if (!meta) return <Navigate to="/" replace />;

  const { prev, next } = getAdjacent(meta.id);
  const Body = meta.Body;

  return (
    <Lesson id={meta.id} title={meta.title} prev={prev} next={next}>
      <Suspense fallback={<p>불러오는 중…</p>}>
        <Body />
      </Suspense>
    </Lesson>
  );
}
