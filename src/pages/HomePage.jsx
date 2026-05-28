import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Helmet } from 'react-helmet-async';
import { WHATSAPP_NUMBER, BASE_URL } from '@/config/constants';
import SocialIcons from '@/components/SocialIcons';

const FALLBACK_HERO_IMG = '/hero_aura_cases.png';

export default function HomePage() {
  const navigate = useNavigate();
  const { products: homeProducts, loading } = useProducts({ limit: 4 });
  const { categories: allCategories, loading: loadingCategories } = useCategories();
  const { settings } = useSettings();
  
  // Show categories marked as "featured" by admin. Fallback: first 3 alphabetically.
  const categories = (() => {
    const featured = allCategories.filter(c => c.featured);
    return featured.length > 0 ? featured : allCategories.slice(0, 3);
  })();

  const getCategoryTheme = (cat) => {
    return {
      icon: cat.icon || 'category',
      desc: cat.description || 'Explora nuestros hermosos detalles de esta categoría.',
      img: cat.image_url || 'https://images.unsplash.com/photo-1513290254054-0f62d1ecbaaa?q=80&w=800&auto=format&fit=crop'
    };
  };

  return (
    <>
      <Helmet>
        <title>Inicio | I Nova Sv</title>
        <meta name="description" content="Encuentra los mejores accesorios para tu celular en I Nova Sv." />
        <meta property="og:title" content="I Nova Sv" />
        <meta property="og:description" content="Accesorios para celular y tecnología." />
        <meta property="og:image" content={settings?.hero_image_url || FALLBACK_HERO_IMG} />
        <meta property="og:url" content={BASE_URL} />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <link rel="preload" as="image" href={settings?.hero_image_url || FALLBACK_HERO_IMG} />
      </Helmet>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-[#F5F3F0] dark:bg-[#1D1E20] text-[#1C2035] dark:text-white pt-6 pb-12 lg:py-20 select-none">
          <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Columna Izquierda: Mockup de Producto (Teléfono en piedra + cargador) (Ocupa 6 de 12 columnas) */}
            <div className="lg:col-span-6 flex justify-center items-center w-full h-full">
              <div className="w-full max-w-[540px] lg:max-w-none flex justify-center">
                <img 
                  src={settings?.hero_image_url || FALLBACK_HERO_IMG} 
                  alt="Colección Aura" 
                  className="w-full h-auto max-h-[480px] lg:max-h-[560px] object-contain transition-transform duration-1000 group-hover:scale-102"
                />
              </div>
            </div>

            {/* Columna Derecha: Contenido de Textos y CTAs (Ocupa 6 de 12 columnas) */}
            <div className="lg:col-span-6 flex flex-col items-start justify-center text-left gap-4 sm:gap-5 lg:gap-6 pl-0 lg:pl-4">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#8C8274] dark:text-slate-400 uppercase select-none font-sans">
                {settings?.hero_subtitle_tag || "ACCESORIOS QUE"}
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[4rem] font-brand font-medium leading-[1.08] text-[#1C2035] dark:text-white tracking-tight">
                {settings?.hero_title === "Elevan tu experiencia diaria." || !settings?.hero_title ? (
                  <>Elevan tu<br />experiencia<br />diaria.</>
                ) : (
                  settings.hero_title
                )}
              </h1>
              
              <p className="text-sm sm:text-base md:text-[17px] text-[#5E5B56] dark:text-slate-300 font-medium max-w-lg leading-relaxed mt-1">
                {settings?.hero_subtitle || "Diseñados para complementar tu estilo y proteger lo que te conecta."}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mt-2 w-full">
                <Link 
                  to="/catalog" 
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1C2035] hover:bg-[#2B314E] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full font-bold text-sm tracking-wide transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C2035] dark:focus:ring-white"
                >
                  <span>Descubrir colección</span>
                  <span className="text-lg font-light leading-none">&rarr;</span>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Business Features Section (Franja inferior) */}
        <section className="bg-[#ECEAF0] dark:bg-[#151719] border-t border-[#D9D6DF] dark:border-white/5 py-8 px-container select-none">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            
            <div className="flex items-center gap-3.5">
              <span className="material-symbols-outlined text-[#1C2035] dark:text-slate-200 text-[28px] font-light shrink-0" aria-hidden="true">verified</span>
              <div>
                <h4 className="font-bold text-[#1C2035] dark:text-white text-xs sm:text-sm">Calidad premium</h4>
                <p className="text-[#5E5B56] dark:text-slate-400 text-[10px] sm:text-xs">Materiales seleccionados</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="material-symbols-outlined text-[#1C2035] dark:text-slate-200 text-[28px] font-light shrink-0" aria-hidden="true">local_shipping</span>
              <div>
                <h4 className="font-bold text-[#1C2035] dark:text-white text-xs sm:text-sm">Envíos seguros</h4>
                <p className="text-[#5E5B56] dark:text-slate-400 text-[10px] sm:text-xs">A todo el país</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="material-symbols-outlined text-[#1C2035] dark:text-slate-200 text-[28px] font-light shrink-0" aria-hidden="true">verified_user</span>
              <div>
                <h4 className="font-bold text-[#1C2035] dark:text-white text-xs sm:text-sm">Garantía incluida</h4>
                <p className="text-[#5E5B56] dark:text-slate-400 text-[10px] sm:text-xs">Compra con tranquilidad</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="material-symbols-outlined text-[#1C2035] dark:text-slate-200 text-[28px] font-light shrink-0" aria-hidden="true">schedule</span>
              <div>
                <h4 className="font-bold text-[#1C2035] dark:text-white text-xs sm:text-sm">Atención real</h4>
                <p className="text-[#5E5B56] dark:text-slate-400 text-[10px] sm:text-xs">Te ayudamos siempre</p>
              </div>
            </div>

          </div>
        </section>

        {/* New Products */}
        <section className="px-container py-[var(--space-2xl)]">
          <div className="mb-[var(--space-md)]">
            <h2 className="text-[var(--text-3xl)] font-bold">Novedades</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-[var(--space-2xs)]">Los últimos diseños que han llegado a nuestra tienda.</p>
            <Link to="/catalog" className="inline-flex text-primary font-bold items-center gap-[var(--space-xs)] hover:underline mt-[var(--space-sm)]">
              Ver todo <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-lg)]">
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

        {/* Specialties */}
        <section className="px-container py-[var(--space-xl)]">
          <h2 className="text-slate-900 dark:text-slate-100 text-[var(--text-3xl)] font-bold mb-[var(--space-lg)]">Nuestras Especialidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]">
            {loadingCategories ? (
               <div className="col-span-full py-12 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
            ) : categories.length === 0 ? (
               <div className="col-span-full py-12 text-center text-slate-500">Pronto llegarán nuevas categorías.</div>
            ) : categories.map(cat => {
              const theme = getCategoryTheme(cat);
              return (
                <Link 
                  key={cat.id} 
                  to={`/catalog?category=${cat.slug}`}
                  className="relative flex flex-col justify-end p-[var(--space-md)] rounded-xl border border-slate-100 dark:border-white/5 shadow-360 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden min-h-[160px] bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary" 
                >
                  <img 
                    src={theme.img} 
                    alt={cat.name} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black"></div>
                  
                  <div className="relative z-10 flex flex-col gap-[var(--space-2xs)] transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-[clamp(2.5rem,6vw,3rem)] aspect-square mb-[var(--space-xs)] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary transition-colors duration-300">
                      <span className="material-symbols-outlined" style={{ fontSize: 'var(--icon-md)' }}>{theme.icon}</span>
                    </div>
                    <h3 className="text-[var(--text-lg)] text-white font-bold tracking-wide drop-shadow-md break-words">{cat.name}</h3>
                    <p className="text-white/80 text-[var(--text-sm)] line-clamp-3 drop-shadow-sm break-words">{theme.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white border-y border-slate-100 dark:bg-white/5 dark:border-transparent px-container py-[var(--space-2xl)] shadow-360 relative z-10">
          <div className="flex flex-col md:flex-row gap-[var(--space-xl)] items-center">
            <div className="flex-1">
              <h2 className="text-[var(--text-3xl)] font-bold mb-[var(--space-lg)]">Tu celular, tu estilo</h2>
              <p className="text-[var(--text-lg)] text-slate-700 dark:text-slate-300 mb-[var(--space-xl)] leading-relaxed">
                Creemos que tu dispositivo merece la mejor protección y el mejor diseño. Descubre accesorios que se adaptan a tu ritmo de vida.
              </p>
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-start gap-[var(--space-md)]">
                  <span className="bg-primary text-white w-[clamp(1.5rem,4vw,2rem)] aspect-square rounded-full flex items-center justify-center shrink-0 font-bold text-[var(--text-sm)]">1</span>
                  <p className="font-medium">Elige los accesorios ideales para tu modelo.</p>
                </div>
                <div className="flex items-start gap-[var(--space-md)]">
                  <span className="bg-primary text-white w-[clamp(1.5rem,4vw,2rem)] aspect-square rounded-full flex items-center justify-center shrink-0 font-bold text-[var(--text-sm)]">2</span>
                  <p className="font-medium">Agrégalos a tu carrito y contacta con nosotros vía WhatsApp.</p>
                </div>
                <div className="flex items-start gap-[var(--space-md)]">
                  <span className="bg-primary text-white w-[clamp(1.5rem,4vw,2rem)] aspect-square rounded-full flex items-center justify-center shrink-0 font-bold text-[var(--text-sm)]">3</span>
                  <p className="font-medium">Coordinamos la entrega rápida y segura hasta la puerta de tu casa.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video rounded-xl bg-slate-300 overflow-hidden shadow-360">
                <img loading="eager" alt="Hands crafting" className="w-full h-full object-cover" src={settings?.story_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCaeArssF_3O-p7X4lsXtjx6IVwX8KDLaO44YbE9bVMBL0wII6YeLPu_XUYBYP-cZeiHFMdQIGQMqNt8dF0uwYbvgO5d-OHqW9lGDT90POXBfjt9F0RL6QxwgTZeH7MvZA9ArESxH0en2a-4zUvFOey9lLWYD6r3QeT0-a0g4EBJkyrSSa-uZr07zWN3-xKJr-RiY4kHhkqvbKENnC6hjivPXauIXG4_AyktByiJBkJf37a662tC04O_skpaOxuZAjbytZ5rvIwzTgw"}/>
              </div>
            </div>
          </div>
        </section>


      </main>
    </>
  );
}
