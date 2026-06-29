import { render, screen } from '@testing-library/react';
import Pill from './Pill';

test('내용을 렌더링한다', () => {
  render(<Pill tone="ok">최신</Pill>);
  expect(screen.getByText('최신')).toBeInTheDocument();
});
