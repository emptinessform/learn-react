import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ScrollToHash from './components/ScrollToHash';
import Overview from './pages/Overview';
import Foundations from './pages/Foundations';
import Glossary from './pages/Glossary';
import QnA from './pages/QnA';
import Search from './pages/Search';
import LessonRoute from './routes/LessonRoute';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  // 드로어가 열려 있을 때 Esc로 닫는다.
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  return (
    <div className="app-shell">
      <button
        type="button"
        className="skip-link"
        onClick={() => document.getElementById('main')?.focus()}
      >
        본문으로 건너뛰기
      </button>

      <ScrollToHash />

      <button
        type="button"
        className="app-hamburger"
        aria-label="메뉴 열기"
        aria-expanded={navOpen}
        aria-controls="sidebar"
        onClick={() => setNavOpen(true)}
      >
        ☰
      </button>

      {navOpen && <div className="app-overlay" data-testid="nav-overlay" onClick={closeNav} />}

      <Sidebar open={navOpen} onNavigate={closeNav} />

      <main id="main" tabIndex={-1} className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/foundations" element={<Foundations />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/qa" element={<QnA />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lesson/:id" element={<LessonRoute />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </main>
    </div>
  );
}
