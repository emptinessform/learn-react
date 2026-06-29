import { render, screen } from '@testing-library/react';
import TableWrap from './TableWrap';

test('표 내용을 렌더링한다', () => {
  render(
    <TableWrap>
      <tbody>
        <tr>
          <td>셀</td>
        </tr>
      </tbody>
    </TableWrap>,
  );
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('셀')).toBeInTheDocument();
});
