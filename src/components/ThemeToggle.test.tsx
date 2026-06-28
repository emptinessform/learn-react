import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { THEME_KEY } from '../hooks/useTheme';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

test('현재 테마 라벨을 보여준다 (기본 다크)', () => {
  render(<ThemeToggle />);
  expect(screen.getByRole('button', { name: '테마 전환' })).toHaveTextContent('다크 모드');
});

test('클릭하면 라이트로 전환되고 저장된다', () => {
  render(<ThemeToggle />);
  fireEvent.click(screen.getByRole('button', { name: '테마 전환' }));
  expect(screen.getByRole('button', { name: '테마 전환' })).toHaveTextContent('라이트 모드');
  expect(localStorage.getItem(THEME_KEY)).toBe('light');
});
