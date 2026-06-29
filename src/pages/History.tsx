import Card from '../components/Card';
import { versions } from '../content/versions';

function PointList({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div style={{ flex: '1 1 220px' }}>
      <div style={{ color, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
        {items.map((it) => (
          <li key={it} style={{ fontSize: '0.9rem' }}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function History() {
  return (
    <article style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>React 버전 역사</h1>
      <p>
        React가 어떻게 발전해 왔는지 주요 버전별 특징과 장단점을 정리했습니다. 큰 흐름은 "클래스 →
        Hooks(함수형) → 동시성 → Actions"로 이어집니다. (교육용 요약이며, 정확한 변경 사항은 각
        버전의 공식 릴리스 노트를 확인하세요.)
      </p>

      {versions.map((v) => (
        <Card key={v.version} style={{ margin: '1.2rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{v.version}</h2>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{v.year}</span>
          </div>
          <p style={{ margin: '0.4rem 0 0.8rem' }}>{v.summary}</p>

          <div style={{ marginBottom: '0.8rem' }}>
            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>
              특징
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              {v.features.map((f) => (
                <li key={f} style={{ fontSize: '0.9rem' }}>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <PointList title="장점" items={v.pros} color="var(--ok)" />
            <PointList title="단점" items={v.cons} color="var(--warn)" />
          </div>
        </Card>
      ))}
    </article>
  );
}
