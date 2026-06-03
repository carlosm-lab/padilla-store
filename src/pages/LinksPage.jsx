import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  SITE_NAME, 
  WHATSAPP_NUMBER,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_TIKTOK,
  BASE_URL
} from '../config/constants';

const LinksPage = () => {
  const [copied, setCopied] = useState(false);

  // Clean the phone number for WhatsApp
  const cleanPhone = WHATSAPP_NUMBER ? WHATSAPP_NUMBER.replace(/\D/g, '') : '50374866909';

  const copyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const openWhatsAppHandler = (phone, e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phone}`;
    } else {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`, '_blank');
    }
  };

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} | Links</title>
        <style>{`
          .links-page-container {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: linear-gradient(180deg, #faf5ff, #f3e8ff);
            min-height: max(884px, 100dvh);
            color: #32323b;
          }
        `}</style>
      </Helmet>

      <div className="links-page-container flex flex-col items-center w-full">
        {/* TopAppBar */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 max-w-lg mx-auto w-full bg-[#faf5ff]/60 backdrop-blur-2xl rounded-full mt-4 shadow-[0_8px_32px_rgba(50,50,59,0.06)] border-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-md">
              <i className="fa-solid fa-store text-[#fbf8ff] text-sm"></i>
            </div>
            <span className="text-lg font-bold text-[#32323b] tracking-[-0.02em]">{SITE_NAME}</span>
          </div>
          <button
            onClick={copyLink}
            className="text-[#7c3aed] hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}>share</span>
          </button>
        </header>

        <main className="w-full max-w-lg px-6 pt-12 pb-24 flex flex-col items-center relative">
          {/* Profile Section */}
          <div className="relative mb-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#7c3aed] to-[#a78bfa] shadow-xl mb-6">
              <div
                className="w-full h-full rounded-full overflow-hidden border-4 flex items-center justify-center"
                style={{ backgroundColor: 'white', borderColor: 'white' }}
              >
                <img
                  alt="Profile Headshot"
                  className="w-full h-full object-contain p-4"
                  width="150"
                  height="150"
                  src="/logo.svg"
                />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] mb-2 text-[#32323b]">{SITE_NAME}</h1>
            <p className="text-[#5f5e68] leading-relaxed max-w-xs font-medium">
              Accesorios tecnológicos, bisutería fina de acero y plata en San Miguel. Entrega a domicilio en 24h.
            </p>
          </div>

          {/* Social Links Cluster */}
          <div className="w-full space-y-4">
            {/* WhatsApp */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="#"
              onClick={(e) => openWhatsAppHandler(cleanPhone, e)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-whatsapp text-2xl text-[#25d366]"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">WhatsApp</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Info &amp; Ventas</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Tienda */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href={BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-solid fa-globe text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Página web</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Catálogo y Compras</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Facebook */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href={SOCIAL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-facebook text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Página de Facebook</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Comunidad e interacción</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Facebook Admin */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://web.facebook.com/padillastoresv.admin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-facebook text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Perfil de Facebook</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Administración y difusión</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Instagram */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href={SOCIAL_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-instagram text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Instagram</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Identidad &amp; Servicios</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* TikTok */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href={SOCIAL_TIKTOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-tiktok text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">TikTok</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Creatividad &amp; Alcance</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Threads */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://www.threads.com/@padillastoresv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-threads text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Threads</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Noticias &amp; novedades</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* X / Twitter */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://x.com/padillastoresv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-x-twitter text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">X (Twitter)</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Info. &amp; Actualizaciones</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* YouTube */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://www.youtube.com/@padillastoresv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-youtube text-2xl text-[#ff0000]"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">YouTube</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">De todo un poco</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* LinkedIn */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://www.linkedin.com/company/padillastoresv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-linkedin text-2xl text-[#0a66c2]"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">LinkedIn</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Red Profesional</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Pinterest */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://www.pinterest.com/padillastoresv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-brands fa-pinterest text-2xl text-[#bd081c]"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Pinterest</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Inspiración</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Facebook Marketplace */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://web.facebook.com/marketplace/profile/padillastoresv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-solid fa-store text-2xl"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">MarketPlace</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Catálogo Facebook</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>

            {/* Maps */}
            <a
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(50,50,59,0.04)] hover:shadow-[0_8px_32px_rgba(50,50,59,0.08)] transition-all duration-300 active:scale-95"
              href="https://maps.app.goo.gl/search/San+Miguel,+El+Salvador"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed]">
                  <i className="fa-solid fa-map-location-dot text-2xl text-[#ea4335]"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[#32323b]">Ubicación</span>
                  <span className="text-xs text-[#5f5e68] font-medium uppercase tracking-wider">Visítanos</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#b2b1bc] group-hover:text-[#7c3aed] transition-colors">arrow_forward_ios</span>
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center w-full mt-auto pb-8 pt-4 bg-transparent text-center">
          <div className="px-4 py-2 rounded-full bg-[#e3e1ed]/50 backdrop-blur-md shadow-[0_4px_12px_rgba(50,50,59,0.05)] border border-[#b2b1bc]/30 flex items-center gap-1 font-mono text-xs transition-transform hover:scale-105 cursor-default">
            <span className="text-[#7a7a84] font-medium">&lt;</span>
            <span className="text-[#7c3aed] font-bold">Desarrollado</span>
            <span className="text-[#9e232a] font-medium ml-1">por=</span>
            <span className="text-[#0ea5e9]">"Carlos Molina"</span>
            <span className="text-[#7a7a84] font-medium ml-1">/&gt;</span>
          </div>
        </footer>

        {/* Toast Modal for Copy Link */}
        <div
          className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#0e0e12] text-[#9e9ca2] px-6 py-3 rounded-full shadow-2xl text-sm font-semibold z-[110] transition-all duration-300 flex items-center gap-2 border border-white/10 ${
            copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <i className="fa-solid fa-check-circle text-[#10b981] text-lg"></i>
          <span>Enlace copiado</span>
        </div>
      </div>
    </>
  );
};

export default LinksPage;
