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
  {
    id: '03-props',
    section: '컴포넌트 기초',
    title: 'props로 데이터 전달하기',
    Body: lazy(() => import('./pages/lessons/03-props')),
  },
  {
    id: '04-events',
    section: '컴포넌트 기초',
    title: '이벤트 다루기',
    Body: lazy(() => import('./pages/lessons/04-events')),
  },
  {
    id: '05-list',
    section: '컴포넌트 기초',
    title: '조건부 렌더링과 리스트',
    Body: lazy(() => import('./pages/lessons/05-list')),
  },
  {
    id: '06-forms',
    section: '컴포넌트 기초',
    title: '폼 다루기',
    Body: lazy(() => import('./pages/lessons/06-forms')),
  },
  {
    id: '07-usestate',
    section: '상태와 Hooks',
    title: 'useState로 상태 관리하기',
    Body: lazy(() => import('./pages/lessons/07-usestate')),
  },
  {
    id: '08-useeffect',
    section: '상태와 Hooks',
    title: 'useEffect로 사이드 이펙트 다루기',
    Body: lazy(() => import('./pages/lessons/08-useeffect')),
  },
  {
    id: '09-useref',
    section: '상태와 Hooks',
    title: 'useRef로 값·DOM 참조하기',
    Body: lazy(() => import('./pages/lessons/09-useref')),
  },
  {
    id: '10-custom-hooks',
    section: '상태와 Hooks',
    title: '커스텀 훅 만들기',
    Body: lazy(() => import('./pages/lessons/10-custom-hooks')),
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
