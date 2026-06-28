import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Routing13() {
  return (
    <>
      <Section title="React Router로 페이지 나누기">
        <p>
          React 자체에는 페이지(주소) 개념이 없습니다. <TermLink termId="routing">라우팅</TermLink>은{' '}
          <code>react-router-dom</code> 같은 라이브러리로 더합니다. 주소에 따라 다른 컴포넌트를 보여주고,
          새로고침 없이 화면만 바꿉니다.
        </p>
        <CodeBlock
          code={`<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/lesson/:id" element={<Lesson />} />
  </Routes>
</BrowserRouter>

// 이동은 <Link>로, 경로 파라미터는 useParams()로
<Link to="/about">소개</Link>
const { id } = useParams();`}
          caption="Route가 주소와 컴포넌트를 연결하고, Link로 이동한다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>링크를 눌러 보세요. 주소에 따라 보여지는 컴포넌트가 바뀝니다.</p>
        <Playground
          noInline
          scope={{ MemoryRouter, Routes, Route, Link }}
          initialCode={`function Home() { return <p>🏠 홈 페이지</p>; }
function About() { return <p>📖 소개 페이지</p>; }

function App() {
  return (
    <MemoryRouter>
      <nav>
        <Link to="/">홈</Link>{' | '}
        <Link to="/about">소개</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MemoryRouter>
  );
}

render(<App />);`}
        />
      </Section>

      <Callout type="info">
        지금 보고 있는 이 사이트가 바로 React Router로 만들어졌습니다. 왼쪽 사이드바의 링크들이 위
        예제의 <code>&lt;Link&gt;</code>이고, 각 강의 페이지가 <code>/lesson/:id</code> 라우트입니다.
      </Callout>
    </>
  );
}
