import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ScrollToHash from './ScrollToHash';

test('해시가 가리키는 요소로 스크롤한다', () => {
  const target = document.createElement('div');
  target.id = 'jsx';
  const scrollSpy = vi.fn();
  target.scrollIntoView = scrollSpy;
  document.body.appendChild(target);

  render(
    <MemoryRouter initialEntries={['/glossary#jsx']}>
      <ScrollToHash />
    </MemoryRouter>,
  );

  expect(scrollSpy).toHaveBeenCalled();
  document.body.removeChild(target);
});

test('해시가 없으면 스크롤하지 않는다', () => {
  const target = document.createElement('div');
  target.id = 'jsx';
  const scrollSpy = vi.fn();
  target.scrollIntoView = scrollSpy;
  document.body.appendChild(target);

  render(
    <MemoryRouter initialEntries={['/glossary']}>
      <ScrollToHash />
    </MemoryRouter>,
  );

  expect(scrollSpy).not.toHaveBeenCalled();
  document.body.removeChild(target);
});
