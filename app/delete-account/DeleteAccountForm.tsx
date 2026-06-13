'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.pres.network';

type Step = 'form' | 'confirm' | 'success' | 'error';

export default function DeleteAccountForm() {
  const [step, setStep] = useState<Step>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') {
      setStep('confirm');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Giriş yap → JWT al
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceId: 'web-delete-account' }),
      });

      const loginData = await loginRes.json() as { accessToken?: string; error?: string };

      if (!loginRes.ok || !loginData.accessToken) {
        setErrorMsg(loginData.error ?? 'E-posta veya şifre hatalı.');
        setStep('form');
        setLoading(false);
        return;
      }

      // 2. Hesabı sil
      const deleteRes = await fetch(`${API_URL}/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${loginData.accessToken}` },
      });

      if (!deleteRes.ok) {
        const d = await deleteRes.json() as { error?: string };
        setErrorMsg(d.error ?? 'Hesap silinemedi, lütfen tekrar deneyin.');
        setStep('error');
        setLoading(false);
        return;
      }

      setStep('success');
    } catch {
      setErrorMsg('Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Hesabınız Silindi
        </h2>
        <p style={{ color: '#999', lineHeight: 1.6 }}>
          Tüm kişisel verileriniz, maç geçmişiniz ve puanlarınız kalıcı olarak sistemden kaldırıldı.
          Pres'i kullandığınız için teşekkür ederiz.
        </p>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✕</div>
        <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Bir Hata Oluştu
        </h2>
        <p style={{ color: '#999', lineHeight: 1.6, marginBottom: 24 }}>{errorMsg}</p>
        <button
          onClick={() => { setStep('form'); setErrorMsg(''); }}
          style={btnOutlineStyle}
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      {step === 'confirm' ? (
        <>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            Emin misiniz?
          </h2>
          <div style={warningBoxStyle}>
            <p style={{ margin: 0, color: '#f0a500', fontSize: 14, lineHeight: 1.6 }}>
              Bu işlem <strong>geri alınamaz</strong>. Silinecekler:
            </p>
            <ul style={{ marginTop: 8, color: '#ccc', fontSize: 13, lineHeight: 2, paddingLeft: 20 }}>
              <li>Profil bilgileri ve istatistikler</li>
              <li>Tüm maç geçmişi ve puanlar</li>
              <li>Arkadaşlık bağlantıları</li>
              <li>Bildirimler ve oturumlar</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={() => setStep('form')}
              style={btnOutlineStyle}
              disabled={loading}
            >
              Vazgeç
            </button>
            <button type="submit" style={btnDangerStyle} disabled={loading}>
              {loading ? 'Siliniyor…' : 'Evet, Hesabımı Sil'}
            </button>
          </div>
        </>
      ) : (
        <>
          {errorMsg && (
            <div style={{ background: '#3a1a1a', border: '1px solid #cc3333', borderRadius: 8, padding: '10px 14px', marginBottom: 20, color: '#ff6b6b', fontSize: 14 }}>
              {errorMsg}
            </div>
          )}

          <div style={fieldStyle}>
            <label style={labelStyle}>E-posta</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Şifre</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button type="submit" style={btnDangerStyle} disabled={loading}>
            Devam Et
          </button>
        </>
      )}
    </form>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#141414',
  border: '1px solid #252525',
  borderRadius: 16,
  padding: '40px 36px',
  maxWidth: 460,
  width: '100%',
  textAlign: 'center' as const,
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 16,
  textAlign: 'left',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#888',
  marginBottom: 6,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0a0a0a',
  border: '1px solid #303030',
  borderRadius: 10,
  padding: '12px 14px',
  color: '#e0e0e0',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
};

const btnDangerStyle: React.CSSProperties = {
  width: '100%',
  background: '#cc2222',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '14px',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  marginTop: 8,
};

const btnOutlineStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  color: '#888',
  border: '1px solid #303030',
  borderRadius: 10,
  padding: '14px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
};

const warningBoxStyle: React.CSSProperties = {
  background: '#1a1500',
  border: '1px solid #4a3500',
  borderRadius: 10,
  padding: '14px 16px',
  marginBottom: 20,
  textAlign: 'left',
};
