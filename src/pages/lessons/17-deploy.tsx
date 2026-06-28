import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import TermLink from '../../components/TermLink';
import ReactWorkflowDiagram from '../../components/diagrams/ReactWorkflowDiagram';

export default function Deploy17() {
  return (
    <>
      <Section title="빌드와 배포">
        <p>
          개발이 끝나면 <TermLink termId="build">빌드</TermLink>를 합니다. Vite가 소스를 최적화해 정적
          파일(HTML·CSS·JS)로 묶어 <code>dist/</code> 폴더에 만들어 줍니다. 이 폴더를 어디든 올리면
          <TermLink termId="deployment">배포</TermLink>가 됩니다.
        </p>
        <CodeBlock
          code={`npm run build     # dist/ 에 정적 파일 생성
npm run preview   # 빌드 결과를 로컬에서 미리보기`}
          caption="dist/ 안의 결과물은 서버가 필요 없는 정적 파일이다."
        />
        <ReactWorkflowDiagram />
      </Section>

      <Section title="어디에 올리나">
        <p>
          정적 파일이므로 정적 호스팅이면 충분합니다. Vercel, Netlify, GitHub Pages, Cloudflare Pages
          등이 흔히 쓰입니다. 대부분 저장소를 연결하면 푸시할 때마다 자동으로 빌드·배포해 줍니다.
        </p>
        <CodeBlock
          code={`# 예시 흐름 (호스팅 서비스 연결 시)
git push        # → 서비스가 자동으로 npm run build 후 배포`}
        />
      </Section>

      <Callout type="warn">
        이 사이트처럼 React Router를 쓰는 SPA를 배포할 때는, 모든 경로를 <code>index.html</code>로
        돌려보내는 설정(history fallback)이 필요합니다. 그렇지 않으면 <code>/lesson/02-jsx</code> 같은
        주소로 새로고침할 때 404가 납니다. 대부분의 호스팅은 간단한 설정으로 지원합니다.
      </Callout>

      <Callout type="tip">
        축하합니다 — 여기까지가 기초부터 실전까지의 한 바퀴입니다. 이제 직접 작은 앱을 만들어 배포해
        보면서, 막히는 부분을 Q&A와 용어 사전에 채워 나가면 학습이 더 단단해집니다.
      </Callout>
    </>
  );
}
