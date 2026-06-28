import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => localStorage.clear());

function renderApp(entry = '/') {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <App />
    </MemoryRouter>,
  );
}

test('개요 페이지를 렌더링한다', () => {
  renderApp();
  expect(screen.getByText('React 강의 자료')).toBeInTheDocument();
});

test('햄버거로 모바일 드로어(오버레이)를 열고 닫는다', () => {
  renderApp();
  expect(screen.queryByTestId('nav-overlay')).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('메뉴 열기'));
  expect(screen.getByTestId('nav-overlay')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('nav-overlay'));
  expect(screen.queryByTestId('nav-overlay')).not.toBeInTheDocument();
});
