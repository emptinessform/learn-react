import { createContext, useContext } from 'react';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Context12() {
  return (
    <>
      <Section title="Context로 전역처럼 값 공유하기">
        <p>
          props는 부모→자식으로만 흐르기 때문에, 깊이 있는 컴포넌트에 값을 넘기려면 중간 컴포넌트들이
          쓰지도 않는 props를 계속 전달해야 합니다. 이 문제를{' '}
          <TermLink termId="prop-drilling">prop drilling</TermLink>이라 합니다.{' '}
          <TermLink termId="context">Context</TermLink>는 트리 전체에서 값을 꺼내 쓸 수 있게 해 이
          문제를 풉니다.
        </p>
        <CodeBlock
          code={`const ThemeContext = createContext('light');

// 위에서 값을 제공
<ThemeContext.Provider value="dark">
  <Toolbar />
</ThemeContext.Provider>

// 아래 어디서든 꺼내 쓰기
const theme = useContext(ThemeContext);`}
          caption="Provider로 값을 내려주고, useContext로 어느 깊이에서든 꺼낸다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>Provider의 value를 "light"로 바꿔 보세요. 깊은 곳의 Toolbar가 바로 따라 바뀝니다.</p>
        <Playground
          noInline
          scope={{ createContext, useContext }}
          initialCode={`const ThemeContext = createContext('light');

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>현재 테마: <strong>{theme}</strong></p>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <div>
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}

render(<App />);`}
        />
      </Section>

      <Callout type="warn">
        Context는 편하지만 남용하면 컴포넌트 재사용성이 떨어지고 불필요한 리렌더가 생길 수 있습니다.
        테마·로그인 사용자·언어처럼 "정말 여러 곳에서 공유해야 하는 값"에 쓰는 것이 좋습니다.
      </Callout>
    </>
  );
}
