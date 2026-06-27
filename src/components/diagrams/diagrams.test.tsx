import { render, screen } from '@testing-library/react';
import WebTrioDiagram from './WebTrioDiagram';
import BrowserRenderDiagram from './BrowserRenderDiagram';
import ImperativeVsDeclarativeDiagram from './ImperativeVsDeclarativeDiagram';
import VirtualDomDiagram from './VirtualDomDiagram';
import ComponentTreeDiagram from './ComponentTreeDiagram';
import ReactWorkflowDiagram from './ReactWorkflowDiagram';

test('웹 3요소 도식은 접근성 라벨과 핵심 텍스트를 포함한다', () => {
  render(<WebTrioDiagram />);
  expect(screen.getByRole('img', { name: '웹 페이지의 3요소' })).toBeInTheDocument();
  expect(screen.getByText('HTML')).toBeInTheDocument();
  expect(screen.getByText('CSS')).toBeInTheDocument();
  expect(screen.getByText('JS')).toBeInTheDocument();
});

test('브라우저 렌더링 흐름 도식은 접근성 라벨과 단계 텍스트를 포함한다', () => {
  render(<BrowserRenderDiagram />);
  expect(screen.getByRole('img', { name: '브라우저 렌더링 흐름' })).toBeInTheDocument();
  expect(screen.getByText('DOM + CSSOM')).toBeInTheDocument();
  expect(screen.getByText('레이아웃')).toBeInTheDocument();
});

test('명령형 vs 선언형 도식은 두 접근 라벨을 포함한다', () => {
  render(<ImperativeVsDeclarativeDiagram />);
  expect(screen.getByRole('img', { name: '명령형 vs 선언형' })).toBeInTheDocument();
  expect(screen.getByText('명령형 (직접 DOM 조작)')).toBeInTheDocument();
  expect(screen.getByText('선언형 (React)')).toBeInTheDocument();
});

test('Virtual DOM 도식은 접근성 라벨과 핵심 단계를 포함한다', () => {
  render(<VirtualDomDiagram />);
  expect(screen.getByRole('img', { name: 'Virtual DOM 동작' })).toBeInTheDocument();
  expect(screen.getByText('이전과 비교 (diff)')).toBeInTheDocument();
  expect(screen.getByText('바뀐 노드')).toBeInTheDocument();
});

test('컴포넌트 트리 도식은 접근성 라벨과 루트 컴포넌트를 포함한다', () => {
  render(<ComponentTreeDiagram />);
  expect(
    screen.getByRole('img', { name: '컴포넌트 트리와 단방향 데이터 흐름' }),
  ).toBeInTheDocument();
  expect(screen.getByText('<App>')).toBeInTheDocument();
});

test('React 개발 과정 도식은 접근성 라벨과 단계 텍스트를 포함한다', () => {
  render(<ReactWorkflowDiagram />);
  expect(screen.getByRole('img', { name: 'React 개발 과정' })).toBeInTheDocument();
  expect(screen.getByText('프로젝트 생성')).toBeInTheDocument();
  expect(screen.getByText('배포')).toBeInTheDocument();
});
