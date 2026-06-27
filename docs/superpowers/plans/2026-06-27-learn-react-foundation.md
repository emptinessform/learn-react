# learn-react 1단계(뼈대) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** React 강의 자료 사이트의 동작하는 뼈대를 만든다 — 레이아웃·라우팅·진도추적·재사용 컴포넌트·플레이그라운드·도식, 그리고 참고자료(개요/배경·원리/용어/Q&A) 페이지와 첫 강의 2개.

**Architecture:** Vite + React + TypeScript 단일 페이지 앱. React Router로 강의/참고자료 라우팅. 강의 메타데이터는 `src/curriculum.ts`, 누적 데이터는 `src/content/*.ts`가 단일 출처. 강의 본문은 재사용 컴포넌트를 조합한 .tsx로 작성하고, 라우트 래퍼가 강의 제목·이전/다음·완료 버튼 같은 공통 틀을 입힌다. 진도는 localStorage에 저장.

**Tech Stack:** Vite 5 · React 18 · TypeScript · React Router 6 · react-live(플레이그라운드) · 수제 SVG 도식 · Vitest + React Testing Library(테스트)

## Global Constraints

- Node.js 18 이상.
- 의존성 버전(정확히): `react@^18.3.1`, `react-dom@^18.3.1`, `react-router-dom@^6.26.0`, `react-live@^4.1.8`, `vite@^5.4.0`, `@vitejs/plugin-react@^4.3.0`, `typescript@^5.5.0`, `vitest@^2.1.0`, `@testing-library/react@^16.0.0`, `@testing-library/jest-dom@^6.5.0`, `jsdom@^25.0.0`, `@types/react@^18.3.0`, `@types/react-dom@^18.3.0`.
- TypeScript는 strict 모드.
- 모든 사용자 노출 콘텐츠는 한국어.
- **플레이그라운드 예제 코드는 순수 JSX로 작성**(타입 주석 금지) — react-live 호환을 위해.
- 단일 출처: 강의는 `src/curriculum.ts`, Q&A는 `src/content/qa.ts`, 용어는 `src/content/glossary.ts`. 항목 추가는 해당 파일의 배열에 객체를 더하는 방식.
- localStorage 진도 키: `react-curriculum:progress` (완료된 강의 id 배열을 JSON으로 저장).
- 커밋은 이미 설정된 로컬 git identity(`emptinessform` / `emptiness3102@gmail.com`)로 수행하고 `origin`(main)에 푸시.

---

