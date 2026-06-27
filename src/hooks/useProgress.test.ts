import { renderHook, act } from '@testing-library/react';
import { useProgress, PROGRESS_KEY } from './useProgress';

beforeEach(() => localStorage.clear());

test('초기 상태는 완료 0개', () => {
  const { result } = renderHook(() => useProgress());
  expect(result.current.count).toBe(0);
  expect(result.current.isDone('01-intro')).toBe(false);
});

test('toggle은 완료 상태를 켜고 끈다', () => {
  const { result } = renderHook(() => useProgress());
  act(() => result.current.toggle('01-intro'));
  expect(result.current.isDone('01-intro')).toBe(true);
  expect(result.current.count).toBe(1);
  act(() => result.current.toggle('01-intro'));
  expect(result.current.isDone('01-intro')).toBe(false);
  expect(result.current.count).toBe(0);
});

test('완료 상태는 localStorage에 저장된다', () => {
  const { result } = renderHook(() => useProgress());
  act(() => result.current.toggle('02-jsx'));
  const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]');
  expect(saved).toContain('02-jsx');
});

test('저장된 값을 초기 상태로 읽어온다', () => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(['01-intro']));
  const { result } = renderHook(() => useProgress());
  expect(result.current.isDone('01-intro')).toBe(true);
});
