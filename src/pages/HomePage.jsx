import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/config/constants';
import { useEffect } from 'react';

const FALLBACK_HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2utPyicqN_kUOlg_KMlF2AA1cqvefgwLmDWPoStz9OLaD7KrTngV5Z330vaSwZf_Ad-Va2vFoDwEj4lBCqcQF_O4oZyxM7HrmORUD6zpvKgOA0z6fzdO1HZ6FDAI6BOHCIeCRWCSiZu8u9TJ79hmbPK0DLNbKphBr3g-E6flprEImzUkY0AIKfn31wWv1HhkMfxaEYUmAZAXARQ2wqx1GSswK_9grPpT5H48RI4n8rkAexrzyjQuq7HR3Lyfy-voEibkI1gYHm5I';

export default function HomePage() {
  const { products: homeProducts, loading } = useProducts({ limit: 4 });
  const { categories: allCategories, loading: loadingCategories } = useCategories();
  const { settings } = useSettings();

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

          /* .main-banner — valores exactos del CSS de la plantilla (línea 897) */
          /* padding-top reducido de 250px a 150px porque nuestro navbar es sticky, no absolute */
          .main-banner {
            padding: 150px 120px 150px 120px;
          }
          /* Responsive <=992px — CSS plantilla líneas 2003-2006 */
          @media (max-width: 992px) {
            .main-banner {
              padding: 80px 15px 30px 15px;
            }
          }
        `}</style>
      </Helmet>

      {/* Hero Section — Estructura exacta de landing/index.html líneas 168-200 */}
      {/* CSS: .main-banner (línea 893), responsive @media max-width:992px (línea 2003) */}
      <section
        className="main-banner relative w-full overflow-hidden text-center lg:text-left"
        style={{
          /* Desktop: padding: 250px 120px 150px 120px (CSS línea 897) */
          /* Mobile: padding: 226px 0px 30px 0px (CSS línea 2005) */
          /* Ajuste: el navbar de la plantilla es absolute, el nuestro es sticky, */
          /* así que restamos ~100px del padding-top para compensar */
        }}
      >
        {/* Fondo decorativo — .main-banner:after (CSS línea 902) */}
        {/* background-image: url(slider-left-dec.png), z-index:1 */}
        {/* En mobile se oculta: .main-banner:after { display:none } (CSS línea 1979) */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] hidden lg:block"
          style={{
            backgroundImage: "url('/slider-left-dec.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'left top'
          }}
        />

        {/* .container (Bootstrap max-width 1140px en xl) */}
        <div className="max-w-[1140px] mx-auto px-[15px]">
          {/* .row > .col-lg-12 > .row (plantilla líneas 170-172) */}
          <div className="flex flex-wrap">
            {/* .col-lg-6.align-self-center — Columna izquierda (plantilla línea 173) */}
            <div className="w-full lg:w-1/2 px-[15px] self-center">
              {/* .left-content.show-up.header-text (plantilla línea 174) */}
              {/* .left-content { margin-right: 15px } (CSS línea 916) */}
              {/* .show-up { position:relative; z-index:2 } (CSS línea 202) */}
              <div className="lg:mr-[15px] relative z-[2]">
                {/* h2: font-weight:700, line-height:70px, font-size:50px, mb:20px (CSS líneas 920-925) */}
                <h2 className="font-bold text-[32px] leading-[42px] lg:text-[50px] lg:leading-[70px] mb-[20px] text-[#2a2a2a] dark:text-white">
                  {settings?.hero_title || "Protege tu estilo"}
                </h2>
                {/* p: mb:45px, color:#2a2a2a, font-weight:400 (CSS líneas 928-931) */}
                {/* En mobile color:#afafaf (CSS línea 1987) */}
                <p className="mb-[45px] text-[15px] leading-[30px] font-normal text-[#afafaf] lg:text-[#2a2a2a] dark:text-slate-300">
                  {settings?.hero_subtitle || "Descubre nuestra nueva colección de fundas premium. Diseño minimalista, máxima protección para tu dispositivo."}
                </p>
                {/* Botones — .white-button (CSS líneas 207-228) */}
                {/* .white-button a en .main-banner: bg #4b8ef1, color #fff (CSS líneas 952-955) */}
                {/* display:inline-block, padding:10px 20px, rounded:23px, font:15px 500 (CSS líneas 208-217) */}
                {/* .first-button { margin-right:15px } (CSS línea 935) */}
                <div className="flex flex-wrap gap-[15px] justify-center lg:justify-start">
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-[5px] px-[20px] py-[10px] bg-[#4b8ef1] text-white hover:bg-[#3a7ddf] font-medium text-[15px] rounded-[23px] tracking-[0.3px] transition-all duration-500"
                  >
                    Comprar ahora
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">shopping_bag</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-[5px] px-[20px] py-[10px] bg-[#4b8ef1] text-white hover:bg-[#3a7ddf] font-medium text-[15px] rounded-[23px] tracking-[0.3px] transition-all duration-500"
                  >
                    Contáctanos
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chat</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* .col-lg-6 — Columna derecha imagen (plantilla línea 191) */}
            <div className="w-full lg:w-1/2 px-[15px]">
              {/* .right-image: text-align:center, position:relative, z-index:20 (CSS líneas 942-946) */}
              {/* En mobile: margin:30px auto 0 auto (CSS línea 2011) */}
              <div className="text-center relative z-[20] mt-[30px] lg:mt-0 mx-auto lg:mx-0">
                {/* .right-image img: max-width:710px (CSS línea 949) */}
                <img
                  src="/slider-dec.png"
                  alt="I Nova SV"
                  className="max-w-full lg:max-w-[710px] inline-block"
                />
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
