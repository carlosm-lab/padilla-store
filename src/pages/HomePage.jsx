import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Helmet } from 'react-helmet-async';
import { BASE_URL, WHATSAPP_NUMBER } from '@/config/constants';
import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

const FALLBACK_HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2utPyicqN_kUOlg_KMlF2AA1cqvefgwLmDWPoStz9OLaD7KrTngV5Z330vaSwZf_Ad-Va2vFoDwEj4lBCqcQF_O4oZyxM7HrmORUD6zpvKgOA0z6fzdO1HZ6FDAI6BOHCIeCRWCSiZu8u9TJ79hmbPK0DLNbKphBr3g-E6flprEImzUkY0AIKfn31wWv1HhkMfxaEYUmAZAXARQ2wqx1GSswK_9grPpT5H48RI4n8rkAexrzyjQuq7HR3Lyfy-voEibkI1gYHm5I';

export default function HomePage() {
  const { products: homeProducts, loading } = useProducts({ limit: 4 });
  const { categories: allCategories, loading: loadingCategories } = useCategories();
  const { settings } = useSettings();
  const lottieContainer = useRef(null);

  useEffect(() => {
    let anim;
    if (lottieContainer.current) {
      anim = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/robot-animation.json'
      });
    }
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  const categories = (() => {
    const featured = allCategories.filter(c => c.featured);
    return featured.length > 0 ? featured : allCategories.slice(0, 3);
  })();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Inicio | I Nova SV</title>
        <meta name="description" content="Encuentra los mejores accesorios para tu celular en I Nova SV." />
        <meta property="og:title" content="I Nova SV" />
        <meta property="og:description" content="Accesorios para celular y tecnología." />
        <meta property="og:image" content={settings?.hero_image_url || FALLBACK_HERO_IMG} />
        <meta property="og:url" content={BASE_URL} />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <link rel="preload" as="image" href={settings?.hero_image_url || FALLBACK_HERO_IMG} />
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          @media (prefers-reduced-motion: no-preference) {
            .fade-in-up {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .fade-in-up.visible {
                opacity: 1;
                transform: translateY(0);
            }            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .fade-in-up {
                opacity: 1;
                transform: translateY(0);
            }
          }
          /* .main-banner — Diseño moderno y de tono ejecutivo */
          .main-banner {
            margin-top: calc(-1 * var(--navbar-height));
            padding: calc(80px + var(--navbar-height)) 0px 80px 0px;
            background-color: #f8fafc;
            background-image: 
              radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.02) 0%, transparent 50%);
            position: relative;
            overflow: hidden;
          }
          .dark .main-banner {
            background-color: #0b0f19;
            background-image: 
              radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.04) 0%, transparent 60%);
          }
          @media (min-width: 1024px) {
            .main-banner {
              padding: calc(140px + var(--navbar-height)) 0px 140px 0px;
            }
          }
          .executive-grid {
            background-image: radial-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 0);
            background-size: 24px 24px;
          }
          .dark .executive-grid {
            background-image: radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 0);
          }
          
          /* Líneas de maquetación técnica estilo Vercel */
          .grid-line-v {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1px;
            background: linear-gradient(to bottom, transparent, rgba(148, 163, 184, 0.05) 20%, rgba(148, 163, 184, 0.05) 80%, transparent);
            pointer-events: none;
          }
          .dark .grid-line-v {
            background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.02) 20%, rgba(255, 255, 255, 0.02) 80%, transparent);
          }
        `}</style>
      </Helmet>

      {/* Hero Section — Modern & Executive Redesign */}
      <section className="main-banner relative w-full overflow-hidden">
        {/* Rejilla de puntos decorativa de fondo (Executive Tone) */}
        <div className="absolute inset-0 executive-grid pointer-events-none z-[0] opacity-75" />

        {/* Líneas de Guía de Estructura Técnica */}
        <div className="grid-line-v left-[10%] lg:left-[15%]" />
        <div className="grid-line-v right-[10%] lg:right-[15%]" />
        <div className="grid-line-h bottom-[20%]" />

        {/* Esferas de desenfoque radial suave para dar profundidad 3D sin destellos ni neones */}
        <div className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[160px] pointer-events-none z-[1]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-blue-500/5 dark:bg-blue-500/5 blur-[140px] pointer-events-none z-[1]" />

        {/* Main Hero Container — Open, spacious, and typographic-first */}
        <div className="max-w-[1440px] mx-auto px-[24px] md:px-[80px] relative z-[2] w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Section: Typography & Actions */}
            <div className="w-full lg:col-span-7 flex flex-col justify-center text-center lg:text-left relative z-10 order-1">
              {/* Badge Corporativo Superior */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 mb-8 self-center lg:self-start transition-all duration-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Colección Premium 2026
              </div>
              
              {/* Título Principal — Editorial, sofisticado y de alto nivel */}
              <h1 className="font-sans font-bold tracking-tight text-[38px] leading-[44px] sm:text-[56px] sm:leading-[62px] lg:text-[72px] lg:leading-[80px] mb-6 text-slate-900 dark:text-white">
                Protege <span className="font-brand italic font-light text-primary block sm:inline">tu estilo</span> diario
              </h1>
              
              {/* Subtítulo — Pizarra ejecutivo, descriptivo y enfocado */}
              <p className="mb-10 text-[16px] sm:text-[18px] leading-[28px] font-normal text-slate-500 dark:text-slate-400 max-w-[580px] mx-auto lg:mx-0">
                {settings?.hero_subtitle || "Explora protectores, fundas y tecnología con diseño minimalista y máxima protección para tu dispositivo."}
              </p>

              {/* Botones de Acción de Alta Gama (Pill de diseño y contorno fino) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-[15px] rounded-full hover:scale-[1.02] shadow-lg shadow-slate-900/10 dark:shadow-white/5 hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-900 dark:border-white"
                >
                  Explorar catálogo
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_right_alt</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-full backdrop-blur-sm"
                >
                  Contáctanos
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chat</span>
                </Link>
              </div>
            </div>
            
            {/* Right Section: Premium Waving Robot (Lottie) as main visual */}
            <div className="w-full lg:col-span-5 flex items-center justify-center relative min-h-[320px] sm:min-h-[380px] lg:min-h-[480px] order-2">
              {/* Sutil halo de luz trasera para dar volumen en 3D */}
              <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-primary/15 to-blue-500/5 dark:from-primary/10 dark:to-transparent blur-3xl pointer-events-none" />
              
              {/* Elementos de órbitas de precisión (Líneas tecnológicas rotatorias) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible">
                {/* Órbita exterior */}
                <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-slate-300/40 dark:border-slate-700/30 animate-spin-slow" />
                {/* Órbita media */}
                <div className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full border border-dotted border-slate-300/60 dark:border-slate-700/40 animate-spin-reverse-slow" />
                {/* Órbita interior */}
                <div className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full border border-slate-200/50 dark:border-slate-800/40" />
              </div>

              {/* Robot Container (flota libremente directamente sobre el fondo) */}
              <div className="relative z-10 w-[240px] sm:w-[320px] lg:w-[380px] aspect-square animate-float pointer-events-none select-none">
                <div
                  ref={lottieContainer}
                  className="w-full h-full"
                  aria-label="Asistente de ventas saludando"
                  role="img"
                />
              </div>
            </div>
          </div>
          
          {/* Trust Strip - Stripe/Linear Style Dividers */}
          <div className="mt-20 lg:mt-32 pt-8 border-t border-slate-250/60 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-primary flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">Envío a todo el país</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Entrega rápida en El Salvador para todos tus accesorios.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-4 border-t md:border-t-0 md:border-l border-slate-250/60 dark:border-slate-800/60 pt-8 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-primary flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">Calidad Certificada</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Garantía real en protectores, cargadores y cases premium.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-4 border-t md:border-t-0 md:border-l border-slate-250/60 dark:border-slate-800/60 pt-8 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 text-primary flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50">
                <span className="material-symbols-outlined text-[22px]">chat</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">Atención Directa</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cierre de compras personalizado de inmediato por WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto bg-[#fcf8f8] dark:bg-background-dark text-[#1c1b1b] dark:text-slate-100 font-sans">
        <section className="mb-[80px] px-[20px] md:px-[64px] fade-in-up">
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#1c1b1b] dark:text-white mb-8 text-center">Explorar por Categoría</h2>
          <div className="flex overflow-x-auto hide-scrollbar gap-[16px] snap-x snap-mandatory pb-4">
            {loadingCategories ? (
              <div className="w-full py-12 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
            ) : categories.map((cat, index) => {
              const defaultImages = [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAkucagwOYF8skqepVgQ2unwBr55ZdWiGwNboYt7tmxilkmRP7-YfP_KhkFa91r60es4k5OCNvGKv-CBlJgjpcpRYwM-fxXpVJEwd3-hlXJA-ABb5LK4VWgmamHEXbXZ3YiZpVrP7eDe98zPo_eFmGC1pJo5Q-LRLHiK95H5j_BrKtT00q2x1XoFsNOXdnCEI-9ryQsd8iNa5AMFkdvwFpiBody5KTwLWLpQc3ky5YcwkAE8CqDSyy4fiWXXFm1nB0E5Myw_0gEwbM",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDa9RT3tTmdr__dyJDduA7hC1eKpWc0JqjZCicXbU6N4RVsxsdPR10UqdR_AMKBGLC2SE6RAg8wRhm0dLFTcx5iAV4hpZhvXnJ8LeQT8slk0UYaa4yFhhOnnjLaW68zsHcUdMClAdqZ3LfOl9VqSvcB7sMZIf43GOAr5jCnKMzgZ9JhiBLhHaCXbGMig-p2_B-FiJMtqT4wYDNXzekesDVTNpRkwl3_Ey4ELulDZhY4jpr_hd2WEDbrJMtPy-FZGoZEPSjt9F7D_sc",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDiNFm07Ae9c-95bNmCWBRKfdWVo-KG8I9-jIXHahCF-wYVdvlGqr7Ng06fNvFm5z32RGlufWOr0TzuzS2yusnaJfrY4MiFLv5rwCGDk344wQ6IRUdh1rqlziT0wtaJCAc5toyESQsRcXhFoTvoSlTKOHlTt0ucKRp0zT13bEDLvs8L8oNwlCMJ5rjJ05Mv6qy8u-h7ScqTneGoVzqGOomle6bvEzsjvCoGXBXBg3k4YoIut070sNsWKetXR--fNB03YU_Od4a0a1U"
              ];
              const imgSrc = cat.image_url || defaultImages[index % defaultImages.length];
              return (
                <Link
                  key={cat.id}
                  to={`/catalog?category=${cat.slug}`}
                  className="snap-start shrink-0 w-64 md:w-1/3 group relative rounded-2xl overflow-hidden bg-[#f6f3f2] dark:bg-white/5 aspect-[4/5] md:aspect-square flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                >
                  <div className="flex-grow p-8 flex items-center justify-center">
                    <img alt={cat.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" src={imgSrc} />
                  </div>
                  <div className="p-6 bg-[#f1edec]/50 dark:bg-black/50 backdrop-blur-sm absolute bottom-0 w-full">
                    <h3 className="text-[18px] leading-[28px] font-medium text-[#1c1b1b] dark:text-white text-center">{cat.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-[80px] px-[20px] md:px-[64px] fade-in-up" id="shop">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] text-[#1c1b1b] dark:text-white">Los Más Deseados</h2>
            <Link to="/catalog" className="text-[16px] leading-[24px] text-[#5d5f5f] dark:text-primary hover:text-[#444748] dark:hover:text-white transition-colors underline decoration-1 underline-offset-4">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] md:gap-8">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
            ) : homeProducts.length > 0 ? (
              homeProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500">Pronto llegarán nuevos productos.</div>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="mb-[80px] px-[20px] md:px-[64px] fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-6">
            <div className="bg-[#f6f3f2] dark:bg-white/5 p-8 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#f1edec] dark:bg-white/10 flex items-center justify-center text-[#5d5f5f] dark:text-white mb-2">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 0" }}>local_shipping</span>
              </div>
              <h3 className="text-[18px] leading-[28px] font-medium text-[#1c1b1b] dark:text-white">Envío gratis</h3>
              <p className="text-[16px] leading-[24px] text-[#444748] dark:text-slate-400">En todos los pedidos superiores a $50. Recíbelo en 24/48h.</p>
            </div>
            <div className="bg-[#f6f3f2] dark:bg-white/5 p-8 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#f1edec] dark:bg-white/10 flex items-center justify-center text-[#5d5f5f] dark:text-white mb-2">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 0" }}>verified</span>
              </div>
              <h3 className="text-[18px] leading-[28px] font-medium text-[#1c1b1b] dark:text-white">Garantía 1 año</h3>
              <p className="text-[16px] leading-[24px] text-[#444748] dark:text-slate-400">Todos nuestros productos cuentan con garantía de calidad.</p>
            </div>
            <div className="bg-[#f6f3f2] dark:bg-white/5 p-8 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#f1edec] dark:bg-white/10 flex items-center justify-center text-[#5d5f5f] dark:text-white mb-2">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
              </div>
              <h3 className="text-[18px] leading-[28px] font-medium text-[#1c1b1b] dark:text-white">Pago seguro</h3>
              <p className="text-[16px] leading-[24px] text-[#444748] dark:text-slate-400">Transacciones 100% seguras con encriptación SSL.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
