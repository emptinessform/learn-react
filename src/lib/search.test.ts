import { searchAll } from './search';

test('빈 질의는 빈 배열', () => {
  expect(searchAll('')).toEqual([]);
  expect(searchAll('   ')).toEqual([]);
});

test('강의 제목을 검색한다', () => {
  const results = searchAll('JSX');
  const lesson = results.find((r) => r.type === '강의' && r.title.includes('JSX'));
  expect(lesson?.to).toBe('/lesson/02-jsx');
});

test('용어(이름·정의)를 검색한다', () => {
  const results = searchAll('Virtual DOM');
  const term = results.find((r) => r.type === '용어');
  expect(term?.to).toBe('/glossary#virtual-dom');
});

test('대소문자를 가리지 않는다', () => {
  expect(searchAll('jsx').length).toBe(searchAll('JSX').length);
  expect(searchAll('jsx').length).toBeGreaterThan(0);
});

test('Q&A의 질문/답 본문도 검색한다', () => {
  const results = searchAll('React를 쓰나요');
  expect(results.some((r) => r.type === 'Q&A')).toBe(true);
});

test('결과는 to 경로를 가진다', () => {
  for (const r of searchAll('state')) {
    expect(r.to.startsWith('/')).toBe(true);
  }
});

test('제목·섹션에 없는 키워드로도 강의를 찾는다', () => {
  // 'redux'는 어떤 강의 제목/섹션에도 없고 15강 keywords에만 있다
  const redux = searchAll('redux').find((r) => r.type === '강의');
  expect(redux?.to).toBe('/lesson/15-state-management');

  // 'focus'는 09-useref keywords에만 있다
  const focus = searchAll('focus').find((r) => r.type === '강의');
  expect(focus?.to).toBe('/lesson/09-useref');
});
