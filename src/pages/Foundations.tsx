import Section from '../components/Section';
import WebTrioDiagram from '../components/diagrams/WebTrioDiagram';

export default function Foundations() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>배경과 원리</h1>
      <p>
        React를 제대로 이해하려면 그 토대인 웹 기술 — HTML, CSS, JavaScript —가 각각 무엇을 위해
        존재하는지부터 알아야 합니다. 이 페이지는 그 배경과 동작 원리를 도식과 함께 한곳에 정리합니다.
      </p>

      <Section title="웹 페이지의 3요소">
        <p>
          하나의 웹 페이지는 역할이 다른 세 기술의 협업으로 만들어집니다. HTML은 구조, CSS는 표현,
          JavaScript는 동작을 담당합니다.
        </p>
        <WebTrioDiagram />
      </Section>

      <Section title="React는 왜 등장했나 (다음 도식 예정)">
        <p>
          UI가 복잡해질수록 JavaScript로 DOM을 직접 바꾸는 코드가 얽힙니다. React는 "상태 → 화면"을
          선언적으로 작성하게 해 이 문제를 푼다는 점을, 이후 브라우저 렌더링 흐름·Virtual DOM 도식과
          함께 채워 나갑니다.
        </p>
      </Section>
    </article>
  );
}
