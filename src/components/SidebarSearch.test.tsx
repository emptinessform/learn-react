import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import SidebarSearch from './SidebarSearch';

function LocationProbe() {
  const loc = useLocation();
  return <div data-testid="loc">{loc.pathname + loc.search}</div>;
}

function setup() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <SidebarSearch />
      <Routes>
        <Route path="*" element={<LocationProbe />} />
      </Routes>
    </MemoryRouter>,
  );
}

test('검색 입력창을 보여준다', () => {
  setup();
  expect(screen.getByLabelText('사이드바 검색')).toBeInTheDocument();
});

test('제출하면 /search?q=로 이동한다', () => {
  setup();
  const input = screen.getByLabelText('사이드바 검색');
  fireEvent.change(input, { target: { value: 'react 훅' } });
  fireEvent.submit(input);
  expect(screen.getByTestId('loc').textContent).toBe('/search?q=react%20%ED%9B%85');
});

test('빈 검색어로는 이동하지 않는다', () => {
  setup();
  const input = screen.getByLabelText('사이드바 검색');
  fireEvent.change(input, { target: { value: '   ' } });
  fireEvent.submit(input);
  expect(screen.getByTestId('loc').textContent).toBe('/');
});
