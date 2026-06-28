import { render, screen } from '@testing-library/react';
import DataBackup from './DataBackup';

test('내보내기·가져오기 버튼을 보여준다', () => {
  render(<DataBackup />);
  expect(screen.getByRole('button', { name: /내보내기/ })).toBeInTheDocument();
  expect(screen.getByText(/가져오기/)).toBeInTheDocument();
});
