export type QnAItem = {
  id: string;
  question: string;
  answer: string;
  date: string;
  relatedLessonId?: string;
  tags?: string[];
};

export const qa: QnAItem[] = [
  {
    id: 'why-react',
    question: '왜 그냥 HTML/JS 대신 React를 쓰나요?',
    answer:
      'UI가 복잡해지면 DOM을 직접 조작하는 코드가 빠르게 얽힙니다. React는 "상태가 이러면 화면은 이렇다"를 선언적으로 작성하게 해 주고, 바뀐 부분만 효율적으로 갱신합니다. 배경과 원리 페이지에서 더 자세히 다룹니다.',
    date: '2026-06-27',
    relatedLessonId: '01-intro',
    tags: ['개념'],
  },
];