### Task 1: 프로젝트 스캐폴드 + 툴링

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/global.css`
- Create: `src/test/setup.ts`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: 없음
- Produces: `App` (default export, React 컴포넌트) — 이후 Task 12에서 레이아웃으로 확장됨. Vite `npm run dev`/`npm run build`/`npm test`/`npm run typecheck` 스크립트.

- [ ] **Step 1: package.json 작성**

```json
{
  "name": "learn-react",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc -b --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "react-live": "^4.1.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: tsconfig.json 작성**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: tsconfig.node.json 작성**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: vite.config.ts 작성** (Vitest 설정 포함)

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
```

- [ ] **Step 5: index.html 작성**

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>learn-react · React 강의 자료</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: src/styles/global.css 작성**

```css
:root {
  --bg: #0f1117;
  --surface: #171a23;
  --surface-2: #1e222d;
  --border: #2a2f3a;
  --text: #e6e9ef;
  --text-dim: #9aa3b2;
  --accent: #6ea8fe;
  --accent-strong: #4f86f7;
  --ok: #4ade80;
  --warn: #fbbf24;
  --radius: 10px;
  --maxw: 880px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", "Malgun Gothic", sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

code, pre { font-family: "Cascadia Code", Consolas, "D2Coding", monospace; }
```

- [ ] **Step 7: src/App.tsx 작성** (Task 12에서 확장될 최소 버전)

```tsx
export default function App() {
  return (
    <main>
      <h1>learn-react</h1>
      <p>React 강의 자료 사이트 — 준비 중</p>
    </main>
  );
}
```

- [ ] **Step 8: src/main.tsx 작성**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 9: src/test/setup.ts 작성**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 10: 실패하는 스모크 테스트 작성 — src/App.test.tsx**

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('앱 제목을 렌더링한다', () => {
  render(<App />);
  expect(screen.getByText('learn-react')).toBeInTheDocument();
});
```

- [ ] **Step 11: 의존성 설치**

Run: `npm install`
Expected: 의존성 설치 완료, `node_modules/` 생성, 오류 없음.

- [ ] **Step 12: 테스트 실행해서 통과 확인**

Run: `npm test`
Expected: PASS — 1 test passed.

- [ ] **Step 13: 타입체크 + 빌드 확인**

Run: `npm run typecheck && npm run build`
Expected: 타입 오류 없음, `dist/` 생성.

- [ ] **Step 14: 커밋**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts index.html src/main.tsx src/App.tsx src/styles/global.css src/test/setup.ts src/App.test.tsx
git commit -m "chore: scaffold Vite + React + TS project with Vitest"
```

---

### Task 2: 콘텐츠 타입 + 용어/Q&A 데이터 + 무결성 테스트

**Files:**
- Create: `src/content/glossary.ts`
- Create: `src/content/qa.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: 없음
- Produces:
  - `type Term = { id: string; term: string; definition: string; related?: string[]; relatedLessonId?: string }`
  - `type QnAItem = { id: string; question: string; answer: string; date: string; relatedLessonId?: string; tags?: string[] }`
  - `export const glossary: Term[]`
  - `export const qa: QnAItem[]`

- [ ] **Step 1: src/content/glossary.ts 작성**

```ts
export type Term = {
  id: string;
  term: string;
  definition: string;
  related?: string[];
  relatedLessonId?: string;
};

export const glossary: Term[] = [
  {
    id: 'component',
    term: '컴포넌트(Component)',
    definition:
      'UI를 독립적이고 재사용 가능한 조각으로 나눈 단위. React에서는 보통 JSX를 반환하는 함수로 작성한다.',
    related: ['jsx', 'props'],
    relatedLessonId: '01-intro',
  },
  {
    id: 'jsx',
    term: 'JSX',
    definition:
      '자바스크립트 안에서 UI 구조를 HTML과 비슷한 문법으로 표현하는 확장 문법. 빌드 시 일반 함수 호출로 변환된다.',
    related: ['component'],
    relatedLessonId: '02-jsx',
  },
  {
    id: 'props',
    term: 'props',
    definition:
      '부모 컴포넌트가 자식 컴포넌트에 전달하는 입력값. 읽기 전용이며 함수의 인자처럼 사용된다.',
    related: ['component'],
  },
];
```

- [ ] **Step 2: src/content/qa.ts 작성**

```ts
export type QnAItem = {
  id: string;
  question: string;
  answer: string;
  date: string;
  relatedLessonId?: string;
  tags?: string[];
};

export const qa: QnAItem[] = [
  {
    id: 'why-react',
    question: '왜 그냥 HTML/JS 대신 React를 쓰나요?',
    answer:
      'UI가 복잡해지면 DOM을 직접 조작하는 코드가 빠르게 얽힙니다. React는 "상태가 이러면 화면은 이렇다"를 선언적으로 작성하게 해 주고, 바뀐 부분만 효율적으로 갱신합니다. 배경과 원리 페이지에서 더 자세히 다룹니다.',
    date: '2026-06-27',
    relatedLessonId: '01-intro',
    tags: ['개념'],
  },
];
```

- [ ] **Step 3: 실패하는 무결성 테스트 작성 — src/content/content.test.ts**

```ts
import { glossary } from './glossary';
import { qa } from './qa';

test('용어 id는 중복이 없다', () => {
  const ids = glossary.map((t) => t.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('용어의 related는 존재하는 용어를 가리킨다', () => {
  const ids = new Set(glossary.map((t) => t.id));
  for (const t of glossary) {
    for (const r of t.related ?? []) {
      expect(ids.has(r)).toBe(true);
    }
  }
});

test('Q&A id는 중복이 없다', () => {
  const ids = qa.map((q) => q.id);
  expect(new Set(ids).size).toBe(ids.length);
});
```

- [ ] **Step 4: 테스트 실행해서 통과 확인**

Run: `npm test -- src/content/content.test.ts`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: 커밋**

```bash
git add src/content/glossary.ts src/content/qa.ts src/content/content.test.ts
git commit -m "feat: add glossary and Q&A content data with integrity tests"
```

---

### Task 3: useProgress 훅 (진도 추적)

**Files:**
- Create: `src/hooks/useProgress.ts`
- Test: `src/hooks/useProgress.test.ts`

**Interfaces:**
- Consumes: 없음 (localStorage 직접 사용)
- Produces: `useProgress(): { completedIds: string[]; isDone(id: string): boolean; toggle(id: string): void; count: number }` 그리고 `export const PROGRESS_KEY = 'react-curriculum:progress'`.

- [ ] **Step 1: 실패하는 테스트 작성 — src/hooks/useProgress.test.ts**

```ts
import { renderHook, act } from '@testing-library/react';
import { useProgress, PROGRESS_KEY } from './useProgress';

beforeEach(() => localStorage.clear());

test('초기 상태는 완료 0개', () => {
  const { result } = renderHook(() => useProgress());
  expect(result.current.count).toBe(0);
  expect(result.current.isDone('01-intro')).toBe(false);
});

test('toggle은 완료 상태를 켜고 끈다', () => {
  const { result } = renderHook(() => useProgress());
  act(() => result.current.toggle('01-intro'));
  expect(result.current.isDone('01-intro')).toBe(true);
  expect(result.current.count).toBe(1);
  act(() => result.current.toggle('01-intro'));
  expect(result.current.isDone('01-intro')).toBe(false);
  expect(result.current.count).toBe(0);
});

test('완료 상태는 localStorage에 저장된다', () => {
  const { result } = renderHook(() => useProgress());
  act(() => result.current.toggle('02-jsx'));
  const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]');
  expect(saved).toContain('02-jsx');
});

test('저장된 값을 초기 상태로 읽어온다', () => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(['01-intro']));
  const { result } = renderHook(() => useProgress());
  expect(result.current.isDone('01-intro')).toBe(true);
});
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm test -- src/hooks/useProgress.test.ts`
Expected: FAIL — useProgress를 찾을 수 없음.

- [ ] **Step 3: src/hooks/useProgress.ts 구현**

```ts
import { useCallback, useState } from 'react';

export const PROGRESS_KEY = 'react-curriculum:progress';

function load(): string[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function save(ids: string[]): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(ids));
  } catch {
    console.warn('진도 저장 실패: localStorage에 접근할 수 없습니다.');
  }
}

export function useProgress() {
  const [completedIds, setCompletedIds] = useState<string[]>(() => load());

  const toggle = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      save(next);
      return next;
    });
  }, []);

  const isDone = useCallback((id: string) => completedIds.includes(id), [completedIds]);

  return { completedIds, isDone, toggle, count: completedIds.length };
}
```

- [ ] **Step 4: 테스트 실행해서 통과 확인**

Run: `npm test -- src/hooks/useProgress.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: 커밋**

```bash
git add src/hooks/useProgress.ts src/hooks/useProgress.test.ts
git commit -m "feat: add useProgress hook backed by localStorage"
```

---

### Task 4: 표시용 재사용 컴포넌트 (Section, Callout, CodeBlock, ProgressBar)

**Files:**
- Create: `src/components/Section.tsx`
- Create: `src/components/Callout.tsx`
- Create: `src/components/CodeBlock.tsx`
- Create: `src/components/ProgressBar.tsx`
- Test: `src/components/components.test.tsx`

**Interfaces:**
- Consumes: 없음
- Produces:
  - `Section: (props: { title: string; children: React.ReactNode }) => JSX.Element`
  - `Callout: (props: { type?: 'tip' | 'warn' | 'info'; children: React.ReactNode }) => JSX.Element`
  - `CodeBlock: (props: { code: string; caption?: string }) => JSX.Element`
  - `ProgressBar: (props: { value: number; label?: string }) => JSX.Element` (value는 0~1)

- [ ] **Step 1: src/components/Section.tsx 작성**

```tsx
export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ margin: '2rem 0' }}>
      <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.3rem' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: src/components/Callout.tsx 작성**

