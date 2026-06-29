import { versions } from './versions';

test('버전 항목은 비어 있지 않고 필수 필드를 가진다', () => {
  expect(versions.length).toBeGreaterThan(0);
  for (const v of versions) {
    expect(v.version.trim().length).toBeGreaterThan(0);
    expect(v.year.trim().length).toBeGreaterThan(0);
    expect(v.summary.trim().length).toBeGreaterThan(0);
    expect(v.features.length).toBeGreaterThan(0);
    expect(v.pros.length).toBeGreaterThan(0);
    expect(v.cons.length).toBeGreaterThan(0);
  }
});

test('버전 이름은 중복이 없다', () => {
  const names = versions.map((v) => v.version);
  expect(new Set(names).size).toBe(names.length);
});
