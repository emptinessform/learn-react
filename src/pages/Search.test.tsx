import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from './Search';

function renderAt(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Search />
    </MemoryRouter>,
  );
}

test('검색 입력창을 보여준다', () => {
  renderAt('/search');
  expect(screen.getByLabelText('검색어')).toBeInTheDocument();
});

test('?q의 검색어로 결과를 보여준다', () => {
  renderAt('/search?q=JSX');
  expect(screen.getByLabelText('검색어')).toHaveValue('JSX');
  // JSX 강의 링크가 결과에 있어야 한다
  const link = screen.getByRole('link', { name: /JSX 이해하기/ });
  expect(link).toHaveAttribute('href', '/lesson/02-jsx');
});

test('결과가 없으면 안내 문구를 보여준다', () => {
  renderAt('/search?q=존재하지않는검색어xyz');
  expect(screen.getByText(/결과가 없습니다/)).toBeInTheDocument();
});
