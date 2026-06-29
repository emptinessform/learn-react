import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReadingProgress from './ReadingProgress';

test('읽기 진행바(progressbar)를 렌더링한다', () => {
  render(
    <MemoryRouter>
      <ReadingProgress />
    </MemoryRouter>,
  );
  const bar = screen.getByTestId('reading-progress');
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveAttribute('role', 'progressbar');
  expect(bar).toHaveAttribute('aria-valuenow', '0');
});
