import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Overview from './Overview';

beforeEach(() => localStorage.clear());

test('개요는 진행률과 이어서 학습하기 링크를 보여준다', () => {
  render(<MemoryRouter><Overview /></MemoryRouter>);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByText(/이어서 학습하기/)).toBeInTheDocument();
});
