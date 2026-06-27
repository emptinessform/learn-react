import { glossary } from './glossary';
import { qa } from './qa';

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
