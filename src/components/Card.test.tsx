import { render, screen } from '@testing-library/react';
import Card from './Card';

test('자식을 렌더링한다', () => {
  render(<Card>내용</Card>);
  expect(screen.getByText('내용')).toBeInTheDocument();
});

test('id와 style을 전달한다', () => {
  render(
    <Card id="x" style={{ marginTop: '5px' }}>
      본문
    </Card>,
  );
  const el = document.getElementById('x');
  expect(el).not.toBeNull();
  expect(el).toHaveStyle({ marginTop: '5px' });
});
