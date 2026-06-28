import { useLessonNote } from '../hooks/useNotes';

export default function LessonNotes({ id }: { id: string }) {
  const [note, setNote] = useLessonNote(id);

  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>📝 학습 메모</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="이 강의에서 배운 것, 헷갈린 점, 다시 볼 것을 적어두세요. (자동 저장)"
        rows={4}
        aria-label="학습 메모"
        style={{
          width: '100%',
          background: 'var(--surface-2)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.6rem',
          fontFamily: 'inherit',
          fontSize: '0.95rem',
          resize: 'vertical',
        }}
      />
      <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', margin: '0.3rem 0 0' }}>
        {note.trim() ? '✓ 저장됨' : '메모'} · 이 브라우저에만 보관됩니다
      </p>
    </section>
  );
}
