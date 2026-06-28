import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function List05() {
  return (
    <>
      <Section title="조건부 렌더링">
        <p>
          JSX 안에서는 조건에 따라 다른 내용을 보여줄 수 있습니다. 삼항 연산자와 <code>&&</code>를 자주
          씁니다.
        </p>
        <CodeBlock
          code={`{isLoggedIn ? <p>환영합니다</p> : <p>로그인하세요</p>}

{count > 0 && <p>새 알림 {count}개</p>}`}
          caption="삼항은 둘 중 하나, && 는 '참일 때만' 보여줄 때 쓴다."
        />
      </Section>

      <Section title="리스트 렌더링">
        <p>
          배열을 화면에 그릴 때는 <code>.map()</code>으로 각 항목을 JSX로 변환합니다. 이때 각 항목에는{' '}
          <TermLink termId="list-key">key</TermLink>를 붙여야 합니다.
        </p>
        <CodeBlock
          code={`const fruits = ['사과', '바나나', '포도'];

<ul>
  {fruits.map((fruit) => (
    <li key={fruit}>{fruit}</li>
  ))}
</ul>`}
        />
      </Section>

      <Section title="직접 해보기">
        <p>배열에 항목을 추가하거나 바꿔 보세요. 목록이 그대로 따라 바뀝니다.</p>
        <Playground
          noInline
          initialCode={`function FruitList() {
  const fruits = ['사과', '바나나', '포도'];
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

render(<FruitList />);`}
        />
      </Section>

      <Callout type="tip">
        <strong>key</strong>는 React가 어떤 항목이 추가·삭제·변경됐는지 빠르게 알아내기 위한 식별표입니다.
        배열 인덱스보다, 항목마다 고유한 값(id 등)을 쓰는 것이 좋습니다.
      </Callout>
    </>
  );
}
