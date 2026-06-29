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

test('드로어가 열렸을 때 Esc로 닫는다', () => {
  renderApp();
  fireEvent.click(screen.getByLabelText('메뉴 열기'));
  expect(screen.getByTestId('nav-overlay')).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: 'Escape' });
  expect(screen.queryByTestId('nav-overlay')).not.toBeInTheDocument();
});

test('건너뛰기 링크와 본문 랜드마크, 사이드바 nav 랜드마크가 있다', () => {
  renderApp();
  expect(screen.getByRole('button', { name: '본문으로 건너뛰기' })).toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  // 사이드바의 참고 자료 / 커리큘럼 두 nav 랜드마크
  expect(screen.getByRole('navigation', { name: '참고 자료' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: '커리큘럼' })).toBeInTheDocument();
});

test('햄버거 버튼의 aria-expanded가 상태를 반영한다', () => {
  renderApp();
  const btn = screen.getByLabelText('메뉴 열기');
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  expect(btn).toHaveAttribute('aria-controls', 'sidebar');
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
});
