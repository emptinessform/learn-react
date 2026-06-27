# React 강의 자료 사이트 — 설계 문서

- 작성일: 2026-06-27
- 상태: 승인됨 (구현 계획 작성 단계로 진행)

## 1. 목적과 배경

작성자가 React를 직접 배우면서, 동시에 다른 사람을 가르칠 수 있는 강의 자료를
만든다. 결과물은 React 강의 커리큘럼 사이트로, 강의를 직접 React로 구현하는 과정
자체가 React 학습이 된다.

핵심 요구사항:

- 기초부터 실전까지 전체를 다루는 커리큘럼
- 각 강의는 **설명 + 코드 + 편집·실행 가능한 플레이그라운드**를 함께 제공
- 전체를 설명하는 **개요(대시보드) 페이지** 존재
- **진도 추적**(강의별 완료 체크 + 전체 진행률) 제공
- **지식 베이스**: Q&A 모음 / 용어 사전 / 배경·원리(도식 포함)를 각각 한 곳에서
  누적·정리
- **수제 SVG 도식**으로 효과적인 시각 설명
- 한국어 콘텐츠

## 2. 기술 스택 결정

| 항목 | 결정 | 비고 |
|------|------|------|
| 빌드/번들 | Vite | 빠른 개발 서버, 표준 |
| 라이브러리 | React | 학습 대상 |
| 언어 | TypeScript | 실무 표준, 처음부터 타입 함께 학습 |
| 라우팅 | React Router | 강의별/참고자료별 라우트 |
| 강의 작성 | React 컴포넌트(.tsx) | 재사용 컴포넌트 조합 방식 |
| 플레이그라운드 | react-live | 가벼운 인라인 편집+실행 (대안: Sandpack) |
| 도식 | 수제 SVG React 컴포넌트 | 완전한 제어·선명함·애니메이션 가능 |
| 진도 저장 | localStorage | 서버 불필요 |
| 스타일 | 커스텀 CSS (CSS 변수, 다크/라이트) | 필요 시 추후 정리 |

검토했으나 채택하지 않은 대안:

- **정적 HTML + CDN(React UMD + Babel)**: 빌드 없이 파일만 열면 되지만, React를
  실전 툴체인으로 배우는 학습 목표에 덜 부합하여 탈락.
- **MDX로 강의 작성**: 글쓰기엔 편하지만, JSX 작성 연습과 컴포넌트 조합 학습을
  위해 .tsx 컴포넌트 직접 작성 방식을 선택.
- **도식: Mermaid**: 빠르지만 디자인 자유도·정교함이 낮아, 교육용 "탁월한 도식"
  목표에 맞춰 수제 SVG를 선택.

## 3. 폴더 구조

```
react/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ src/
   ├─ main.tsx                 # 앱 진입점 + 라우터
   ├─ App.tsx                  # 레이아웃(사이드바 + 콘텐츠)
   ├─ curriculum.ts            # 강의 목록 단일 소스 (id, 섹션, 제목, 컴포넌트)
   ├─ components/              # 재사용 UI 컴포넌트
   │   ├─ Lesson.tsx
   │   ├─ Section.tsx
   │   ├─ CodeBlock.tsx
   │   ├─ Playground.tsx
   │   ├─ Callout.tsx
   │   ├─ ProgressBar.tsx
   │   ├─ TermLink.tsx         # 본문에서 용어 사전으로 연결
   │   └─ diagrams/            # 수제 SVG 도식 컴포넌트
   │       ├─ Diagram.tsx      #   공통 도식 래퍼(캡션, 반응형 viewBox)
   │       ├─ WebTrioDiagram.tsx       # HTML/CSS/JS 관계
   │       ├─ BrowserRenderDiagram.tsx # 브라우저 렌더링 흐름
   │       ├─ VirtualDomDiagram.tsx    # Virtual DOM 동작
   │       └─ ...
   ├─ hooks/
   │   └─ useProgress.ts
   ├─ content/                 # 누적·정리되는 데이터(단일 출처)
   │   ├─ qa.ts                #   Q&A 항목 배열
   │   └─ glossary.ts          #   용어 사전 항목 배열
   ├─ pages/
   │   ├─ Overview.tsx         # 개요/대시보드
   │   ├─ QnA.tsx              # Q&A 모음 페이지
   │   ├─ Glossary.tsx         # 용어 사전 페이지
   │   ├─ Foundations.tsx      # 배경과 원리(도식 중심)
   │   └─ lessons/
   │       ├─ 01-intro.tsx
   │       ├─ 02-jsx.tsx
   │       └─ ...
   └─ styles/
       └─ global.css
```

