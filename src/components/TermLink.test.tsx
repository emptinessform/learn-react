import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TermLink from './TermLink';

test('TermLink는 용어 사전 앵커로 연결된다', () => {
  render(
    <MemoryRouter>
      <TermLink termId="jsx">JSX</TermLink>
    </MemoryRouter>,
  );
  const link = screen.getByRole('link', { name: 'JSX' });
  expect(link).toHaveAttribute('href', '/glossary#jsx');
});
