// ──────────────────────────────────────────────────────────────
// APP — ROUTING Y LAYOUT PRINCIPAL
// ──────────────────────────────────────────────────────────────
// Define la estructura de rutas de toda la aplicación.
//
// ESTRUCTURA:
//   /admin/*  → Panel de administración (protegido por AdminRoute)
//   /*        → Tienda pública (envuelta en ShopLayout)
//
// LAZY LOADING:
// Todas las páginas se cargan con React.lazy + Suspense para
// que el bundle inicial sea pequeño (~100KB). Cada página se
// descarga solo cuando el usuario navega a ella.
//
// ERROR BOUNDARIES:
// Cada ruta tiene su propio ErrorBoundary. Si una página crashea,
// solo esa ruta muestra el error — el resto de la app sigue
// funcionando. Esto es crítico para que un error en el admin
// no tumbe la tienda pública y viceversa.
//
// COMPONENTES GLOBALES:
//   - CookieBanner: banner de cookies (siempre visible hasta aceptar)
//   - ScrollToTop: resetea scroll al navegar entre rutas
//   - Toaster: notificaciones toast (react-hot-toast)
// ──────────────────────────────────────────────────────────────
import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// ── Páginas públicas (lazy) ──────────────────────────────
const HomePage = lazy(() => import('./pages/HomePage'));
const TechCatalogPage = lazy(() => import('./pages/TechCatalogPage'));
const JewelryCatalogPage = lazy(() => import('./pages/JewelryCatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ── Panel admin (lazy) ───────────────────────────────────
// Separados del bundle público. Un usuario normal nunca descarga
// este código a menos que tenga rol admin.
const AdminRoute = lazy(() => import('./components/AdminRoute'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const CategoriesPage = lazy(() => import('./pages/admin/CategoriesPage'));
const MessagesPage = lazy(() => import('./pages/admin/MessagesPage'));
const FavoritesPage = lazy(() => import('./pages/admin/FavoritesPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const DocumentationPage = lazy(() => import('./pages/admin/DocumentationPage'));

// Spinners de carga diferenciados: admin tiene fondo oscuro, público es neutral
const AdminLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

// Resetear scroll al cambiar de ruta — sin esto, al navegar de
// un producto largo al catálogo, la página aparece a media página.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import ShopLayout from './components/layout/ShopLayout';
import CookieBanner from './components/ui/CookieBanner';



function App() {
  return (
    <ErrorBoundary>
      <CookieBanner />
      <ScrollToTop />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px 20px',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#1DA851', // Verde WhatsApp / marca
            },
          },
        }}
      />
      <Routes>
        {/* ── Rutas Admin ────────────────────────────────── */}
        {/* AdminRoute verifica isAdmin + loading antes de renderizar */}
        <Route path="/admin" element={
          <ErrorBoundary>
            <Suspense fallback={<AdminLoading />}>
              <AdminRoute><AdminLayout /></AdminRoute>
            </Suspense>
          </ErrorBoundary>
        }>
          <Route index element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><DashboardPage /></Suspense></ErrorBoundary>} />
          <Route path="products" element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><ProductsPage /></Suspense></ErrorBoundary>} />
          <Route path="categories" element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><CategoriesPage /></Suspense></ErrorBoundary>} />
          <Route path="messages" element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><MessagesPage /></Suspense></ErrorBoundary>} />
          <Route path="favorites" element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><FavoritesPage /></Suspense></ErrorBoundary>} />
          <Route path="settings" element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><SettingsPage /></Suspense></ErrorBoundary>} />
          <Route path="documentacion" element={<ErrorBoundary><Suspense fallback={<AdminLoading />}><DocumentationPage /></Suspense></ErrorBoundary>} />
        </Route>

        {/* ── Rutas Públicas (tienda) ────────────────────── */}
        {/* Cada ruta está envuelta en ShopLayout (Navbar + Footer + CartDrawer) */}
        <Route path="/" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><HomePage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="/catalog-tecnologia" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><TechCatalogPage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="/catalog-joyeria" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><JewelryCatalogPage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="/product/:slug" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><ProductDetailPage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="/contact" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><ContactPage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="/terms" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><TermsPage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="/privacy" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><PrivacyPage /></ShopLayout></Suspense></ErrorBoundary>} />
        <Route path="*" element={<ErrorBoundary><Suspense fallback={<PageLoading />}><ShopLayout><NotFoundPage /></ShopLayout></Suspense></ErrorBoundary>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