### 단일 출처 원칙

- `curriculum.ts`가 모든 강의의 단일 출처. 사이드바, 개요 목록, 진행률, 라우팅이
  모두 이 파일을 읽는다. **강의 추가 = 강의 컴포넌트 파일 생성 + `curriculum.ts`에
  항목 한 줄 추가.**
- `content/qa.ts`, `content/glossary.ts`가 각각 Q&A·용어의 단일 출처. **항목 추가 =
  배열에 객체 하나 추가**, 페이지는 자동 반영.

## 4. 모듈별 책임과 인터페이스

### curriculum.ts
- 책임: 강의 메타데이터 배열을 export.
- 데이터 형태(예):
  ```ts
  type Lesson = {
    id: string;          // 예: "02-jsx" (라우트 및 진도 키)
    section: string;     // 예: "입문"
    title: string;
    component: React.ComponentType;   // lazy 가능
  };
  type Curriculum = { sections: { name: string; lessons: Lesson[] }[] };
  ```

### content/qa.ts
- 책임: Q&A 항목 배열 export. 학습 중 누적.
- 항목 형태:
  ```ts
  type QnAItem = {
    id: string;
    question: string;
    answer: string;          // 줄바꿈/간단 마크업 허용(렌더 시 처리)
    date: string;            // "2026-06-27"
    relatedLessonId?: string;
    tags?: string[];
  };
  ```

### content/glossary.ts
- 책임: 용어 항목 배열 export. 누적.
- 항목 형태:
  ```ts
  type Term = {
    id: string;              // 예: "virtual-dom"
    term: string;            // 예: "Virtual DOM"
    definition: string;
    related?: string[];      // 다른 용어 id
    relatedLessonId?: string;
  };
  ```

### App.tsx
- 책임: 사이드바 + 콘텐츠 레이아웃, 라우트 정의.
- 사이드바 구성: 상단 **참고 자료** 그룹(개요·배경과 원리·용어 사전·Q&A) + 그 아래
  **커리큘럼** 그룹(섹션별 강의, 완료 표시).

### pages/Overview.tsx
- 책임: 커리큘럼 전체 소개, 전체 진행률 바, 섹션별 강의 목록(완료 표시),
  "이어서 학습하기" 버튼(완료 안 된 첫 강의로 이동), 참고 자료로의 진입 링크.

### pages/Foundations.tsx
- 책임: JS/HTML/CSS/React의 등장 배경과 동작 원리를 도식과 함께 깊이 있게 설명.
- 구성(초안): 웹의 3요소 관계 → 브라우저 렌더링 흐름 → DOM 직접 조작의 한계 →
  React 선언형 UI 등장 → Virtual DOM 원리 → 컴포넌트/상태 개념.
- diagrams/ 의 SVG 컴포넌트들을 본문에 배치.

### pages/QnA.tsx / pages/Glossary.tsx
- 책임: 각 데이터 파일을 읽어 목록 렌더. 검색/필터는 1단계에선 간단한 텍스트 필터
  수준(선택), 상호 링크 지원.

### components/Lesson.tsx
- 책임: 강의 공통 틀 — 제목, 본문 슬롯, 이전/다음 버튼, 완료 체크 버튼.
- props: `{ id: string; children: React.ReactNode }`.

### components/Section.tsx
- props: `{ title: string; children }`. 소제목 + 단락 묶음.

### components/CodeBlock.tsx
- 책임: 코드 표시 + 구문 강조(+선택 캡션). 실행 안 함.
- props: `{ code: string; language?: string; caption?: string }`.

### components/Playground.tsx
- 책임: 편집 가능한 코드 + 실시간 미리보기 + 에러 표시(react-live 래핑).
- props: `{ initialCode: string; scope?: Record<string, unknown> }`.

### components/Callout.tsx
- props: `{ type?: "tip"|"warn"|"info"; children }`.

### components/ProgressBar.tsx
- props: `{ value: number; label?: string }`. 비율(0~1)을 막대로.

