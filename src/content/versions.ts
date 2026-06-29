export type ReactVersion = {
  version: string;
  year: string;
  summary: string;
  features: string[];
  pros: string[];
  cons: string[];
};

// React 주요 버전의 역사와 버전별 특징·장단점. History 페이지가 렌더한다.
// (교육용 요약입니다. 정확한 변경 사항은 각 버전의 공식 릴리스 노트를 참고하세요.)
export const versions: ReactVersion[] = [
  {
    version: 'React 0.x',
    year: '2013',
    summary: 'Facebook이 공개한 초기 버전. JSX와 Virtual DOM이라는 핵심 아이디어가 이때 등장했다.',
    features: ['JSX 문법', 'Virtual DOM 기반 렌더링', '컴포넌트(초기엔 createClass, ES6 class는 0.13부터)', '단방향 데이터 흐름'],
    pros: ['선언형 UI라는 새로운 패러다임 제시', 'DOM 직접 조작의 복잡함 해소'],
    cons: ['생태계·도구가 미성숙', '잦은 API 변화'],
  },
  {
    version: 'React 0.14',
    year: '2015',
    summary: '패키지를 react와 react-dom으로 분리하고, 함수형(무상태) 컴포넌트를 도입했다.',
    features: ['react / react-dom 패키지 분리', '함수형(무상태) 컴포넌트', '웹과 네이티브의 공통 코어'],
    pros: ['렌더 타깃(웹/네이티브) 분리로 구조가 명확해짐', '간단한 컴포넌트를 함수로 작성 가능'],
    cons: ['함수형 컴포넌트는 아직 상태를 가질 수 없었음(클래스 필요)'],
  },
  {
    version: 'React 16 (Fiber)',
    year: '2017',
    summary: '내부 렌더링 엔진을 "Fiber"로 새로 작성한 대규모 업데이트.',
    features: ['에러 경계(Error Boundary)', 'Fragment·Portal', '컴포넌트에서 배열·문자열 반환', '개선된 서버 렌더링', '더 작아진 번들'],
    pros: ['더 유연한 렌더링과 안정적인 에러 처리', '향후 동시성 기능의 토대 마련'],
    cons: ['일부 구 생명주기 메서드가 단계적으로 폐기되어 마이그레이션 필요'],
  },
  {
    version: 'React 16.3',
    year: '2018',
    summary: '공식 Context API와 createRef 등 자주 쓰는 도구가 정식으로 추가됐다.',
    features: ['새로운 Context API (createContext)', 'createRef', 'getDerivedStateFromProps'],
    pros: ['prop drilling을 표준 방식으로 해결', '레퍼런스·파생 상태 처리가 명확해짐'],
    cons: ['기존 레거시 Context에서 옮겨야 하는 부담'],
  },
  {
    version: 'React 16.8 (Hooks)',
    year: '2019',
    summary: '함수형 컴포넌트에서 상태와 생명주기를 쓸 수 있게 한 Hooks 도입. React 사용 방식을 바꾼 분기점.',
    features: ['useState · useEffect 등 기본 훅', '커스텀 훅으로 로직 재사용', '클래스 없이 대부분의 기능 구현'],
    pros: ['상태 로직을 컴포넌트 밖으로 추출·재사용', '클래스 보일러플레이트(this·bind) 감소', '관련 로직을 한곳에 모아 가독성↑'],
    cons: ['의존성 배열·클로저 등 새 개념의 학습 곡선', '훅 규칙(최상위에서만 호출) 준수 필요'],
  },
  {
    version: 'React 17',
    year: '2020',
    summary: '"개발자용 새 기능 없음"을 표방한, 안전한 점진적 업그레이드를 위한 징검다리 버전.',
    features: ['새로운 JSX 변환(파일마다 React import 불필요)', '이벤트 위임을 document에서 루트로 변경', '점진적(부분) 업그레이드 지원'],
    pros: ['한 페이지에서 여러 React 버전 공존 가능 → 큰 앱도 단계적 업그레이드', 'JSX마다 import React 생략'],
    cons: ['개발자가 체감하는 새 기능이 거의 없음'],
  },
  {
    version: 'React 18',
    year: '2022',
    summary: '동시성(Concurrent) 렌더링을 도입한 버전. 반응성과 성능을 끌어올렸다.',
    features: ['createRoot', '자동 배칭(이벤트 밖에서도)', 'useTransition · useDeferredValue', 'useId · useSyncExternalStore', 'Suspense 개선 · 스트리밍 SSR'],
    pros: ['무거운 업데이트 중에도 입력 등 반응성 유지', '비동기 화면 전환이 부드러워짐'],
    cons: ['동시성 모델·StrictMode 이중 실행 등 이해할 개념 증가', '일부 라이브러리의 호환 작업 필요'],
  },
  {
    version: 'React 19',
    year: '2024',
    summary: '폼·비동기 처리를 간소화하는 Actions와 여러 편의 기능을 추가한 최신 메이저.',
    features: ['Actions · useActionState · useOptimistic', 'use() API(프로미스·컨텍스트 읽기)', 'ref를 일반 prop으로(forwardRef 불필요)', '<title>·<meta> 문서 메타데이터 지원', '서버 컴포넌트·React Compiler(점진 도입)'],
    pros: ['폼 제출·로딩·에러 상태 처리가 크게 단순해짐', 'ref·메타데이터 등 자주 쓰는 패턴의 편의성↑'],
    cons: ['최신이라 생태계가 적응 중', '서버 컴포넌트는 Next.js 같은 프레임워크에 의존'],
  },
];
