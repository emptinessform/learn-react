import Card from '../components/Card';
import Callout from '../components/Callout';
import Pill from '../components/Pill';
import TableWrap from '../components/TableWrap';
import { versions } from '../content/versions';

function tagFor(version: string): { tone: 'accent' | 'ok' | 'warn'; label: string } | null {
  if (version.includes('Hooks')) return { tone: 'warn', label: '분기점' };
  if (version === 'React 19') return { tone: 'ok', label: '최신' };
  if (version.includes('Fiber')) return { tone: 'accent', label: '대규모 개편' };
  return null;
}

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
        React가 어떻게 발전해 왔는지 주요 버전별 특징과 장단점을 정리했습니다. (교육용 요약이며,
        정확한 변경 사항은 각 버전의 공식 릴리스 노트를 확인하세요.)
      </p>

      <Callout type="key">
        큰 흐름은 <strong>클래스 → Hooks(함수형) → 동시성(Concurrent) → Actions</strong>로 이어집니다.
        함수형·선언형으로 갈수록 "어떻게"보다 "무엇을"에 집중하게 됩니다.
      </Callout>

      <h2>한눈에 보기</h2>
      <TableWrap>
        <thead>
          <tr>
            <th>버전</th>
            <th>연도</th>
            <th>핵심</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((v) => {
            const tag = tagFor(v.version);
            return (
              <tr key={v.version}>
                <td>
                  <strong>{v.version}</strong>
                  {tag && (
                    <>
                      {' '}
                      <Pill tone={tag.tone}>{tag.label}</Pill>
                    </>
                  )}
                </td>
                <td style={{ whiteSpace: 'nowrap', color: 'var(--text-dim)' }}>{v.year}</td>
                <td>{v.summary}</td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>

      <h2>버전별 상세</h2>
      {versions.map((v) => {
        const tag = tagFor(v.version);
        return (
          <Card key={v.version} style={{ margin: '1.2rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{v.version}</h3>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{v.year}</span>
              {tag && <Pill tone={tag.tone}>{tag.label}</Pill>}
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
        );
      })}
    </article>
  );
}
