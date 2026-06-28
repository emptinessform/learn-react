import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { initTheme } from './hooks/useTheme';
import './styles/global.css';

// 저장된 테마를 렌더 전에 적용해 첫 화면 깜빡임을 막는다.
initTheme();

// HashRouter: 경로를 # 뒤에 둬서(예: /learn-react/#/lesson/02-jsx) 정적 호스팅
// (GitHub Pages)에서 별도 서버 설정(history fallback) 없이도 새로고침/딥링크가 동작한다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
