import { render, screen } from '@testing-library/react';
import App from './App';

test('앱 제목을 렌더링한다', () => {
  render(<App />);
  expect(screen.getByText('learn-react')).toBeInTheDocument();
});
