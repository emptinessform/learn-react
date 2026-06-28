import { render, screen } from '@testing-library/react';
import Section from './Section';
import Callout from './Callout';
import CodeBlock from './CodeBlock';
import ProgressBar from './ProgressBar';

test('Section은 제목과 자식을 렌더링한다', () => {
  render(<Section title="제목">본문</Section>);
  expect(screen.getByText('제목')).toBeInTheDocument();
  expect(screen.getByText('본문')).toBeInTheDocument();
});

test('Callout은 타입 라벨을 렌더링한다', () => {
  render(<Callout type="warn">조심</Callout>);
  expect(screen.getByText('⚠️ 주의')).toBeInTheDocument();
});

test('CodeBlock은 코드를 렌더링한다', () => {
  // 구문 강조로 코드가 여러 토큰 span으로 나뉘므로 전체 텍스트로 확인한다.
  const { container } = render(<CodeBlock code="const a = 1;" />);
  expect(container.textContent).toContain('const a = 1;');
});

test('ProgressBar는 퍼센트를 표시한다', () => {
  render(<ProgressBar value={0.5} label="진행률" />);
  expect(screen.getByText('50%')).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
});
