import { PROGRESS_KEY } from '../hooks/useProgress';
import { NOTES_KEY } from '../hooks/useNotes';

export type BackupData = {
  version: 1;
  progress: string[];
  notes: Record<string, string>;
};

function parseOr<T>(raw: string | null, fallback: T): T {
  try {
    const parsed = raw ? JSON.parse(raw) : fallback;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

/** 현재 localStorage의 진도·메모를 JSON 문자열로 직렬화한다. */
export function serializeBackup(): string {
  const progressRaw = parseOr<unknown>(localStorage.getItem(PROGRESS_KEY), []);
  const notesRaw = parseOr<unknown>(localStorage.getItem(NOTES_KEY), {});

  const data: BackupData = {
    version: 1,
    progress: Array.isArray(progressRaw)
      ? progressRaw.filter((x): x is string => typeof x === 'string')
      : [],
    notes:
      notesRaw && typeof notesRaw === 'object' && !Array.isArray(notesRaw)
        ? (notesRaw as Record<string, string>)
        : {},
  };

  return JSON.stringify(data, null, 2);
}

/**
 * 백업 JSON을 localStorage에 적용한다. 유효한 부분만 기록한다.
 * 형식이 전혀 맞지 않으면 예외를 던진다.
 */
export function applyBackup(json: string): void {
  const data = JSON.parse(json);
  if (!data || typeof data !== 'object') {
    throw new Error('백업 형식이 올바르지 않습니다.');
  }

  if (Array.isArray(data.progress)) {
    const progress = data.progress.filter((x: unknown) => typeof x === 'string');
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  if (data.notes && typeof data.notes === 'object' && !Array.isArray(data.notes)) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(data.notes));
  }
}
