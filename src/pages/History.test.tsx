import { render, screen } from '@testing-library/react';
import History from './History';

test('버전 역사 제목과 주요 버전을 렌더링한다', () => {
  render(<History />);
  expect(screen.getByRole('heading', { level: 1, name: 'React 버전 역사' })).toBeInTheDocument();
  expect(screen.getByText('React 16.8 (Hooks)')).toBeInTheDocument();
  expect(screen.getByText('React 19')).toBeInTheDocument();
});

test('각 버전 카드에 장점·단점을 표시한다', () => {
  render(<History />);
  // 여러 버전에 걸쳐 장점/단점 라벨이 반복 등장한다
  expect(screen.getAllByText('장점').length).toBeGreaterThan(1);
  expect(screen.getAllByText('단점').length).toBeGreaterThan(1);
});
