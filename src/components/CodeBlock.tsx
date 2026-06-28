import { Highlight, themes } from 'prism-react-renderer';

export default function CodeBlock({
  code,
  caption,
  language = 'tsx',
}: {
  code: string;
  caption?: string;
  language?: string;
}) {
  return (
    <figure style={{ margin: '1rem 0' }}>
      <Highlight code={code} language={language} theme={themes.vsDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1rem',
              margin: 0,
              overflowX: 'auto',
              fontSize: '0.9rem',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })}>
                    {token.content}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {caption && (
        <figcaption style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