```tsx
const STYLES: Record<string, { border: string; label: string }> = {
  tip: { border: 'var(--ok)', label: '💡 팁' },
  warn: { border: 'var(--warn)', label: '⚠️ 주의' },
  info: { border: 'var(--accent)', label: 'ℹ️ 참고' },
};

export default function Callout({
  type = 'info',
  children,
}: {
  type?: 'tip' | 'warn' | 'info';
  children: React.ReactNode;
}) {
  const s = STYLES[type];
  return (
    <div
      style={{
        borderLeft: `4px solid ${s.border}`,
        background: 'var(--surface-2)',
        padding: '0.8rem 1rem',
        borderRadius: '6px',
        margin: '1rem 0',
      }}
    >
      <strong>{s.label}</strong>
      <div>{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: src/components/CodeBlock.tsx 작성**

```tsx
export default function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure style={{ margin: '1rem 0' }}>
      <pre
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '1rem',
          overflowX: 'auto',
        }}
      >
        <code>{code}</code>
      </pre>
      {caption && (
        <figcaption style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 4: src/components/ProgressBar.tsx 작성**

```tsx
export default function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div style={{ margin: '0.5rem 0' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ background: 'var(--surface-2)', borderRadius: '999px', height: '10px' }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: 'var(--accent-strong)',
            borderRadius: '999px',
            transition: 'width 0.3s',
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 스모크 테스트 작성 — src/components/components.test.tsx**

```tsx
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
  render(<CodeBlock code="const a = 1;" />);
  expect(screen.getByText('const a = 1;')).toBeInTheDocument();
});

test('ProgressBar는 퍼센트를 표시한다', () => {
  render(<ProgressBar value={0.5} label="진행률" />);
  expect(screen.getByText('50%')).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
});
```

- [ ] **Step 6: 테스트 실행해서 통과 확인**

Run: `npm test -- src/components/components.test.tsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 7: 커밋**

```bash
git add src/components/Section.tsx src/components/Callout.tsx src/components/CodeBlock.tsx src/components/ProgressBar.tsx src/components/components.test.tsx
git commit -m "feat: add presentational components (Section, Callout, CodeBlock, ProgressBar)"
```

---

### Task 5: 플레이그라운드 컴포넌트 (react-live)

**Files:**
- Create: `src/components/Playground.tsx`
- Test: `src/components/Playground.test.tsx`

**Interfaces:**
- Consumes: 없음
- Produces: `Playground: (props: { initialCode: string; scope?: Record<string, unknown> }) => JSX.Element`. 기본 scope에 React 훅(useState, useEffect, useRef)을 포함한다.

- [ ] **Step 1: src/components/Playground.tsx 작성**

```tsx
import { useState, useEffect, useRef } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

const DEFAULT_SCOPE = { useState, useEffect, useRef };

export default function Playground({
  initialCode,
  scope,
}: {
  initialCode: string;
  scope?: Record<string, unknown>;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        margin: '1rem 0',
      }}
    >
      <LiveProvider code={initialCode.trim()} scope={{ ...DEFAULT_SCOPE, ...scope }} noInline={false}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }}>
          <div style={{ background: 'var(--surface-2)' }}>
            <div style={{ padding: '0.3rem 0.6rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              코드 (편집 가능)
            </div>
            <LiveEditor style={{ fontFamily: 'monospace', fontSize: '0.9rem' }} />
          </div>
          <div style={{ background: 'var(--surface)' }}>
            <div style={{ padding: '0.3rem 0.6rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              미리보기
            </div>
            <div style={{ padding: '1rem' }}>
              <LivePreview />
              <LiveError style={{ color: '#ff6b6b', whiteSpace: 'pre-wrap', fontSize: '0.85rem' }} />
            </div>
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}
```

- [ ] **Step 2: 스모크 테스트 작성 — src/components/Playground.test.tsx**

```tsx
import { render, screen } from '@testing-library/react';
import Playground from './Playground';

test('플레이그라운드는 초기 코드의 미리보기를 렌더링한다', () => {
  render(<Playground initialCode={'<strong>안녕 React</strong>'} />);
  expect(screen.getByText('안녕 React')).toBeInTheDocument();
});

test('편집 영역(코드 라벨)을 보여준다', () => {
  render(<Playground initialCode={'<span>x</span>'} />);
  expect(screen.getByText('코드 (편집 가능)')).toBeInTheDocument();
});
```

