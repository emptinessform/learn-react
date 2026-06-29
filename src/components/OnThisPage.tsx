import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Item = { id: string; text: string };

/**
 * 현재 페이지(main) 안의 h2 섹션을 자동으로 찾아 목차를 만들고,
 * 스크롤 위치에 따라 현재 섹션을 강조한다. 섹션이 3개 미만이면 렌더하지 않는다.
 * HashRouter와 충돌하지 않도록 앵커(href="#id") 대신 JS 스크롤을 쓴다.
 */
export default function OnThisPage() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const main = document.getElementById('main');
    if (!main) return;

    let observer: IntersectionObserver | null = null;

    const discover = () => {
      const headings = Array.from(main.querySelectorAll('h2'));
      headings.forEach((h, i) => {
        if (!h.id) h.id = `sec-${i}`;
      });
      const next = headings.map((h) => ({ id: h.id, text: (h.textContent ?? '').trim() }));

      setItems((prev) => {
        const same =
          prev.length === next.length &&
          prev.every((p, i) => p.id === next[i].id && p.text === next[i].text);
        return same ? prev : next;
      });

      if (observer) observer.disconnect();
      if ('IntersectionObserver' in window && headings.length) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) setActiveId((e.target as HTMLElement).id);
            });
          },
          { rootMargin: '-10% 0px -75% 0px', threshold: 0 },
        );
        headings.forEach((h) => observer!.observe(h));
      }
    };

    discover();
    const mo = new MutationObserver(() => discover());
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  if (items.length < 3) return null;

  return (
    <nav className="onthispage" aria-label="이 페이지 목차">
      <span className="onthispage__label">이 페이지</span>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={`onthispage__link${activeId === it.id ? ' is-active' : ''}`}
          aria-current={activeId === it.id ? 'true' : undefined}
          onClick={() =>
            document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        >
          {it.text}
        </button>
      ))}
    </nav>
  );
}
