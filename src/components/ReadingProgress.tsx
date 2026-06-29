import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** 상단 고정 읽기 진행바. 문서 스크롤 비율을 너비로 표시한다. */
export default function ReadingProgress() {
  const { pathname } = useLocation();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    update(); // 경로 변경 시 재계산
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  return (
    <div
      className="reading-progress"
      style={{ width: `${pct}%` }}
      role="progressbar"
      aria-label="읽기 진행률"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid="reading-progress"
    />
  );
}
