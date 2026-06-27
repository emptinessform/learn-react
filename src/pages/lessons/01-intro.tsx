import Section from '../../components/Section';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';

export default function Intro01() {
  return (
    <>
      <Section title="React란 무엇인가">
        <p>
          React는 사용자 인터페이스(UI)를 만들기 위한 자바스크립트 라이브러리입니다. 화면을{' '}
          <TermLink termId="component">컴포넌트</TermLink>라는 작은 조각으로 나누고, 각 조각이
          "지금 상태에서는 이렇게 보인다"를 선언적으로 표현합니다.
        </p>
      </Section>
      <Section title="왜 React인가">
        <p>
          순수 JS로 DOM을 직접 조작하면 화면이 복잡해질수록 코드가 빠르게 얽힙니다. React는 상태가
          바뀌면 바뀐 부분만 알아서 다시 그려 주므로, 우리는 "무엇을 보여줄지"에 집중할 수 있습니다.
        </p>
        <Callout type="tip">
          더 깊은 배경과 원리(브라우저 렌더링, Virtual DOM 등)는 상단의 "배경과 원리" 페이지에서
          도식과 함께 다룹니다.
        </Callout>
      </Section>
    </>
  );
}
