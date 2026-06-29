import { glossary } from './glossary';
import { qa } from './qa';
import { exercises } from './exercises';
import { quiz } from './quiz';
import { references } from './references';
import { lessons } from '../curriculum';

test('용어 id는 중복이 없다', () => {
  const ids = glossary.map((t) => t.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('용어의 related는 존재하는 용어를 가리킨다', () => {
  const ids = new Set(glossary.map((t) => t.id));
  for (const t of glossary) {
    for (const r of t.related ?? []) {
      expect(ids.has(r)).toBe(true);
    }
  }
});

test('Q&A id는 중복이 없다', () => {
  const ids = qa.map((q) => q.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('Q&A의 relatedLessonId는 존재하는 강의를 가리킨다', () => {
  const lessonIds = new Set(lessons.map((l) => l.id));
  for (const item of qa) {
    if (item.relatedLessonId) {
      expect(lessonIds.has(item.relatedLessonId)).toBe(true);
    }
  }
});

test('연습문제 키는 모두 실제 강의 id다', () => {
  const ids = new Set(lessons.map((l) => l.id));
  for (const key of Object.keys(exercises)) {
    expect(ids.has(key)).toBe(true);
  }
});

test('각 연습문제는 질문과 답을 가진다', () => {
  for (const list of Object.values(exercises)) {
    expect(list.length).toBeGreaterThan(0);
    for (const ex of list) {
      expect(ex.question.trim().length).toBeGreaterThan(0);
      expect(ex.answer.trim().length).toBeGreaterThan(0);
    }
  }
});

test('퀴즈 키는 모두 실제 강의 id다', () => {
  const ids = new Set(lessons.map((l) => l.id));
  for (const key of Object.keys(quiz)) {
    expect(ids.has(key)).toBe(true);
  }
});

test('각 퀴즈 문제는 보기 2개 이상과 유효한 정답 인덱스를 가진다', () => {
  for (const list of Object.values(quiz)) {
    expect(list.length).toBeGreaterThan(0);
    for (const q of list) {
      expect(q.question.trim().length).toBeGreaterThan(0);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
  }
});

test('참고 링크 키는 모두 실제 강의 id다', () => {
  const ids = new Set(lessons.map((l) => l.id));
  for (const key of Object.keys(references)) {
    expect(ids.has(key)).toBe(true);
  }
});

test('각 참고 링크는 라벨과 http(s) URL을 가진다', () => {
  for (const list of Object.values(references)) {
    expect(list.length).toBeGreaterThan(0);
    for (const ref of list) {
      expect(ref.label.trim().length).toBeGreaterThan(0);
      expect(/^https?:\/\//.test(ref.url)).toBe(true);
    }
  }
});
