import { useState, useEffect, useRef } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

const DEFAULT_SCOPE = { useState, useEffect, useRef };

export default function Playground({
  initialCode,
  scope,
  noInline = false,
}: {
  initialCode: string;
  scope?: Record<string, unknown>;
  noInline?: boolean;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        margin: '1rem 0',
      }}
    >
      <LiveProvider code={initialCode.trim()} scope={{ ...DEFAULT_SCOPE, ...scope }} noInline={noInline}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }}>
          <div style={{ background: 'var(--surface-2)' }}>
            <div style={{ padding: '0.3rem 0.6rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              코드 (편집 가능)
            </div>
            <LiveEditor style={{ fontFamily: 'monospace', fontSize: '0.9rem' }} />
          </div>
          <div style={{ background: 'var(--surface)' }}>
            <div style={{ padding: '0.3rem 0.6rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              미리보기
            </div>
            <div style={{ padding: '1rem' }}>
              <LivePreview />
              <LiveError style={{ color: '#ff6b6b', whiteSpace: 'pre-wrap', fontSize: '0.85rem' }} />
            </div>
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}
