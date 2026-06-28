import { lessons } from '../curriculum';
import { glossary } from '../content/glossary';
import { qa } from '../content/qa';

export type SearchResult = {
  type: '강의' | '용어' | 'Q&A';
  title: string;
  snippet: string;
  to: string;
};

/**
 * 강의 제목·섹션, 용어(이름+정의), Q&A(질문+답)를 대상으로 검색한다.
 * 빈 질의는 빈 배열을 돌려준다. 대소문자를 가리지 않는다.
 */
export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const l of lessons) {
    const haystack = [l.title, l.section, ...l.keywords].join(' ').toLowerCase();
    if (haystack.includes(q)) {
      const snippet = `${l.section} · ${l.keywords.join(', ')}`;
      results.push({ type: '강의', title: l.title, snippet, to: `/lesson/${l.id}` });
    }
  }

  for (const t of glossary) {
    if (t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)) {
      results.push({ type: '용어', title: t.term, snippet: t.definition, to: `/glossary#${t.id}` });
    }
  }

  for (const item of qa) {
    if (item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)) {
      results.push({ type: 'Q&A', title: item.question, snippet: item.answer, to: `/qa#${item.id}` });
    }
  }

  return results;
}
