import Section from '../components/Section';
import TermLink from '../components/TermLink';
import WebTrioDiagram from '../components/diagrams/WebTrioDiagram';
import BrowserRenderDiagram from '../components/diagrams/BrowserRenderDiagram';
import ImperativeVsDeclarativeDiagram from '../components/diagrams/ImperativeVsDeclarativeDiagram';
import VirtualDomDiagram from '../components/diagrams/VirtualDomDiagram';
import ComponentTreeDiagram from '../components/diagrams/ComponentTreeDiagram';
import ReactWorkflowDiagram from '../components/diagrams/ReactWorkflowDiagram';

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

      <Section title="브라우저는 화면을 어떻게 그리나">
        <p>
          브라우저는 HTML을 파싱해 <TermLink termId="dom">DOM</TermLink> 트리를, CSS를 파싱해 CSSOM을
          만들고, 둘을 합쳐 렌더 트리를 구성합니다. 그다음 각 요소의 위치·크기를 계산(레이아웃)하고
          픽셀로 그립니다(페인트). 화면이 바뀔 때마다 이 과정의 일부가 다시 일어납니다.
        </p>
        <BrowserRenderDiagram />
      </Section>

      <Section title="직접 DOM 조작의 한계: 명령형 vs 선언형">
        <p>
          순수 JavaScript로 화면을 바꾸려면 요소를 찾아 값을 바꾸고 이벤트를 다시 연결하는 일을 단계마다
          직접 지시해야 합니다. 이런 <TermLink termId="imperative">명령형</TermLink> 방식은 UI가
          복잡해질수록 빠르게 얽힙니다. React는 "원하는 결과(상태)"만 선언하면 화면을 맞춰 주는{' '}
          <TermLink termId="declarative">선언형</TermLink> 방식을 택합니다.
        </p>
        <ImperativeVsDeclarativeDiagram />
      </Section>

      <Section title="React의 해법: Virtual DOM">
        <p>
          상태가 바뀌면 React는 새 <TermLink termId="virtual-dom">Virtual DOM</TermLink> 트리를 만들고
          이전 트리와 비교(diff)해, 실제로 달라진 노드만 골라 DOM에 반영합니다. 덕분에 우리는 "무엇을
          보여줄지"만 선언하고, 효율적인 갱신은 React에 맡길 수 있습니다.
        </p>
        <VirtualDomDiagram />
      </Section>

      <Section title="컴포넌트 트리와 단방향 데이터 흐름">
        <p>
          React 앱은 <TermLink termId="component">컴포넌트</TermLink>들이 이루는 트리입니다. 데이터는{' '}
          <TermLink termId="props">props</TermLink>를 통해 부모에서 자식으로 한 방향으로만 흐릅니다. 이
          단방향 흐름 덕분에 데이터가 어디서 와서 어디로 가는지 추적하기 쉬워집니다.
        </p>
        <ComponentTreeDiagram />
      </Section>

      <Section title="React 개발 과정">
        <p>
          실제 작업은 프로젝트를 만들고, 컴포넌트를 작성하고, props·state로 동작을 연결한 뒤, 개발
          서버의 <TermLink termId="hmr">HMR</TermLink>로 결과를 즉시 확인하며 다듬는 흐름입니다. 완성되면
          빌드해서 배포합니다. 이 사이트도 정확히 이 과정으로 만들어졌습니다.
        </p>
        <ReactWorkflowDiagram />
      </Section>
    </article>
  );
}
