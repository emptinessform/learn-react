import { Link } from 'react-router-dom';

export default function TermLink({
  termId,
  children,
}: {
  termId: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={`/glossary#${termId}`} style={{ borderBottom: '1px dotted var(--accent)' }}>
      {children}
    </Link>
  );
}
