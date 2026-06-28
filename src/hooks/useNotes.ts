import { useCallback, useState } from 'react';

export const NOTES_KEY = 'react-curriculum:notes';

function loadAll(): Record<string, string> {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function saveAll(notes: Record<string, string>): void {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch {
    console.warn('메모 저장 실패: localStorage에 접근할 수 없습니다.');
  }
}

/**
 * 한 강의의 학습 메모를 localStorage에 보관한다.
 * 모든 메모는 NOTES_KEY 하나에 { 강의id: 메모 } 형태로 저장된다.
 */
export function useLessonNote(id: string): [string, (text: string) => void] {
  const [note, setNoteState] = useState<string>(() => loadAll()[id] ?? '');

  const setNote = useCallback(
    (text: string) => {
      setNoteState(text);
      const all = loadAll();
      all[id] = text;
      saveAll(all);
    },
    [id],
  );

  return [note, setNote];
}
