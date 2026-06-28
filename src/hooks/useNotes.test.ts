import { renderHook, act } from '@testing-library/react';
import { useLessonNote, NOTES_KEY } from './useNotes';

beforeEach(() => localStorage.clear());

test('초기 메모는 빈 문자열', () => {
  const { result } = renderHook(() => useLessonNote('01-intro'));
  expect(result.current[0]).toBe('');
});

test('setNote는 메모를 갱신하고 localStorage에 저장한다', () => {
  const { result } = renderHook(() => useLessonNote('02-jsx'));
  act(() => result.current[1]('JSX는 함수 호출로 변환된다'));
  expect(result.current[0]).toBe('JSX는 함수 호출로 변환된다');
  const saved = JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}');
  expect(saved['02-jsx']).toBe('JSX는 함수 호출로 변환된다');
});

test('저장된 메모를 초기값으로 불러온다', () => {
  localStorage.setItem(NOTES_KEY, JSON.stringify({ '01-intro': '복습 필요' }));
  const { result } = renderHook(() => useLessonNote('01-intro'));
  expect(result.current[0]).toBe('복습 필요');
});

test('서로 다른 강의의 메모는 독립적이다', () => {
  localStorage.setItem(NOTES_KEY, JSON.stringify({ '01-intro': 'A' }));
  const { result } = renderHook(() => useLessonNote('02-jsx'));
  act(() => result.current[1]('B'));
  const saved = JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}');
  expect(saved['01-intro']).toBe('A');
  expect(saved['02-jsx']).toBe('B');
});
