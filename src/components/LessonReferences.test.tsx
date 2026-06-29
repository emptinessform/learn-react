import { render, screen } from '@testing-library/react';
import LessonReferences from './LessonReferences';

test('해당 강의의 참고 링크를 외부 링크로 렌더링한다', () => {
  render(<LessonReferences id="07-usestate" />);
  expect(screen.getByRole('heading', { name: '더 읽어보기' })).toBeInTheDocument();
  const link = screen.getByRole('link', { name: /useState 레퍼런스/ });
  expect(link).toHaveAttribute('href', 'https://react.dev/reference/react/useState');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
});

test('참고 링크가 없는 id면 아무것도 렌더링하지 않는다', () => {
  const { container } = render(<LessonReferences id="없는-강의" />);
  expect(container).toBeEmptyDOMElement();
});
