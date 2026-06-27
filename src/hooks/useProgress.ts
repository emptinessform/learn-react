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
