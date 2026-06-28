import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Overview from './Overview';
import { PROGRESS_KEY } from '../hooks/useProgress';
import { lessons } from '../curriculum';

beforeEach(() => localStorage.clear());

test('개요는 진행률과 이어서 학습하기 링크를 보여준다', () => {
  render(<MemoryRouter><Overview /></MemoryRouter>);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByText(/이어서 학습하기/)).toBeInTheDocument();
});

test('모든 강의가 완료되면 완료 메시지를 표시하고 이어서 학습하기 링크가 없다', () => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(lessons.map((l) => l.id)));
  render(<MemoryRouter><Overview /></MemoryRouter>);
  expect(screen.getByText('🎉 모든 강의를 완료했습니다!')).toBeInTheDocument();
  expect(screen.queryByText(/이어서 학습하기/)).not.toBeInTheDocument();
});
