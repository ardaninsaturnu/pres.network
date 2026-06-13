import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import DeleteAccountForm from './DeleteAccountForm';

export const metadata: Metadata = {
  title: 'Hesabı Sil — Pres',
  description: 'Pres hesabınızı ve tüm verilerinizi kalıcı olarak silin.',
};

export default function DeleteAccountPage() {
  return (
    <>
      <Navbar />

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '120px 24px 80px',
      }}>
        {/* Başlık */}
        <div style={{ maxWidth: 460, width: '100%', marginBottom: 32, textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#cc2222',
            marginBottom: 16,
          }}>
            Hesap Yönetimi
          </span>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 12px',
          }}>
            Hesabı Kalıcı Olarak Sil
          </h1>
          <p style={{ color: '#777', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            Hesabınızı silmek için e-posta adresiniz ve şifrenizle doğrulama yapın.
            Bu işlem geri alınamaz.
          </p>
        </div>

        {/* Form */}
        <DeleteAccountForm />

        {/* Bilgi notu */}
        <p style={{
          marginTop: 32,
          maxWidth: 460,
          textAlign: 'center',
          color: '#555',
          fontSize: 13,
          lineHeight: 1.7,
        }}>
          Hesabınızı uygulamadan da silebilirsiniz:{' '}
          <strong style={{ color: '#777' }}>Profil → Ayarlar → Hesabı Sil</strong>
          <br />
          Yardım için:{' '}
          <a href="mailto:destek@pres.network" style={{ color: '#00C853', textDecoration: 'none' }}>
            destek@pres.network
          </a>
        </p>
      </main>
    </>
  );
}
