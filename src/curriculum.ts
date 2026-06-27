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
