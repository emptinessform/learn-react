import { serializeBackup, applyBackup } from '../lib/backup';

export default function DataBackup() {
  const handleExport = () => {
    const blob = new Blob([serializeBackup()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learn-react-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        applyBackup(String(reader.result));
        alert('가져왔습니다. 화면을 새로고침합니다.');
        window.location.reload();
      } catch {
        alert('파일 형식이 올바르지 않습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // 같은 파일을 다시 선택할 수 있게 초기화
  };

  return (
    <section style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
      <h3 style={{ fontSize: '1rem' }}>진도·메모 백업</h3>
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" onClick={handleExport} className="btn">
          내보내기 (JSON)
        </button>
        <label className="btn">
          가져오기
          <input
            type="file"
            accept="application/json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', margin: '0.4rem 0 0' }}>
        진도와 메모는 이 브라우저에만 저장됩니다. 다른 기기로 옮기거나 백업하려면 내보낸 파일을 보관하세요.
      </p>
    </section>
  );
}
