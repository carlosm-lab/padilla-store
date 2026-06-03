import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - Padilla Store</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="La página que buscas no existe o ha sido movida en Padilla Store." />
        <meta property="og:title" content="Página no encontrada - Padilla Store" />
        <meta property="og:description" content="La página que buscas no existe o ha sido movida." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://padillastore.com/404" />
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Página no encontrada</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Lo sentimos, no pudimos encontrar la página que buscas. Es posible que el enlace sea incorrecto o que la página haya sido eliminada.
        </p>
        <div className="flex flex-row w-full max-w-md mx-auto gap-3">
          <Link 
            to="/" 
            className="flex-1 inline-flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold rounded-xl hover:scale-[1.02] shadow-lg shadow-slate-900/10 dark:shadow-white/5 active:scale-[0.98] transition-all duration-300 cursor-pointer border border-transparent text-center"
            style={{ padding: 'var(--space-md) var(--space-md)', fontSize: 'var(--text-sm)' }}
          >
            Volver al Inicio
          </Link>
          <Link 
            to="/contact" 
            className="flex-1 inline-flex items-center justify-center bg-white/50 dark:bg-slate-950/40 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer rounded-xl backdrop-blur-md text-center"
            style={{ padding: 'var(--space-md) var(--space-md)', fontSize: 'var(--text-sm)' }}
          >
            Contacto
          </Link>
        </div>
      </div>
    </>
  );
}

