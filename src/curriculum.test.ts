import { lessons, getLesson, getAdjacent, lessonsBySection, totalLessons } from './curriculum';

test('강의 id는 중복이 없다', () => {
  const ids = lessons.map((l) => l.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('totalLessons는 강의 수와 같다', () => {
  expect(totalLessons).toBe(lessons.length);
});

test('getLesson은 메타데이터를 찾는다', () => {
  expect(getLesson('01-intro')?.title).toBe('React란 무엇인가');
  expect(getLesson('없음')).toBeUndefined();
});

test('getAdjacent는 이전/다음을 계산한다', () => {
  expect(getAdjacent('01-intro').prev).toBeUndefined();
  expect(getAdjacent('01-intro').next?.id).toBe('02-jsx');
  expect(getAdjacent('02-jsx').prev?.id).toBe('01-intro');
});

test('lessonsBySection은 섹션별로 묶는다', () => {
  const grouped = lessonsBySection();
  expect(grouped[0].name).toBe('입문');
  expect(grouped[0].lessons.length).toBeGreaterThanOrEqual(2);
});
