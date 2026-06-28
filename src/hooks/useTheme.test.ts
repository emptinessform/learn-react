import { renderHook, act } from '@testing-library/react';
import { useTheme, THEME_KEY } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

test('기본 테마는 dark', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current[0]).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
});

test('toggle은 테마를 바꾸고 localStorage에 저장한다', () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current[1]());
  expect(result.current[0]).toBe('light');
  expect(localStorage.getItem(THEME_KEY)).toBe('light');
  expect(document.documentElement.dataset.theme).toBe('light');
  act(() => result.current[1]());
  expect(result.current[0]).toBe('dark');
  expect(localStorage.getItem(THEME_KEY)).toBe('dark');
});

test('저장된 테마를 초기값으로 불러온다', () => {
  localStorage.setItem(THEME_KEY, 'light');
  const { result } = renderHook(() => useTheme());
  expect(result.current[0]).toBe('light');
  expect(document.documentElement.dataset.theme).toBe('light');
});
