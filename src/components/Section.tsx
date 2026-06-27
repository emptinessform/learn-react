export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ margin: '2rem 0' }}>
      <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.3rem' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