- [ ] **Step 3: 테스트 실행해서 통과 확인**

Run: `npm test -- src/components/Playground.test.tsx`
Expected: PASS — 2 tests passed.
(만약 react-live가 jsdom에서 미리보기 텍스트를 노출하지 못하면, 첫 테스트를 `screen.getByText('미리보기')` 존재 확인으로 완화한다.)

- [ ] **Step 4: 커밋**

```bash
git add src/components/Playground.tsx src/components/Playground.test.tsx
git commit -m "feat: add live-editable Playground via react-live"
```

---

### Task 6: 도식 래퍼 + 첫 SVG 도식 (웹 3요소)

**Files:**
- Create: `src/components/diagrams/Diagram.tsx`
- Create: `src/components/diagrams/WebTrioDiagram.tsx`
- Test: `src/components/diagrams/diagrams.test.tsx`

**Interfaces:**
- Consumes: 없음
- Produces:
  - `Diagram: (props: { title: string; caption?: string; children: React.ReactNode }) => JSX.Element` — 반응형 SVG 래퍼(접근성 title 포함).
  - `WebTrioDiagram: () => JSX.Element` — HTML/CSS/JS 역할 관계 도식.

- [ ] **Step 1: src/components/diagrams/Diagram.tsx 작성**

```tsx
export default function Diagram({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure style={{ margin: '1.5rem 0' }}>
      <svg
        role="img"
        aria-label={title}
        viewBox="0 0 600 260"
        style={{
          width: '100%',
          height: 'auto',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
        }}
      >
        <title>{title}</title>
        {children}
      </svg>
      {caption && (
        <figcaption style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: src/components/diagrams/WebTrioDiagram.tsx 작성**

```tsx
import Diagram from './Diagram';

function Box({ x, label, role, color }: { x: number; label: string; role: string; color: string }) {
  return (
    <g>
      <rect x={x} y={70} width={150} height={90} rx={10} fill="var(--surface)" stroke={color} strokeWidth={2} />
      <text x={x + 75} y={105} textAnchor="middle" fill={color} fontSize={20} fontWeight="bold">
        {label}
      </text>
      <text x={x + 75} y={135} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        {role}
      </text>
    </g>
  );
}

export default function WebTrioDiagram() {
  return (
    <Diagram
      title="웹 페이지의 3요소"
      caption="HTML은 구조, CSS는 표현, JavaScript는 동작을 담당한다."
    >
      <text x={300} y={40} textAnchor="middle" fill="var(--text)" fontSize={18} fontWeight="bold">
        하나의 웹 페이지
      </text>
      <Box x={30} label="HTML" role="구조 (뼈대)" color="#e08a5b" />
      <Box x={225} label="CSS" role="표현 (꾸밈)" color="#6ea8fe" />
      <Box x={420} label="JS" role="동작 (상호작용)" color="#f7d774" />
      <text x={300} y={210} textAnchor="middle" fill="var(--text-dim)" fontSize={13}>
        React는 이 셋 중 주로 "동작 + 구조"를 더 잘 다루기 위해 등장했다.
      </text>
    </Diagram>
  );
}
```

- [ ] **Step 3: 스모크 테스트 작성 — src/components/diagrams/diagrams.test.tsx**

```tsx
import { render, screen } from '@testing-library/react';
import WebTrioDiagram from './WebTrioDiagram';

test('웹 3요소 도식은 접근성 라벨과 핵심 텍스트를 포함한다', () => {
  render(<WebTrioDiagram />);
  expect(screen.getByRole('img', { name: '웹 페이지의 3요소' })).toBeInTheDocument();
  expect(screen.getByText('HTML')).toBeInTheDocument();
  expect(screen.getByText('CSS')).toBeInTheDocument();
  expect(screen.getByText('JS')).toBeInTheDocument();
});
```

- [ ] **Step 4: 테스트 실행해서 통과 확인**

Run: `npm test -- src/components/diagrams/diagrams.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: 커밋**

```bash
git add src/components/diagrams/Diagram.tsx src/components/diagrams/WebTrioDiagram.tsx src/components/diagrams/diagrams.test.tsx
git commit -m "feat: add SVG Diagram wrapper and WebTrio diagram"
```

---

### Task 7: TermLink 컴포넌트 (용어 사전 연결)

**Files:**
- Create: `src/components/TermLink.tsx`
- Test: `src/components/TermLink.test.tsx`

**Interfaces:**
- Consumes: react-router-dom의 `Link`
- Produces: `TermLink: (props: { termId: string; children: React.ReactNode }) => JSX.Element` — `/glossary#<termId>`로 연결.

- [ ] **Step 1: src/components/TermLink.tsx 작성**

```tsx
import { Link } from 'react-router-dom';

export default function TermLink({
  termId,
  children,
}: {
  termId: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={`/glossary#${termId}`} style={{ borderBottom: '1px dotted var(--accent)' }}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: 테스트 작성 — src/components/TermLink.test.tsx**

```tsx
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
```

- [ ] **Step 3: 테스트 실행해서 통과 확인**

