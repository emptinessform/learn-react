import { render, screen, fireEvent } from '@testing-library/react';
import LessonNotes from './LessonNotes';
import { NOTES_KEY } from '../hooks/useNotes';

beforeEach(() => localStorage.clear());

test('메모 입력창을 렌더링한다', () => {
  render(<LessonNotes id="01-intro" />);
  expect(screen.getByLabelText('학습 메모')).toBeInTheDocument();
});

test('입력하면 localStorage에 저장된다', () => {
  render(<LessonNotes id="01-intro" />);
  const textarea = screen.getByLabelText('학습 메모');
  fireEvent.change(textarea, { target: { value: '컴포넌트는 함수다' } });
  const saved = JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}');
  expect(saved['01-intro']).toBe('컴포넌트는 함수다');
  expect(screen.getByText(/저장됨/)).toBeInTheDocument();
});

test('저장된 메모를 표시한다', () => {
  localStorage.setItem(NOTES_KEY, JSON.stringify({ '01-intro': '복습' }));
  render(<LessonNotes id="01-intro" />);
  expect(screen.getByLabelText('학습 메모')).toHaveValue('복습');
});
