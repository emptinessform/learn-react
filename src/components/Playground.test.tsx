import { render, screen } from '@testing-library/react';
import Playground from './Playground';

test('플레이그라운드는 초기 코드의 미리보기를 렌더링한다', () => {
  render(<Playground initialCode={'<strong>안녕 React</strong>'} />);
  expect(screen.getByText('안녕 React')).toBeInTheDocument();
});

test('편집 영역(코드 라벨)을 보여준다', () => {
  render(<Playground initialCode={'<span>x</span>'} />);
  expect(screen.getByText('코드 (편집 가능)')).toBeInTheDocument();
});
