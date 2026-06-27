import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Destek — Pres",
  description: "Pres uygulaması için yardım, sık sorulan sorular ve iletişim bilgileri.",
};

const faqs = [
  {
    q: "Pres nedir?",
    a: "Pres, amatör futbolcuların bir araya gelmesini, maç sonrası birbirini puanlamasını ve oyuncu profili oluşturmasını sağlayan bir sosyal platformdur.",
  },
  {
    q: "Hesabımı nasıl silebilirim?",
    a: "Uygulama içinden Profil → Ayarlar → Hesabı Sil yolunu izleyebilir veya web üzerinden hesap silme sayfamızı kullanabilirsiniz.",
  },
  {
    q: "Konum izni neden isteniyor?",
    a: "Yakınındaki oyuncuları ve maçları gösterebilmek için konum bilgisine ihtiyaç duyuyoruz. Konum yalnızca uygulama aktifken kullanılır; istediğiniz zaman cihaz ayarlarından kapatabilirsiniz.",
  },
  {
    q: "Bildirimleri nasıl kapatabilirim?",
    a: "Cihazınızın ayarlarından Pres uygulaması için bildirimleri devre dışı bırakabilirsiniz. Uygulama içi bildirim tercihlerini de Ayarlar bölümünden yönetebilirsiniz.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Kişisel verileriniz güvenli sunucularda saklanır ve üçüncü taraflarla satılmaz. Detaylar için Gizlilik Politikamıza göz atabilirsiniz.",
  },
  {
    q: "Teknik bir sorun yaşıyorum, ne yapmalıyım?",
    a: "Sorununuzu destek@pres.network adresine e-posta ile iletin. Mümkünse cihaz modelinizi, işletim sistemi sürümünüzü ve sorunun ekran görüntüsünü ekleyin.",
  },
];

const links = [
  { href: "/privacy-policy", label: "Gizlilik Politikası" },
  { href: "/delete-account", label: "Hesabı Sil" },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ paddingTop: 120, paddingBottom: 48, borderBottom: "1px solid var(--border)" }}>
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: "2px",
            textTransform: "uppercase", color: "var(--green)", marginBottom: 20,
          }}>
            Yardım Merkezi
          </span>
          <h1 className="font-bebas" style={{
            fontSize: "clamp(48px, 8vw, 80px)", letterSpacing: 3, color: "#fff",
            lineHeight: 1, marginBottom: 20,
          }}>
            Destek
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>
            Pres ile ilgili sorularınız, teknik sorunlarınız veya geri bildirimleriniz için
            bize ulaşabilirsiniz. Genellikle 1–2 iş günü içinde yanıt veriyoruz.
          </p>
        </div>

        <div style={{ padding: "56px 0 48px" }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderLeft: "3px solid var(--green)", borderRadius: 8, padding: "28px 32px",
            marginBottom: 56,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 12 }}>
              Bize Ulaşın
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              E-posta yoluyla destek alabilirsiniz. Mesajınızda sorununuzu kısaca
              açıklayın; size en kısa sürede dönüş yapacağız.
            </p>
            <a
              href="mailto:destek@pres.network"
              style={{
                display: "inline-block", color: "var(--green)", fontSize: 18,
                fontWeight: 600, textDecoration: "none",
              }}
            >
              destek@pres.network
            </a>
          </div>

          <div style={{ marginBottom: 56 }}>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24,
              paddingBottom: 16, borderBottom: "1px solid var(--border)",
            }}>
              <span className="font-bebas" style={{
                fontSize: 13, letterSpacing: 1, color: "var(--green)",
                paddingTop: 3, minWidth: 24,
              }}>
                01
              </span>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
                Sık Sorulan Sorular
              </span>
            </div>
            <div style={{ paddingLeft: 40, display: "flex", flexDirection: "column", gap: 24 }}>
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 8 }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: "#e0e0e0", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 56 }}>
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24,
              paddingBottom: 16, borderBottom: "1px solid var(--border)",
            }}>
              <span className="font-bebas" style={{
                fontSize: 13, letterSpacing: 1, color: "var(--green)",
                paddingTop: 3, minWidth: 24,
              }}>
                02
              </span>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
                İlgili Sayfalar
              </span>
            </div>
            <div style={{ paddingLeft: 40, display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "var(--green)", textDecoration: "none", fontSize: 15,
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  {link.label}
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={{
        borderTop: "1px solid var(--border)", padding: "28px 40px",
        maxWidth: 760, margin: "0 auto",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>© 2026 Pres. Tüm hakları saklıdır.</span>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>Destek</span>
      </footer>
    </>
  );
}