Run: `npm test -- src/components/TermLink.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 4: 커밋**

```bash
git add src/components/TermLink.tsx src/components/TermLink.test.tsx
git commit -m "feat: add TermLink linking to glossary entries"
```

---

### Task 8: Lesson 공통 틀 컴포넌트

**Files:**
- Create: `src/components/Lesson.tsx`
- Test: `src/components/Lesson.test.tsx`

**Interfaces:**
- Consumes: `useProgress` (Task 3), react-router-dom `Link`
- Produces: `type LessonNav = { id: string; title: string }` 그리고
  `Lesson: (props: { id: string; title: string; prev?: LessonNav; next?: LessonNav; children: React.ReactNode }) => JSX.Element`. 완료 토글 버튼과 이전/다음 링크를 렌더링한다.

- [ ] **Step 1: src/components/Lesson.tsx 작성**

```tsx
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export type LessonNav = { id: string; title: string };

export default function Lesson({
  id,
  title,
  prev,
  next,
  children,
}: {
  id: string;
  title: string;
  prev?: LessonNav;
  next?: LessonNav;
  children: React.ReactNode;
}) {
  const { isDone, toggle } = useProgress();
  const done = isDone(id);

  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{title}</h1>
        <button
          onClick={() => toggle(id)}
          style={{
            cursor: 'pointer',
            border: `1px solid ${done ? 'var(--ok)' : 'var(--border)'}`,
            background: done ? 'rgba(74,222,128,0.15)' : 'var(--surface-2)',
            color: 'var(--text)',
            borderRadius: '999px',
            padding: '0.4rem 0.9rem',
          }}
        >
          {done ? '✓ 완료함' : '완료로 표시'}
        </button>
      </header>

      {children}

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2.5rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '1rem',
        }}
      >
        <span>{prev && <Link to={`/lesson/${prev.id}`}>← {prev.title}</Link>}</span>
        <span>{next && <Link to={`/lesson/${next.id}`}>{next.title} →</Link>}</span>
      </nav>
    </article>
  );
}
```

- [ ] **Step 2: 테스트 작성 — src/components/Lesson.test.tsx**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lesson from './Lesson';

beforeEach(() => localStorage.clear());

function renderLesson() {
  return render(
    <MemoryRouter>
      <Lesson
        id="02-jsx"
        title="JSX 이해하기"
        prev={{ id: '01-intro', title: 'React란' }}
        next={{ id: '03-props', title: 'props' }}
      >
        <p>본문</p>
      </Lesson>
    </MemoryRouter>,
  );
}

test('제목, 본문, 이전/다음 링크를 렌더링한다', () => {
  renderLesson();
  expect(screen.getByText('JSX 이해하기')).toBeInTheDocument();
  expect(screen.getByText('본문')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '← React란' })).toHaveAttribute('href', '/lesson/01-intro');
  expect(screen.getByRole('link', { name: 'props →' })).toHaveAttribute('href', '/lesson/03-props');
});

test('완료 버튼을 누르면 상태가 바뀐다', () => {
  renderLesson();
  const btn = screen.getByRole('button', { name: '완료로 표시' });
  fireEvent.click(btn);
  expect(screen.getByRole('button', { name: '✓ 완료함' })).toBeInTheDocument();
});
```

- [ ] **Step 3: 테스트 실행해서 통과 확인**

