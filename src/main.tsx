import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

// HashRouter: 경로를 # 뒤에 둬서(예: /learn-react/#/lesson/02-jsx) 정적 호스팅
// (GitHub Pages)에서 별도 서버 설정(history fallback) 없이도 새로고침/딥링크가 동작한다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
