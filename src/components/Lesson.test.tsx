import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lesson from './Lesson';

beforeEach(() => localStorage.clear());

function renderLesson() {
  return render(
    <MemoryRouter>
      <Lesson
        id="02-jsx"
        title="JSX 이해하기"
        prev={{ id: '01-intro', title: 'React란' }}
        next={{ id: '03-props', title: 'props' }}
      >
        <p>본문</p>
      </Lesson>
    </MemoryRouter>,
  );
}

test('제목, 본문, 이전/다음 링크를 렌더링한다', () => {
  renderLesson();
  expect(screen.getByText('JSX 이해하기')).toBeInTheDocument();
  expect(screen.getByText('본문')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '← React란' })).toHaveAttribute('href', '/lesson/01-intro');
  expect(screen.getByRole('link', { name: 'props →' })).toHaveAttribute('href', '/lesson/03-props');
});

test('완료 버튼을 누르면 상태가 바뀐다', () => {
  renderLesson();
  const btn = screen.getByRole('button', { name: '완료로 표시' });
  fireEvent.click(btn);
  expect(screen.getByRole('button', { name: '✓ 완료함' })).toBeInTheDocument();
});
