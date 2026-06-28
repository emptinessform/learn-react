import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router는 경로의 #해시로 자동 스크롤하지 않는다.
 * 이 컴포넌트는 경로/해시가 바뀔 때 해당 id 요소로 부드럽게 스크롤한다.
 * (예: 용어 본문에서 <TermLink>로 /glossary#jsx 로 이동했을 때)
 */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    el?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }, [hash, pathname]);

  return null;
}
