import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

export type LessonMeta = {
  id: string;
  section: string;
  title: string;
  keywords: string[];
  Body: LazyExoticComponent<ComponentType>;
};

export const lessons: LessonMeta[] = [
  {
    id: '01-intro',
    section: '입문',
    title: 'React란 무엇인가',
    keywords: ['선언형', '명령형', '라이브러리', 'UI', '컴포넌트'],
    Body: lazy(() => import('./pages/lessons/01-intro')),
  },
  {
    id: '02-jsx',
    section: '입문',
    title: 'JSX 이해하기',
    keywords: ['JSX', 'Fragment', 'className', '중괄호', '표현식'],
    Body: lazy(() => import('./pages/lessons/02-jsx')),
  },
  {
    id: '03-props',
    section: '컴포넌트 기초',
    title: 'props로 데이터 전달하기',
    keywords: ['props', '구조 분해', '읽기 전용', '데이터 전달'],
    Body: lazy(() => import('./pages/lessons/03-props')),
  },
  {
    id: '04-events',
    section: '컴포넌트 기초',
    title: '이벤트 다루기',
    keywords: ['이벤트', 'onClick', 'onChange', '핸들러', '이벤트 객체'],
    Body: lazy(() => import('./pages/lessons/04-events')),
  },
  {
    id: '05-list',
    section: '컴포넌트 기초',
    title: '조건부 렌더링과 리스트',
    keywords: ['조건부 렌더링', '리스트', 'map', 'key', '삼항'],
    Body: lazy(() => import('./pages/lessons/05-list')),
  },
  {
    id: '06-forms',
    section: '컴포넌트 기초',
    title: '폼 다루기',
    keywords: ['폼', '입력', '제어 컴포넌트', 'onChange', 'value', '체크박스'],
    Body: lazy(() => import('./pages/lessons/06-forms')),
  },
  {
    id: '07-usestate',
    section: '상태와 Hooks',
    title: 'useState로 상태 관리하기',
    keywords: ['useState', '상태', 'state', 'setState', '함수형 업데이트', '훅'],
    Body: lazy(() => import('./pages/lessons/07-usestate')),
  },
  {
    id: '08-useeffect',
    section: '상태와 Hooks',
    title: 'useEffect로 사이드 이펙트 다루기',
    keywords: ['useEffect', '사이드 이펙트', '의존성 배열', 'cleanup', '타이머', 'fetch'],
    Body: lazy(() => import('./pages/lessons/08-useeffect')),
  },
  {
    id: '09-useref',
    section: '상태와 Hooks',
    title: 'useRef로 값·DOM 참조하기',
    keywords: ['useRef', 'ref', 'DOM 참조', 'focus'],
    Body: lazy(() => import('./pages/lessons/09-useref')),
  },
  {
    id: '10-custom-hooks',
    section: '상태와 Hooks',
    title: '커스텀 훅 만들기',
    keywords: ['커스텀 훅', 'use', '로직 재사용', 'useToggle'],
    Body: lazy(() => import('./pages/lessons/10-custom-hooks')),
  },
  {
    id: '11-composition',
    section: '구조화',
    title: '컴포넌트 합성',
    keywords: ['합성', 'children', '재사용', '상속'],
    Body: lazy(() => import('./pages/lessons/11-composition')),
  },
  {
    id: '12-context',
    section: '구조화',
    title: 'Context로 값 공유하기',
    keywords: ['Context', 'createContext', 'useContext', 'Provider', 'prop drilling', '전역 상태'],
    Body: lazy(() => import('./pages/lessons/12-context')),
  },
  {
    id: '13-routing',
    section: '구조화',
    title: 'React Router로 페이지 나누기',
    keywords: ['라우팅', 'react-router', 'Route', 'Link', 'NavLink', 'useParams', 'BrowserRouter'],
    Body: lazy(() => import('./pages/lessons/13-routing')),
  },
  {
    id: '14-fetch',
    section: '실전',
    title: 'API에서 데이터 가져오기',
    keywords: ['fetch', 'API', '로딩', '에러', '비동기', '데이터 가져오기'],
    Body: lazy(() => import('./pages/lessons/14-fetch')),
  },
  {
    id: '15-state-management',
    section: '실전',
    title: '상태 관리: 끌어올리기와 Context',
    keywords: ['상태 관리', '끌어올리기', 'lifting state up', 'Context', 'Redux', 'Zustand'],
    Body: lazy(() => import('./pages/lessons/15-state-management')),
  },
  {
    id: '16-performance',
    section: '실전',
    title: '성능 최적화',
    keywords: ['성능', '최적화', 'memo', 'useMemo', 'useCallback', '메모이제이션', '리렌더'],
    Body: lazy(() => import('./pages/lessons/16-performance')),
  },
  {
    id: '17-deploy',
    section: '실전',
    title: '빌드와 배포',
    keywords: ['빌드', '배포', 'dist', '정적 호스팅', 'GitHub Pages', 'HashRouter', 'history fallback'],
    Body: lazy(() => import('./pages/lessons/17-deploy')),
  },
  {
    id: '18-capstone-todo',
    section: '캡스톤',
    title: '직접 만들기: 할 일 앱',
    keywords: ['캡스톤', '할 일', 'todo', '프로젝트', '종합', '불변 업데이트'],
    Body: lazy(() => import('./pages/lessons/18-capstone-todo')),
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