### components/TermLink.tsx
- 책임: 본문에서 용어를 감싸 용어 사전 항목(`/glossary#<id>`)으로 링크.
- props: `{ termId: string; children }`.

### components/diagrams/Diagram.tsx
- 책임: 모든 SVG 도식의 공통 래퍼 — 반응형 viewBox, 캡션, 접근성(title/desc).
- props: `{ title: string; caption?: string; children: SVG 요소 }`.
- 개별 도식 컴포넌트는 이 래퍼 안에 순수 SVG를 그린다.

### hooks/useProgress.ts
- 책임: localStorage 기반 진도 상태 관리.
- 반환: `{ completed: Set<string>; isDone(id): boolean; toggle(id): void;
  count: number; total: number; ratio: number }`.
- 저장 키: 단일 키(예: `react-curriculum:progress`)에 완료 id 배열을 JSON 저장.
- total은 curriculum.ts 전체 강의 수에서 계산.

## 5. 라우팅

- `/` → 개요(Overview)
- `/foundations` → 배경과 원리
- `/glossary` → 용어 사전 (`#id`로 항목 앵커)
- `/qa` → Q&A 모음
- `/lesson/:id` → 강의 페이지
- 알 수 없는 경로 → 개요로 리다이렉트

## 6. 데이터 흐름

1. 앱 시작 → `useProgress`가 localStorage에서 완료 id 로드.
2. 사이드바/개요 → curriculum.ts 읽어 목록 렌더, useProgress로 완료 표시.
3. 강의 페이지 → `<Lesson>`이 완료 버튼 제공 → `toggle(id)` → localStorage 갱신 →
   진행률 UI 자동 반영.
4. Q&A/용어 페이지 → content 데이터 파일을 읽어 렌더. 본문의 `<TermLink>`가 용어
   사전으로 연결.
5. 플레이그라운드 → 사용자가 코드 편집 → react-live가 실시간 렌더(앱 상태와 격리).

## 7. 에러 처리

- 플레이그라운드: 컴파일/런타임 에러는 react-live의 LiveError로 인라인 표시(앱 중단
  없음).
- 라우팅: 존재하지 않는 강의/용어 id → 적절한 폴백(개요 리다이렉트 또는 "찾을 수
  없음").
- localStorage 접근 실패: try/catch로 감싸 메모리 폴백, 콘솔 경고.

## 8. 초기 커리큘럼(섹션 구성)

1. **입문**: React란 / 개발환경 / 첫 컴포넌트 / JSX
2. **컴포넌트 기초**: props / 이벤트 / 조건부·리스트 렌더링 / 폼
3. **상태와 Hooks**: useState / useEffect / useRef / 커스텀 훅
4. **구조화**: 컴포넌트 합성 / Context / 라우팅
5. **실전**: API 연동(fetch) / 상태관리 / 성능 최적화 / 배포

구현 순서: 먼저 앱 뼈대(레이아웃, 라우팅, 진도, 재사용 컴포넌트, 플레이그라운드,
도식 래퍼)와 참고 자료 페이지 골격을 완성하고 1~2섹션 강의 1~2개 + 배경과 원리
초안으로 검증한다. 이후 강의·Q&A·용어·도식을 하나씩 누적한다.

## 9. 누적 운영 방식(중요)

학습이 진행될 때마다:

- 새 질문이 나오면 → `content/qa.ts`에 항목 추가
- 새 용어가 나오면 → `content/glossary.ts`에 항목 추가 + 본문에서 `<TermLink>`로 연결
- 개념의 배경/원리는 → `Foundations.tsx`와 `diagrams/`에 도식 추가

이 흐름을 통해 Q&A·용어·도식이 "한 곳에서" 계속 정리·축적된다.

## 10. 테스트 전략

- 핵심 로직(`useProgress`)은 단위 테스트(Vitest): toggle/완료 카운트/persist.
- 데이터 무결성(curriculum/qa/glossary의 id 중복 없음, 참조 유효성) 간단 테스트.
- 컴포넌트는 렌더 스모크 테스트(React Testing Library) 수준으로 시작.
- 강의 콘텐츠/도식은 수동 확인(브라우저).

## 11. 범위 밖(추후 단계)

- 강의별 학습 메모 기능
- 다국어
- 전체 검색(고급)
- 오프라인(라이브러리 vendoring)
- 배포 자동화

이 항목들은 1단계 완료 후 별도 spec으로 다룬다.
