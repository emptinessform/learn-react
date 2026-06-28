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
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <ScrollToHash />
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
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
