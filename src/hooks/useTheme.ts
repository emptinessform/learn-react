import { useCallback, useEffect, useState } from 'react';

export const THEME_KEY = 'react-curriculum:theme';
export type Theme = 'dark' | 'light';

function loadTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

/** 문서 루트에 data-theme를 적용한다(CSS 변수 전환). */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

/** 앱 시작 시 저장된 테마를 즉시 적용해 깜빡임을 막는다(main.tsx에서 호출). */
export function initTheme(): void {
  applyTheme(loadTheme());
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        console.warn('테마 저장 실패: localStorage에 접근할 수 없습니다.');
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
