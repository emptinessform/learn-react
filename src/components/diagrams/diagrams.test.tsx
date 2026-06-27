import { render, screen } from '@testing-library/react';
import WebTrioDiagram from './WebTrioDiagram';

test('웹 3요소 도식은 접근성 라벨과 핵심 텍스트를 포함한다', () => {
  render(<WebTrioDiagram />);
  expect(screen.getByRole('img', { name: '웹 페이지의 3요소' })).toBeInTheDocument();
  expect(screen.getByText('HTML')).toBeInTheDocument();
  expect(screen.getByText('CSS')).toBeInTheDocument();
  expect(screen.getByText('JS')).toBeInTheDocument();
});