Run: `npm test -- src/components/Lesson.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 4: 커밋**

```bash
git add src/components/Lesson.tsx src/components/Lesson.test.tsx
git commit -m "feat: add Lesson chrome (title, complete toggle, prev/next nav)"
```

---

### Task 9: 첫 강의 본문 2개 (01-intro, 02-jsx)

**Files:**
- Create: `src/pages/lessons/01-intro.tsx`
- Create: `src/pages/lessons/02-jsx.tsx`

**Interfaces:**
- Consumes: `Section`, `CodeBlock`, `Playground`, `Callout`, `TermLink`
- Produces: 각 파일이 default export로 강의 **본문만** 담은 컴포넌트(공통 틀은 라우트 래퍼가 입힘). `Intro01: () => JSX.Element`, `Jsx02: () => JSX.Element`.

- [ ] **Step 1: src/pages/lessons/01-intro.tsx 작성**

```tsx
import Section from '../../components/Section';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Intro01() {
  return (
    <>
      <Section title="React란 무엇인가">
        <p>
          React는 사용자 인터페이스(UI)를 만들기 위한 자바스크립트 라이브러리입니다. 화면을{' '}
          <TermLink termId="component">컴포넌트</TermLink>라는 작은 조각으로 나누고, 각 조각이
          "지금 상태에서는 이렇게 보인다"를 선언적으로 표현합니다.
        </p>
      </Section>
      <Section title="왜 React인가">
        <p>
          순수 JS로 DOM을 직접 조작하면 화면이 복잡해질수록 코드가 빠르게 얽힙니다. React는 상태가
          바뀌면 바뀐 부분만 알아서 다시 그려 주므로, 우리는 "무엇을 보여줄지"에 집중할 수 있습니다.
        </p>
        <Callout type="tip">
          더 깊은 배경과 원리(브라우저 렌더링, Virtual DOM 등)는 상단의 "배경과 원리" 페이지에서
          도식과 함께 다룹니다.
        </Callout>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: src/pages/lessons/02-jsx.tsx 작성**

```tsx
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import TermLink from '../../components/TermLink';

export default function Jsx02() {
  return (
    <>
      <Section title="JSX 이해하기">
        <p>
          <TermLink termId="jsx">JSX</TermLink>는 자바스크립트 안에서 UI를 HTML과 비슷한 문법으로
          표현하는 방법입니다. 아래 코드는 빌드 시 일반 함수 호출로 변환됩니다.
        </p>
        <CodeBlock
          code={`const element = <h1>안녕, React</h1>;`}
          caption="JSX 한 줄 — 화면에 제목을 표시한다."
        />
      </Section>
      <Section title="직접 해보기">
        <p>아래 코드를 고치면 오른쪽 미리보기가 즉시 바뀝니다.</p>
        <Playground
          initialCode={`function App() {
  const name = '여러분';
  return <h2>JSX로 인사하기: 안녕, {name}!</h2>;
}`}
        />
      </Section>
    </>
  );
}
```

- [ ] **Step 3: 타입체크로 본문이 컴파일되는지 확인**

Run: `npm run typecheck`
Expected: 타입 오류 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/pages/lessons/01-intro.tsx src/pages/lessons/02-jsx.tsx
git commit -m "feat: add first two lesson bodies (intro, jsx)"
```

---

### Task 10: 커리큘럼 레지스트리 (curriculum.ts)

**Files:**
- Create: `src/curriculum.ts`
- Test: `src/curriculum.test.ts`

**Interfaces:**
- Consumes: Task 9의 강의 본문 컴포넌트(lazy import)
- Produces:
  - `type LessonMeta = { id: string; section: string; title: string; Body: React.LazyExoticComponent<React.ComponentType> }`
  - `export const lessons: LessonMeta[]` (순서 = 학습 순서)
  - `export function getLesson(id: string): LessonMeta | undefined`
  - `export function getAdjacent(id: string): { prev?: { id: string; title: string }; next?: { id: string; title: string } }`
  - `export function lessonsBySection(): { name: string; lessons: LessonMeta[] }[]`
  - `export const totalLessons: number`

- [ ] **Step 1: src/curriculum.ts 작성**

```ts
import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

export type LessonMeta = {
  id: string;
  section: string;
  title: string;
  Body: LazyExoticComponent<ComponentType>;
};

export const lessons: LessonMeta[] = [
  {
    id: '01-intro',
    section: '입문',
    title: 'React란 무엇인가',
    Body: lazy(() => import('./pages/lessons/01-intro')),
  },
  {
    id: '02-jsx',
    section: '입문',
    title: 'JSX 이해하기',
    Body: lazy(() => import('./pages/lessons/02-jsx')),
  },
];

export const totalLessons = lessons.length;

export function getLesson(id: string): LessonMeta | undefined {
  return lessons.find((l) => l.id === id);
}

export function getAdjacent(id: string): {
  prev?: { id: string; title: string };
  next?: { id: string; title: string };
} {
  const i = lessons.findIndex((l) => l.id === id);
  if (i === -1) return {};
  const prev = i > 0 ? lessons[i - 1] : undefined;
  const next = i < lessons.length - 1 ? lessons[i + 1] : undefined;
  return {
    prev: prev && { id: prev.id, title: prev.title },
    next: next && { id: next.id, title: next.title },
  };
}

export function lessonsBySection(): { name: string; lessons: LessonMeta[] }[] {
  const order: string[] = [];
  const map = new Map<string, LessonMeta[]>();
  for (const l of lessons) {
    if (!map.has(l.section)) {
      map.set(l.section, []);
      order.push(l.section);
    }
    map.get(l.section)!.push(l);
  }
  return order.map((name) => ({ name, lessons: map.get(name)! }));
}
```

- [ ] **Step 2: 테스트 작성 — src/curriculum.test.ts**

```ts
import { lessons, getLesson, getAdjacent, lessonsBySection, totalLessons } from './curriculum';

test('강의 id는 중복이 없다', () => {
  const ids = lessons.map((l) => l.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('totalLessons는 강의 수와 같다', () => {
  expect(totalLessons).toBe(lessons.length);
});

test('getLesson은 메타데이터를 찾는다', () => {
  expect(getLesson('01-intro')?.title).toBe('React란 무엇인가');
  expect(getLesson('없음')).toBeUndefined();
});

test('getAdjacent는 이전/다음을 계산한다', () => {
  expect(getAdjacent('01-intro').prev).toBeUndefined();
  expect(getAdjacent('01-intro').next?.id).toBe('02-jsx');
  expect(getAdjacent('02-jsx').prev?.id).toBe('01-intro');
});

test('lessonsBySection은 섹션별로 묶는다', () => {
  const grouped = lessonsBySection();
  expect(grouped[0].name).toBe('입문');
  expect(grouped[0].lessons.length).toBeGreaterThanOrEqual(2);
});
```

- [ ] **Step 3: 테스트 실행해서 통과 확인**

Run: `npm test -- src/curriculum.test.ts`
Expected: PASS — 5 tests passed.

- [ ] **Step 4: 커밋**

```bash
git add src/curriculum.ts src/curriculum.test.ts
git commit -m "feat: add curriculum registry with adjacency and grouping"
```

---

### Task 11: 참고자료 페이지 (Foundations, Glossary, QnA)

**Files:**
- Create: `src/pages/Foundations.tsx`
- Create: `src/pages/Glossary.tsx`
- Create: `src/pages/QnA.tsx`
- Test: `src/pages/pages.test.tsx`

**Interfaces:**
- Consumes: `WebTrioDiagram`(Task 6), `glossary`/`qa` 데이터(Task 2), `Section`(Task 4)
- Produces: `Foundations`, `Glossary`, `QnA` (각 default export 컴포넌트).

- [ ] **Step 1: src/pages/Foundations.tsx 작성**

```tsx
import Section from '../components/Section';
import WebTrioDiagram from '../components/diagrams/WebTrioDiagram';

export default function Foundations() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>배경과 원리</h1>
      <p>
        React를 제대로 이해하려면 그 토대인 웹 기술 — HTML, CSS, JavaScript —가 각각 무엇을 위해
        존재하는지부터 알아야 합니다. 이 페이지는 그 배경과 동작 원리를 도식과 함께 한곳에 정리합니다.
      </p>

      <Section title="웹 페이지의 3요소">
        <p>
          하나의 웹 페이지는 역할이 다른 세 기술의 협업으로 만들어집니다. HTML은 구조, CSS는 표현,
          JavaScript는 동작을 담당합니다.
        </p>
        <WebTrioDiagram />
      </Section>

      <Section title="React는 왜 등장했나 (다음 도식 예정)">
        <p>
          UI가 복잡해질수록 JavaScript로 DOM을 직접 바꾸는 코드가 얽힙니다. React는 "상태 → 화면"을
          선언적으로 작성하게 해 이 문제를 푼다는 점을, 이후 브라우저 렌더링 흐름·Virtual DOM 도식과
          함께 채워 나갑니다.
        </p>
      </Section>
    </article>
  );
}
```

- [ ] **Step 2: src/pages/Glossary.tsx 작성**

```tsx
import { glossary } from '../content/glossary';

export default function Glossary() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>용어 사전</h1>
      <p>학습하면서 마주친 용어를 한곳에 모아 정리합니다.</p>
      <dl>
        {glossary.map((t) => (
          <div key={t.id} id={t.id} style={{ margin: '1.2rem 0', scrollMarginTop: '1rem' }}>
            <dt style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{t.term}</dt>
            <dd style={{ margin: '0.3rem 0 0' }}>{t.definition}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
```

- [ ] **Step 3: src/pages/QnA.tsx 작성**

```tsx
import { qa } from '../content/qa';

export default function QnA() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>Q&amp;A 모음</h1>
      <p>학습 중 나온 질문과 답을 누적합니다.</p>
      {qa.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
            margin: '1rem 0',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem' }}>Q. {item.question}</h3>
          <p style={{ margin: 0 }}>A. {item.answer}</p>
          <small style={{ color: 'var(--text-dim)' }}>{item.date}</small>
        </div>
      ))}
    </article>
  );
}
```

- [ ] **Step 4: 테스트 작성 — src/pages/pages.test.tsx**

```tsx
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
```

- [ ] **Step 5: 테스트 실행해서 통과 확인**

Run: `npm test -- src/pages/pages.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 6: 커밋**

```bash
git add src/pages/Foundations.tsx src/pages/Glossary.tsx src/pages/QnA.tsx src/pages/pages.test.tsx
git commit -m "feat: add Foundations, Glossary, and Q&A reference pages"
```

---

### Task 12: 앱 레이아웃 + 개요 + 라우팅 연결

**Files:**
- Create: `src/components/Sidebar.tsx`
- Create: `src/pages/Overview.tsx`
- Create: `src/routes/LessonRoute.tsx`
- Modify: `src/App.tsx` (전체 교체)
- Modify: `src/main.tsx` (BrowserRouter로 감싸기)
- Modify: `src/App.test.tsx` (라우터 컨텍스트 반영)
- Test: `src/pages/Overview.test.tsx`

**Interfaces:**
- Consumes: `lessonsBySection`/`lessons`/`getLesson`/`getAdjacent`/`totalLessons`(Task 10), `useProgress`(Task 3), `ProgressBar`(Task 4), `Lesson`(Task 8), 참고자료 페이지(Task 11)
- Produces: 라우팅이 연결된 동작하는 앱. 사이드바 + 콘텐츠 레이아웃.

- [ ] **Step 1: src/components/Sidebar.tsx 작성**

```tsx
import { NavLink } from 'react-router-dom';
import { lessonsBySection } from '../curriculum';
import { useProgress } from '../hooks/useProgress';

const REFS = [
  { to: '/', label: '개요' },
  { to: '/foundations', label: '배경과 원리' },
  { to: '/glossary', label: '용어 사전' },
  { to: '/qa', label: 'Q&A 모음' },
];

export default function Sidebar() {
  const { isDone } = useProgress();
  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        padding: '1rem',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
      }}
    >
      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>참고 자료</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {REFS.map((r) => (
          <li key={r.to}>
            <NavLink to={r.to} end style={{ display: 'block', padding: '0.3rem 0' }}>
              {r.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>커리큘럼</h3>
      {lessonsBySection().map((sec) => (
        <div key={sec.name}>
          <div style={{ fontWeight: 'bold', marginTop: '0.8rem' }}>{sec.name}</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sec.lessons.map((l) => (
              <li key={l.id}>
                <NavLink to={`/lesson/${l.id}`} style={{ display: 'block', padding: '0.25rem 0' }}>
                  {isDone(l.id) ? '✓ ' : '○ '}
                  {l.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
```

- [ ] **Step 2: src/pages/Overview.tsx 작성**

```tsx
import { Link } from 'react-router-dom';
import { lessons, lessonsBySection, totalLessons } from '../curriculum';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';

export default function Overview() {
  const { isDone, count } = useProgress();
  const nextLesson = lessons.find((l) => !isDone(l.id));

  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>React 강의 자료</h1>
      <p>
        직접 만들면서 배우는 React 커리큘럼입니다. 각 강의는 설명과 예제, 그리고 직접 고쳐볼 수 있는
        플레이그라운드로 구성됩니다.
      </p>

      <ProgressBar value={totalLessons ? count / totalLessons : 0} label={`전체 진행률 (${count}/${totalLessons})`} />

      {nextLesson ? (
        <p>
          <Link to={`/lesson/${nextLesson.id}`}>▶ 이어서 학습하기: {nextLesson.title}</Link>
        </p>
      ) : (
        <p>🎉 모든 강의를 완료했습니다!</p>
      )}

      <h2>커리큘럼</h2>
      {lessonsBySection().map((sec) => (
        <div key={sec.name}>
          <h3>{sec.name}</h3>
          <ul>
            {sec.lessons.map((l) => (
              <li key={l.id}>
                <Link to={`/lesson/${l.id}`}>{l.title}</Link> {isDone(l.id) && '✓'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}
```

- [ ] **Step 3: src/routes/LessonRoute.tsx 작성**

```tsx
import { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getLesson, getAdjacent } from '../curriculum';
import Lesson from '../components/Lesson';

export default function LessonRoute() {
  const { id } = useParams<{ id: string }>();
  const meta = id ? getLesson(id) : undefined;
  if (!meta) return <Navigate to="/" replace />;

  const { prev, next } = getAdjacent(meta.id);
  const Body = meta.Body;

  return (
    <Lesson id={meta.id} title={meta.title} prev={prev} next={next}>
      <Suspense fallback={<p>불러오는 중…</p>}>
        <Body />
      </Suspense>
    </Lesson>
  );
}
```

- [ ] **Step 4: src/App.tsx 전체 교체**

```tsx
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Foundations from './pages/Foundations';
import Glossary from './pages/Glossary';
import QnA from './pages/QnA';
import LessonRoute from './routes/LessonRoute';

export default function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/foundations" element={<Foundations />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/qa" element={<QnA />} />
          <Route path="/lesson/:id" element={<LessonRoute />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </main>
    </div>
  );
}
```

- [ ] **Step 5: src/main.tsx 수정 — BrowserRouter로 감싸기**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

- [ ] **Step 6: src/App.test.tsx 수정 — 라우터 컨텍스트 + 새 콘텐츠 반영**

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => localStorage.clear());

test('개요 페이지를 렌더링한다', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByText('React 강의 자료')).toBeInTheDocument();
});
```

- [ ] **Step 7: src/pages/Overview.test.tsx 작성**

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Overview from './Overview';

beforeEach(() => localStorage.clear());

test('개요는 진행률과 이어서 학습하기 링크를 보여준다', () => {
  render(<MemoryRouter><Overview /></MemoryRouter>);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByText(/이어서 학습하기/)).toBeInTheDocument();
});
```

