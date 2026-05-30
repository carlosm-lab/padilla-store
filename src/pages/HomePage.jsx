import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Helmet } from 'react-helmet-async';
import { BASE_URL, WHATSAPP_NUMBER } from '@/config/constants';
import { useEffect, useRef, useState, useCallback } from 'react';
import lottie from 'lottie-web';

const FALLBACK_HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2utPyicqN_kUOlg_KMlF2AA1cqvefgwLmDWPoStz9OLaD7KrTngV5Z330vaSwZf_Ad-Va2vFoDwEj4lBCqcQF_O4oZyxM7HrmORUD6zpvKgOA0z6fzdO1HZ6FDAI6BOHCIeCRWCSiZu8u9TJ79hmbPK0DLNbKphBr3g-E6flprEImzUkY0AIKfn31wWv1HhkMfxaEYUmAZAXARQ2wqx1GSswK_9grPpT5H48RI4n8rkAexrzyjQuq7HR3Lyfy-voEibkI1gYHm5I';

const ANIMATION_PATH = '/new-animation.json';

export default function HomePage() {
  const { products: homeProducts, loading } = useProducts({ limit: 4 });
  const { categories: allCategories, loading: loadingCategories } = useCategories();
  const { settings } = useSettings();
  
  // Desktop animation ref
  const lottieRef = useRef(null);
  const animInstance = useRef(null);
  
  // Mobile animation ref
  const lottieMobileRef = useRef(null);
  const animMobileInstance = useRef(null);

  // Load a lottie animation into a container
  const loadAnim = useCallback((container, path) => {
    if (!container) return null;
    return lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path,
    });
  }, []);

  // Initialize animation on mount
  useEffect(() => {
    animInstance.current = loadAnim(lottieRef.current, ANIMATION_PATH);
    animMobileInstance.current = loadAnim(lottieMobileRef.current, ANIMATION_PATH);

    return () => {
      animInstance.current?.destroy();
      animMobileInstance.current?.destroy();
    };
  }, [loadAnim]);

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
        <title>Inicio | Padilla's Store</title>
        <meta name="description" content="Encuentra los mejores accesorios para tu celular y joyería fina en Padilla's Store." />
        <meta property="og:title" content="Padilla's Store" />
        <meta property="og:description" content="Accesorios para celular y joyería fina premium." />
        <meta property="og:image" content={settings?.hero_image_url || FALLBACK_HERO_IMG} />
        <meta property="og:url" content={BASE_URL} />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <link rel="preload" as="image" href={settings?.hero_image_url || FALLBACK_HERO_IMG} />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
          
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
            }
            @keyframes float {
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
          
          .main-banner {
            margin-top: calc(-1 * var(--navbar-height));
            padding: calc(var(--space-xl) + var(--navbar-height)) 0px var(--space-xl) 0px;
            background-color: var(--color-background-light);
            background-image: none;
            position: relative;
            overflow: hidden;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .dark .main-banner {
            background-color: var(--color-background-dark);
            background-image: none;
          }
        `}</style>
      </Helmet>

      {/* Hero Section — Modern & Executive Redesign */}
      <section className="main-banner relative w-full overflow-hidden">
        {/* Main Hero Container — Spaced and responsive */}
        <div className="max-w-[1440px] mx-auto relative z-[2] w-full" style={{ paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)' }}>
          <div className="flex flex-col lg:flex-row-reverse items-center w-full" style={{ gap: 'var(--space-2xl)' }}>
            {/* Left Column: Typography & Actions (Aligned and Clean) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-10">
              
              {/* Título Principal */}
              <h1 className="font-sans font-black tracking-tight text-slate-900 dark:text-white inline-flex flex-col items-stretch mx-auto lg:mx-0" style={{ fontSize: 'var(--text-hero)', lineHeight: 1.1, marginBottom: 'var(--space-lg)' }}>
                <span className="block whitespace-nowrap">
                  {settings?.hero_title || "Protege tu estilo"}
                </span>
                <span className="flex justify-between bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-blue-500 dark:from-violet-400 dark:via-primary dark:to-blue-400 select-none italic font-semibold" style={{ fontFamily: 'var(--font-brand)' }}>
                  <span>s</span><span>i</span><span>n</span><span>&nbsp;</span><span>l</span><span>í</span><span>m</span><span>i</span><span>t</span><span>e</span><span>s</span>
                </span>
              </h1>
              
              {/* Mobile Animation */}
              <div className="lg:hidden w-full max-w-[340px] aspect-square mx-auto z-[20] relative" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <div
                  ref={lottieMobileRef}
                  className="w-full h-full absolute inset-0"
                  aria-label="Animación decorativa"
                  role="img"
                />
              </div>
              
              {/* Subtítulo — Nivel corporativo */}
              <p className="font-normal text-slate-500 dark:text-slate-400 max-w-[500px]" style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: 'var(--space-xl)' }}>
                {settings?.hero_subtitle || "Descubre nuestra colección exclusiva de joyería fina y accesorios premium para tu celular."}
              </p>

              {/* Botones de Acción de Alta Gama */}
              <div className="flex flex-col sm:flex-row w-full" style={{ gap: 'var(--space-md)' }}>
                <Link
                  to="/catalog"
                  className="w-full sm:flex-1 inline-flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold rounded-xl hover:scale-[1.02] shadow-lg shadow-slate-900/10 dark:shadow-white/5 active:scale-[0.98] transition-all duration-300 cursor-pointer border border-transparent"
                  style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--text-sm)', gap: 'var(--space-sm)' }}
                >
                  Explorar catálogo
                  <span className="material-symbols-outlined" style={{ fontSize: 'var(--icon-sm)' }} aria-hidden="true">arrow_right_alt</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:flex-1 inline-flex items-center justify-center bg-white/50 dark:bg-slate-950/40 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer rounded-xl backdrop-blur-md"
                  style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--text-sm)', gap: 'var(--space-sm)' }}
                >
                  Contáctanos
                  <span className="material-symbols-outlined" style={{ fontSize: 'var(--icon-sm)' }} aria-hidden="true">chat</span>
                </Link>
              </div>
            </div>
            
            {/* Animation Column (Left logically due to flex-row-reverse) */}
            <div className="hidden lg:block w-full lg:w-1/2 px-[15px]">
              <div className="text-center relative z-[20] mt-[30px] lg:mt-0 mx-auto lg:mx-0">
                <div className="w-full max-w-[500px] aspect-square mx-auto inline-block relative" style={{ minHeight: '350px' }}>
                  <div
                    ref={lottieRef}
                    className="w-full h-full absolute inset-0"
                    aria-label="Animación decorativa"
                    role="img"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Strip - Stripe/Linear Style Dividers */}
          <div className="mt-20 lg:mt-32 pt-10 border-t border-slate-200/40 dark:border-slate-800/40 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-6">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900/80 text-primary flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Envío a todo el país</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Entrega rápida en El Salvador para todos tus pedidos.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-6 md:border-l border-slate-200/40 dark:border-slate-800/40">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900/80 text-primary flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Calidad Certificada</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Garantía real en joyería, protectores y cases premium.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-6 md:border-l border-slate-200/40 dark:border-slate-800/40">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900/80 text-primary flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Atención Directa</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cierre de compras personalizado de inmediato por WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto bg-background-light dark:bg-background-dark text-[#1c1b1b] dark:text-slate-100 font-sans">
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
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 0" }}>chat_bubble</span>
              </div>
              <h3 className="text-[18px] leading-[28px] font-medium text-[#1c1b1b] dark:text-white">Pedido sin Tarjeta</h3>
              <p className="text-[16px] leading-[24px] text-[#444748] dark:text-slate-400">Todos los pedidos se completan conversando directamente por WhatsApp.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
