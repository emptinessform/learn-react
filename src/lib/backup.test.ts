import { serializeBackup, applyBackup } from './backup';
import { PROGRESS_KEY } from '../hooks/useProgress';
import { NOTES_KEY } from '../hooks/useNotes';

beforeEach(() => localStorage.clear());

test('현재 진도·메모를 직렬화한다', () => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(['01-intro']));
  localStorage.setItem(NOTES_KEY, JSON.stringify({ '01-intro': '복습' }));
  const data = JSON.parse(serializeBackup());
  expect(data.version).toBe(1);
  expect(data.progress).toEqual(['01-intro']);
  expect(data.notes).toEqual({ '01-intro': '복습' });
});

test('빈 상태도 안전하게 직렬화한다', () => {
  const data = JSON.parse(serializeBackup());
  expect(data.progress).toEqual([]);
  expect(data.notes).toEqual({});
});

test('백업을 localStorage에 적용한다', () => {
  const json = JSON.stringify({ version: 1, progress: ['02-jsx'], notes: { '02-jsx': '메모' } });
  applyBackup(json);
  expect(JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')).toEqual(['02-jsx']);
  expect(JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}')).toEqual({ '02-jsx': '메모' });
});

test('직렬화 → 적용 왕복이 보존된다', () => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(['a', 'b']));
  localStorage.setItem(NOTES_KEY, JSON.stringify({ a: 'x' }));
  const json = serializeBackup();
  localStorage.clear();
  applyBackup(json);
  expect(JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')).toEqual(['a', 'b']);
  expect(JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}')).toEqual({ a: 'x' });
});

test('잘못된 JSON은 예외를 던진다', () => {
  expect(() => applyBackup('not json')).toThrow();
});

test('메모 값 중 문자열이 아닌 항목은 버린다', () => {
  applyBackup(JSON.stringify({ version: 1, notes: { a: 'ok', b: 42, c: null } }));
  expect(JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}')).toEqual({ a: 'ok' });
});