- [ ] **Step 8: 전체 테스트 실행**

Run: `npm test`
Expected: PASS — 모든 테스트 통과.

- [ ] **Step 9: 타입체크 + 빌드 확인**

Run: `npm run typecheck && npm run build`
Expected: 타입 오류 없음, `dist/` 생성.

- [ ] **Step 10: 개발 서버로 수동 확인**

Run: `npm run dev`
Expected: 브라우저에서 `http://localhost:5173` 접속 시 — 사이드바(참고자료 + 커리큘럼), 개요의 진행률 바, 강의 페이지의 플레이그라운드 편집·미리보기, 완료 체크 토글 후 새로고침해도 유지되는지 확인.

- [ ] **Step 11: README 상태 문구 갱신 + 커밋 + 푸시**

README.md의 "현재 설계가 확정된 단계" 문구를 "1단계(뼈대) 구현 완료 — `npm install && npm run dev`로 실행" 로 수정한 뒤:

```bash
git add src/components/Sidebar.tsx src/pages/Overview.tsx src/pages/Overview.test.tsx src/routes/LessonRoute.tsx src/App.tsx src/main.tsx src/App.test.tsx README.md
git commit -m "feat: wire layout, overview, and routing into a working app"
git push origin main
```

---

## Self-Review (작성자 점검 결과)

