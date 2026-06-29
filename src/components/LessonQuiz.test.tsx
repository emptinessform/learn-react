import { render, screen, fireEvent } from '@testing-library/react';
import LessonQuiz from './LessonQuiz';
import { quiz } from '../content/quiz';

test('해당 강의의 퀴즈를 렌더링한다', () => {
  render(<LessonQuiz id="01-intro" />);
  expect(screen.getByRole('heading', { name: '이해도 점검' })).toBeInTheDocument();
});

test('퀴즈가 없는 id면 아무것도 렌더링하지 않는다', () => {
  const { container } = render(<LessonQuiz id="없는-강의" />);
  expect(container).toBeEmptyDOMElement();
});

test('정답을 고르면 정답 피드백을 보여준다', () => {
  render(<LessonQuiz id="01-intro" />);
  const q = quiz['01-intro'][0];
  fireEvent.click(screen.getByRole('button', { name: q.options[q.answer] }));
  expect(screen.getByText(/정답입니다/)).toBeInTheDocument();
});
