import { glossary } from './glossary';
import { qa } from './qa';
import { exercises } from './exercises';
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
