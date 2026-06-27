import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Foundations from './Foundations';
import Glossary from './Glossary';
import QnA from './QnA';

test('Foundations는 제목과 웹 3요소 도식을 보여준다', () => {
  render(<MemoryRouter><Foundations /></MemoryRouter>);
  expect(screen.getByText('배경과 원리')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '웹 페이지의 3요소' })).toBeInTheDocument();
});

test('Glossary는 용어를 렌더링한다', () => {
  render(<MemoryRouter><Glossary /></MemoryRouter>);
  expect(screen.getByText('JSX')).toBeInTheDocument();
});

test('QnA는 질문을 렌더링한다', () => {
  render(<MemoryRouter><QnA /></MemoryRouter>);
  expect(screen.getByText(/왜 그냥 HTML\/JS 대신 React를 쓰나요/)).toBeInTheDocument();
});
