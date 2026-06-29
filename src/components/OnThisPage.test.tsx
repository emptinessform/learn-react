import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import OnThisPage from './OnThisPage';

function harness(headings: string[]) {
  return render(
    <MemoryRouter>
      <main id="main">
        <OnThisPage />
        {headings.map((h, i) => (
          <h2 key={i}>{h}</h2>
        ))}
      </main>
    </MemoryRouter>,
  );
}

test('섹션이 3개 이상이면 목차를 렌더한다', () => {
  harness(['가', '나', '다']);
  expect(screen.getByLabelText('이 페이지 목차')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '가' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '다' })).toBeInTheDocument();
});

test('섹션이 3개 미만이면 렌더하지 않는다', () => {
  harness(['가', '나']);
  expect(screen.queryByLabelText('이 페이지 목차')).not.toBeInTheDocument();
});

test('항목을 클릭하면 해당 섹션으로 스크롤한다', () => {
  const scrollSpy = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollSpy;
  harness(['가', '나', '다']);
  fireEvent.click(screen.getByRole('button', { name: '나' }));
  expect(scrollSpy).toHaveBeenCalled();
});
