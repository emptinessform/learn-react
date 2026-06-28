import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Playground from '../../components/Playground';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Fetch14() {
  return (
    <>
      <Section title="API에서 데이터 가져오기">
        <p>
          서버에서 데이터를 받아오는 것은 렌더링 바깥의 일, 즉{' '}
          <TermLink termId="side-effect">사이드 이펙트</TermLink>입니다. 보통{' '}
          <code>useEffect</code> 안에서 <code>fetch</code>로 요청하고, 결과를{' '}
          <TermLink termId="state">state</TermLink>에 담습니다. 이때 <strong>로딩</strong>·
          <strong>성공</strong>·<strong>에러</strong> 세 가지 상태를 함께 다루는 것이 핵심입니다.
        </p>
        <CodeBlock
          code={`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/user')
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}, []);`}
          caption="요청은 useEffect에서, 결과·로딩·에러는 각각 state로 관리한다."
        />
      </Section>

      <Section title="직접 해보기">
        <p>
          아래는 1초 뒤 데이터가 도착하는 상황을 흉내 낸 예제입니다(실제 네트워크 대신 타이머 사용).
          로딩 → 완료로 화면이 바뀝니다.
        </p>
        <Playground
          noInline
          initialCode={`function UserCard() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      setName('홍길동'); // 서버 응답이 왔다고 가정
      setLoading(false);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  if (loading) return <p>불러오는 중…</p>;
  return <p>👤 사용자: {name}</p>;
}

render(<UserCard />);`}
        />
      </Section>

      <Callout type="tip">
        로딩·에러 상태를 빠뜨리면 "데이터가 없는 순간"에 화면이 깨지기 쉽습니다. 데이터를 다루는
        컴포넌트는 거의 항상 "아직 안 옴 / 왔음 / 실패함" 세 경우를 모두 그려 주세요.
      </Callout>
    </>
  );
}
