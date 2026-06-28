import { render, screen } from '@testing-library/react';
import LessonExercises from './LessonExercises';

test('해당 강의의 연습문제를 렌더링한다', () => {
  render(<LessonExercises id="02-jsx" />);
  expect(screen.getByText('✏️ 연습문제')).toBeInTheDocument();
  expect(screen.getByText(/정답·힌트 보기/)).toBeInTheDocument();
});

test('연습문제가 없는 id면 아무것도 렌더링하지 않는다', () => {
  const { container } = render(<LessonExercises id="없는-강의" />);
  expect(container).toBeEmptyDOMElement();
});