- **스펙 커버리지:** 커리큘럼 단일출처(Task 10) ✓, 설명+코드+플레이그라운드(Task 4·5·9) ✓, 개요/대시보드(Task 12) ✓, 진도추적(Task 3·8·12) ✓, Q&A(Task 2·11) ✓, 용어사전+TermLink(Task 2·7·11) ✓, 배경·원리+수제 SVG 도식(Task 6·11) ✓, 라우팅(Task 12) ✓, 에러처리(localStorage try/catch Task 3, 라우트 폴백 Task 12, LiveError Task 5) ✓, 테스트 전략(각 Task TDD/스모크) ✓.
- **누적 운영 방식:** Q&A/용어/도식 추가 경로가 데이터 파일·diagrams 폴더로 확립됨 — 이후 강의 추가는 "본문 .tsx 생성 + curriculum.ts 한 줄"로 반복.
- **플레이스홀더 스캔:** 코드 없는 지시·TBD 없음. (Foundations의 "다음 도식 예정" 섹션은 의도된 누적 자리로, 동작하는 본문 텍스트를 포함.)
- **타입 일관성:** `LessonMeta.Body`(LazyExoticComponent)와 LessonRoute의 사용 일치, `getAdjacent` 반환형과 `Lesson`의 `prev/next`(LessonNav) 일치, `useProgress` API(isDone/toggle/count/completedIds) 전 Task 일관.

## 범위 밖(다음 단계 계획에서)
- 나머지 강의(props·이벤트·리스트·폼·Hooks·Context·라우팅·API·성능·배포)
- 추가 SVG 도식(브라우저 렌더링 흐름, Virtual DOM)
- 강의별 학습 메모, 전체 검색, 배포 자동화
