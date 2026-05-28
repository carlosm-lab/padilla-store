/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL, SITE_NAME } from '@/config/constants';

// Import the raw contents of the documents — embedded in src/data/ (no external deps)

const sprintsContent = `================================================================================
  I Nova SV — PLAN DE DESARROLLO POR SPRINTS
  Proyecto interno: I Nova SV
  Versión 1.0 — Marzo 2026
  10 sprints · 10 semanas · 406 horas · 1 desarrollador
================================================================================


════════════════════════════════════════════════════════════════════════════════
SPRINT 1 — Fundación e Infraestructura
Semana 1 (Días 1–5) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Establecer toda la base técnica del proyecto antes de escribir una sola línea
de código de la aplicación: repositorio, herramientas de build, design system
con tokens CSS, schema de base de datos completo, políticas RLS, RPCs de
negocio, bucket de Storage y cuentas de servicios externos. Sin este sprint
completo, ningún sprint posterior podía comenzar.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  1h  Inicialización del repositorio Git y scaffolding con Vite 6.2
      → / (raíz del proyecto)
      Notas: vite create, .gitignore, README inicial

  2h  Configuración de package.json con dependencias exactas del stack
      → package.json
      Notas: React 19, Supabase 2.49.4, Framer Motion 12.4.7, etc.

  3h  vite.config.js: aliases, manualChunks (vendor/ui/modules), optimizeDeps
      → vite.config.js
      Notas: Chunk splitting crítico para performance de carga inicial

  2h  Setup de Tailwind CSS v4 con plugin @tailwindcss/vite
      → vite.config.js / index.css
      Notas: Integración como plugin Vite, no PostCSS

  2h  index.css: tokens CSS custom (--color-primary #d41111, --color-background-*)
      → src/index.css

  1h  index.css: fuentes (Manrope + Playfair Display + Material Symbols) en index.html
      → src/index.css / index.html
      Notas: --font-sans y --font-serif definidos

  2h  index.css: escala fluida de espaciado con clamp() — 7 tokens (--space-xs a --space-3xl)
      → src/index.css
      Notas: Rango de 4px a 64px con adaptación fluida entre breakpoints

  2h  index.css: escala fluida de tipografía con clamp() — 9 tokens (--text-xs a --text-6xl)
      → src/index.css
      Notas: Rango de 11px a 60px

  2h  index.css: 5 keyframes (fadeInUp, slideUp, shimmer, pulseSubtle, countdownPulse)
      → src/index.css

  1h  index.css: --navbar-height fluid (56-68px) y --shadow-360
      → src/index.css

  1h  Placeholders en public/: logo.png y og-image.png
      → public/

  3h  Supabase: proyecto nuevo + configuración Auth Google OAuth
      → Supabase Dashboard
      Notas: Client ID y Secret de Google Cloud Console

  3h  Schema DB: tabla products (id, name, slug, description, price, old_price,
      offer_starts_at, offer_ends_at, category, category_id, tags[], image_path,
      images[], is_active)
      → Supabase SQL Editor

  1h  Schema DB: tabla categories (id, name, slug, icon, image_url, description)
      → Supabase SQL Editor

  3h  Schema DB: tabla profiles + trigger auto-create con role='user' al primer login
      → Supabase SQL Editor

  1h  Schema DB: tabla user_favorites (id, user_id, product_id) con unique constraint
      → Supabase SQL Editor

  1h  Schema DB: tabla user_carts (id, user_id, cart_data JSONB)
      → Supabase SQL Editor

  1h  Schema DB: tabla contact_messages (id, name, email, subject, message, is_read,
      turnstile_token)
      → Supabase SQL Editor

  1h  Schema DB: tabla store_settings (singleton, 1 fila con toda la config global)
      → Supabase SQL Editor

  1h  Schema DB: tabla system_logs (id, level, message, context, source, created_at)
      → Supabase SQL Editor

  2h  RLS: tabla products (read público, write solo admin)
      → Supabase SQL Editor

  1h  RLS: tablas categories y store_settings (read público, write admin)
      → Supabase SQL Editor

  2h  RLS: profiles, user_favorites, user_carts (propio usuario via auth.uid())
      → Supabase SQL Editor

  1h  RLS: contact_messages (insert autenticado, read/delete admin)
      → Supabase SQL Editor

  1h  RLS: system_logs (insert frontend, read admin)
      → Supabase SQL Editor

  3h  RPC: generate_whatsapp_message — recibe items del carrito, retorna texto formateado
      → Supabase SQL Editor

  3h  RPC: get_dashboard_data — stats para el dashboard admin
      → Supabase SQL Editor

  2h  Supabase Storage: bucket product-images con lectura pública y escritura admin
      → Supabase Dashboard

  1h  Cloudflare Turnstile: registro y obtención de site key (modo invisible)
      → .env

  1h  .env.example documentado con todas las variables VITE_*
      → .env.example
      Notas: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_WHATSAPP_NUMBER,
             VITE_TURNSTILE_SITE_KEY, VITE_CONTACT_EMAIL, VITE_BASE_URL
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] npm run dev arranca sin errores
  [ ] Tailwind v4 compila con todos los tokens CSS y los 5 keyframes
  [ ] Las 8 tablas existen en Supabase con sus tipos correctos
  [ ] Todas las políticas RLS están activas y verificadas
  [ ] Las 2 RPCs existen en Supabase y responden correctamente
  [ ] El bucket product-images existe con lectura pública
  [ ] Login con Google OAuth funciona en localhost
  [ ] .env.example está completo y documentado


════════════════════════════════════════════════════════════════════════════════
SPRINT 2 — Capa de Datos: Utilidades y Servicios
Semana 2 (Días 6–10) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir toda la lógica de bajo nivel que el resto del sistema consumiría sin
excepción: el cliente Supabase singleton, las 7 funciones de utilidad
(formateo, logging, sanitización, retry, estados de oferta, slugs, storage,
WhatsApp) y los 2 servicios de consulta a la base de datos. Ningún hook ni
contexto podía existir sin esta capa. La decisión más crítica era la
sanitización: DOMPurify con ALLOWED_TAGS vacío, sin excepciones.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  2h  supabaseClient.js: singleton con storageKey 'I Nova SV-auth' (evita conflictos
      en desarrollo local con otras apps Supabase en el mismo dominio)
      → src/lib/supabaseClient.js

  1h  formatPrice.js: Intl.NumberFormat singleton en-US / USD
      → src/utils/formatPrice.js
      Notas: Siempre usar este formatter, nunca formatear precios manualmente

  4h  logger.js: console en desarrollo, INSERT a system_logs en producción
      con batch de 5 segundos
      → src/utils/logger.js
      Notas: Batch evita un write por cada error individual

  2h  sanitize.js: sanitizeInput() con DOMPurify ALLOWED_TAGS:[] — elimina TODO el HTML
      → src/utils/sanitize.js
      Notas: Ni siquiera <b> está permitido

  2h  sanitize.js: validateUrl() — bloquea javascript:, data:, vbscript: (case-insensitive)
      → src/utils/sanitize.js

  1h  sanitize.js: validateUUID() con regex UUID v4 estricto
      → src/utils/sanitize.js
      Notas: Validar antes de cualquier cláusula .in() en Supabase

  3h  supabaseRetry.js: withSupabaseRetry() con backoff 1s → 2s → falla
      → src/utils/supabaseRetry.js
      Notas: Solo para escrituras críticas, no para lecturas

  3h  productUtils.js: getOfferStatus() retorna 'activa' | 'programada' | 'expirada' | null
      → src/utils/productUtils.js
      Notas: Única fuente de verdad — todos los componentes usan esta función

  2h  slug.js: generateSlug() con normalización NFD, manejo de emojis,
      fallback a timestamp si el resultado es vacío (LOW-003)
      → src/utils/slug.js

  2h  storage.js: extractFilename() que valida hostname .supabase.co antes de extraer
      → src/utils/storage.js
      Notas: HIGH-002 — URLs externas se ignoran completamente

  4h  whatsapp.js: buildWhatsAppUrl() con truncamiento inteligente hasta ~2000 chars
      → src/utils/whatsapp.js
      Notas: Elimina items del final e indica cuántos quedan fuera. Es el fallback
             local cuando la RPC generate_whatsapp_message falla.

  1h  constants.js: PRODUCT_SELECT_COLUMNS — listado explícito de columnas, nunca SELECT *
      → src/config/constants.js
      Notas: MED-003: superficie de datos controlada

  1h  constants.js: MAX_CART_QUANTITY (50), MAX_CART_ITEMS (50), CART_EXPIRY_DAYS (7),
      PRICE_STALE_FAILURES (3), PRICE_STALE_MINUTES (5)
      → src/config/constants.js

  1h  constants.js: WHATSAPP_NUMBER, TURNSTILE_SITE_KEY, BASE_URL desde import.meta.env
      → src/config/constants.js

  8h  productService.js: getProductsQuery() — query builder con soporte a categoría,
      búsqueda texto (escape SQL wildcards %), rango precios, solo ofertas activas
      (MED-010), favoritos (UUID validation + limit 100, SEC-009/PERF-002),
      paginación, ordenamiento múltiple, siempre is_active=true
      → src/services/productService.js
      Notas: No ejecuta la query, solo la construye para composición

  2h  productService.js: getProductBySlug() — query individual con is_active=true
      → src/services/productService.js

  2h  categoryService.js: getCategories() con select explícito ordenado por nombre
      → src/services/categoryService.js

  3h  database.types.ts: tipos TypeScript generados del schema de Supabase
      → src/types/database.types.ts
      Notas: Actualizar cada vez que se añada una columna a products
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] El cliente Supabase se instancia una sola vez en toda la app
  [ ] formatPrice() produce '\$1,234.56' correctamente
  [ ] sanitizeInput() elimina todo el HTML incluyendo etiquetas "benignas"
  [ ] validateUrl() rechaza javascript:, data: y vbscript: en cualquier capitalización
  [ ] withSupabaseRetry() reintenta con backoff 1s → 2s → falla al tercero
  [ ] buildWhatsAppUrl() siempre produce una URL que cabe en ~2000 chars
  [ ] getProductsQuery() construye queries con todos los filtros, escapando wildcards SQL
  [ ] Nunca aparece SELECT * en ningún query de la capa de servicios


════════════════════════════════════════════════════════════════════════════════
SPRINT 3 — Hooks y Contextos Core
Semana 3 (Días 11–15) | Lunes – Viernes | 41 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir los 6 hooks personalizados y los 3 contextos fundamentales:
ConfirmContext, SettingsContext y AuthContext. El AuthContext era la pieza más
delicada de todo el proyecto: el desacoplamiento entre onAuthStateChange y el
fetch del perfil no era un detalle de implementación sino una decisión de
arquitectura no negociable para evitar deadlocks documentados del SDK de
Supabase.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  1h  useDebounce.js: hook genérico de debounce, default 300ms
      → src/hooks/useDebounce.js

  3h  useTheme.js: dark mode con persistencia 'I Nova SV_theme', migración de key
      legacy 'theme-preference', clase 'dark' en <html>
      → src/hooks/useTheme.js
      Notas: Retorna { isDarkMode, toggleTheme }

  3h  useBodyScrollLock.js: contador global module-level lockCount — overflow:hidden
      en body solo cuando lockCount > 0, permite modales anidados sin conflictos
      → src/hooks/useBodyScrollLock.js

  3h  useModal.js: modalRef con manejo de Escape y click en overlay, focus trap básico
      → src/hooks/useModal.js
      Notas: MED-012 — documentar que Tab cycling es deuda técnica conocida y acotada

  5h  useCategories.js: caché a nivel de módulo con TTL 10 minutos, invalidación manual
      vía window.dispatchEvent('categories-updated'), comparte promesa entre componentes
      → src/hooks/useCategories.js
      Notas: Caché es per-tab. Cambios del admin en otra pestaña no se ven hasta TTL

  7h  useProducts.js: useProducts(options) — lista paginada con filtros,
      AbortController para cancelar requests obsoletos (MED-002), estabilización
      de arrays con useRef para evitar re-renders infinitos
      → src/hooks/useProducts.js
      Notas: Retorna { products, loading, error, refetch, totalCount }

  3h  useProducts.js: useProduct(slug) — hook para producto individual
      → src/hooks/useProducts.js
      Notas: Mismo archivo, retorna { product, loading, error, refetch }

  4h  ConfirmContext.jsx: confirm(options) retorna Promise<boolean>
      → src/context/ConfirmContext.jsx
      Notas: Options acepta { title, message, confirmText, cancelText, type }
             Types: danger / warning / info
             Patrón: el código que espera confirmación parece síncrono

  6h  SettingsContext.jsx: fetch inicial + suscripción Realtime a postgres_changes UPDATE,
      validación de payload (MED-005), debounce 500ms (MED-006)
      → src/context/SettingsContext.jsx
      Notas: Expone { settings, loading, fetchSettings }

  3h  AuthContext.jsx: caché en sessionStorage (I Nova SV_user, I Nova SV_profile,
      I Nova SV_auth_cache_time) con TTL 1 hora
      → src/context/AuthContext.jsx

  3h  AuthContext.jsx: Effect 1 — getSession() + onAuthStateChange
      → src/context/AuthContext.jsx
      Notas: CRÍTICO — solo operaciones síncronas dentro del callback.
             NUNCA fetchear el perfil aquí. Causa deadlocks con el SDK.

  4h  AuthContext.jsx: Effect 2 DESACOPLADO — fetchProfile(userId) con
      currentUserIdRef como guard contra race conditions, auto-create de
      perfil con role='user' si no existe
      → src/context/AuthContext.jsx

  3h  AuthContext.jsx: signInWithGoogle(), signOut() con limpieza controlada
      de sessionStorage (LOW-002), showAuthModal(context), hideAuthModal()
      → src/context/AuthContext.jsx
      Notas: signOut limpia solo claves de sesión, NUNCA el carrito ni favoritos

  2h  AuthContext.jsx: auth modal contextual con mensajes dinámicos por trigger
      ('cart', 'favorites', 'contact')
      → src/context/AuthContext.jsx
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 41 horas

DEFINICIÓN DE DONE
  [ ] useBodyScrollLock maneja modales anidados sin que lockCount llegue a negativo
  [ ] useCategories comparte la misma promesa entre múltiples componentes
  [ ] useProducts cancela requests obsoletos con AbortController al cambiar filtros
  [ ] ConfirmContext.confirm() resuelve la Promise correctamente
  [ ] SettingsContext actualiza el estado al recibir Realtime con debounce 500ms
  [ ] AuthContext NO fetchea el perfil dentro de onAuthStateChange (verificación crítica)
  [ ] La caché de sessionStorage se hidrata al recargar sin consulta de red visible
  [ ] currentUserIdRef descarta respuestas de fetchProfile obsoletas ante cambios rápidos


════════════════════════════════════════════════════════════════════════════════
SPRINT 4 — Gestión de Estado: Carrito y Favoritos
Semana 4 (Días 16–20) | Lunes – Viernes | 41 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir los dos contextos de estado más complejos del sistema: CartContext
y FavoritesContext. El carrito concentraba más reglas de negocio críticas que
cualquier otro componente: localStorage como fuente primaria, sync con
debounce a Supabase, revalidación periódica de precios, tracking de fallos
para el estado stale, expiración automática a 7 días, sincronización entre
pestañas y los límites duros justificados por el límite de URL de WhatsApp.
También se configuraban el routing completo y los headers de seguridad.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  4h  CartContext.jsx: addToCart, removeFromCart, updateQuantity, clearCart
      con escritura inmediata en localStorage (I Nova SV_cart) como fuente primaria
      → src/context/CartContext.jsx

  3h  CartContext.jsx: sync con Supabase (user_carts) con debounce 1500ms
      usando withSupabaseRetry() — solo cuando hay usuario logueado
      → src/context/CartContext.jsx

  4h  CartContext.jsx: refreshCartPrices() — revalidación vs Supabase cada 60 segundos
      solo si document.hidden === false, elimina items con is_active=false
      → src/context/CartContext.jsx

  3h  CartContext.jsx: arePricesStale — tracking de fallos consecutivos (HIGH-004):
      si falla 3+ veces o pasan 5+ minutos sin refresh exitoso, activar flag
      y bloquear checkout. Expone isRefreshingPrices y arePricesStale.
      → src/context/CartContext.jsx

  2h  CartContext.jsx: expiración automática a los 7 días de inactividad
      (I Nova SV_cart_timestamp) con notificación toast
      → src/context/CartContext.jsx

  2h  CartContext.jsx: sincronización multi-tab vía StorageEvent en window
      → src/context/CartContext.jsx

  2h  CartContext.jsx: merge guest-first al login — local no vacío → sube a DB;
      local vacío → carga desde DB
      → src/context/CartContext.jsx

  1h  CartContext.jsx: límites duros MAX_CART_QUANTITY y MAX_CART_ITEMS
      con validación en addToCart y updateQuantity
      → src/context/CartContext.jsx

  3h  FavoritesContext.jsx: sync bidireccional localStorage / Supabase
      → src/context/FavoritesContext.jsx

  2h  FavoritesContext.jsx: merge al login — unión Set de IDs locales e IDs DB,
      insert en DB de los que solo estaban en local
      → src/context/FavoritesContext.jsx

  2h  FavoritesContext.jsx: isFavorite() con useMemo(new Set) para lookup O(1),
      toggleFavorite() con optimismo + sync DB
      → src/context/FavoritesContext.jsx

  1h  FavoritesContext.jsx: toggleFavorite() rechaza silenciosamente sin usuario (HIGH-ST01)
      → src/context/FavoritesContext.jsx

  5h  App.jsx: routing completo con React.lazy() para todas las páginas,
      Suspense wrappers, ErrorBoundary por ruta
      → src/App.jsx

  2h  main.jsx: jerarquía de providers — HelmetProvider > BrowserRouter > Auth >
      Confirm > Settings > Cart > Favorites > App
      → src/main.jsx
      Notas: REGLA INQUEBRANTABLE — Auth debe ser el más externo

  4h  vercel.json: CSP header con whitelist estricta (script-src, style-src, img-src
      con *.supabase.co y lh3.googleusercontent.com, connect-src con wss://*.supabase.co,
      frame-src para Turnstile)
      → vercel.json

  1h  vercel.json: X-Frame-Options DENY, X-Content-Type-Options nosniff,
      Referrer-Policy strict-origin-when-cross-origin
      → vercel.json

  2h  vercel.json: cache assets inmutables 1 año, HTML sin cache, SPA fallback
      → vercel.json
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 41 horas

DEFINICIÓN DE DONE
  [ ] Agregar producto sin sesión persiste en localStorage sin errores
  [ ] Revalidación se ejecuta cada 60s solo con pestaña visible
  [ ] Después de 3 fallos consecutivos, arePricesStale se activa
  [ ] El carrito se sincroniza entre dos pestañas vía StorageEvent
  [ ] Simular 7 días de inactividad limpia el carrito con toast de notificación
  [ ] Al login con carrito local, se sube a Supabase; sin carrito, se descarga
  [ ] toggleFavorite sin sesión no hace nada y no lanza errores
  [ ] npm run build genera chunks vendor/ui/modules sin errores
  [ ] Los headers del vercel.json no bloquean ningún recurso legítimo


════════════════════════════════════════════════════════════════════════════════
SPRINT 5 — Layout e Infraestructura de Componentes
Semana 5 (Días 21–25) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir toda la infraestructura visual del sistema: ErrorBoundary, los
componentes utilitarios de UI, el Footer, AdminRoute, ShopLayout, el Navbar
completo con su bottom bar mobile y el AdminLayout. Al final del sprint, la
estructura visual debía ser navegable aunque las páginas individuales aún no
existieran.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  3h  ErrorBoundary.jsx: captura errores de render, UI de recuperación con 2 opciones.
      Limpieza controlada (LOW-004): solo sessionStorage y keys volátiles,
      NUNCA I Nova SV_cart ni I Nova SV_favorites
      → src/components/ErrorBoundary.jsx

  2h  Logo.jsx: icono Material Symbols + texto 'I Nova SV', versiones sm/md/lg
      → src/components/Logo.jsx

  2h  ui/ThemeToggle.jsx: botón con iconos dark_mode/light_mode, tooltip descriptivo
      → src/components/ui/ThemeToggle.jsx

  2h  ui/UserAvatar.jsx: fallback avatar_url → picture → ui-avatars.com con iniciales.
      referrerPolicy='no-referrer' para evitar leaks de URL
      → src/components/ui/UserAvatar.jsx

  3h  ui/CookieBanner.jsx: spring animation Framer Motion, delay 1s,
      persistencia en localStorage 'cookie_consent', link a /privacy
      → src/components/ui/CookieBanner.jsx

  3h  Footer.jsx: links legales, links de navegación, SocialIcons solid, copyright
      → src/components/Footer.jsx

  3h  SocialIcons.jsx: variante 'solid' (footer) y 'glass' (ContactPage)
      con Instagram, Facebook, WhatsApp, Email (solo glass)
      → src/components/SocialIcons.jsx

  2h  AdminRoute.jsx: verifica isAdmin. Si no es admin → NotFoundPage (no redirect).
      Si no hay sesión → redirect /
      → src/components/AdminRoute.jsx
      Notas: Mostrar 404 en vez de 403 oculta la existencia del panel

  3h  StructuredData.jsx: JSON-LD via Helmet — Organization + Product.
      Sanitiza con .replace(/</, '\\u003c') para prevenir script injection
      → src/components/StructuredData.jsx

  5h  layout/ShopLayout.jsx: Navbar sticky + CartDrawer overlay + ErrorBoundary +
      Suspense + Footer. URL canónica dinámica, StructuredData Organization,
      pb-16 md:pb-0 para bottom bar mobile
      → src/components/layout/ShopLayout.jsx

  5h  Navbar.jsx desktop: logo, links (Inicio/Catálogo/Contacto), buscador,
      ThemeToggle, UserAvatar, badge carrito animado (pulseSubtle), badge favoritos
      → src/components/Navbar.jsx

  4h  Navbar.jsx mobile: header simplificado + bottom bar fija con 5 iconos
      (Inicio, Catálogo, Buscar, Favoritos, Cuenta). Botones sin sesión abren
      LoginModal con contexto
      → src/components/Navbar.jsx

  3h  admin/AdminLayout.jsx desktop: sidebar colapsable + header con avatar
      y ThemeToggle + área scrollable. shrink-0 en header (LOW-011)
      → src/I Nova SV/admin/AdminLayout.jsx

  2h  admin/AdminLayout.jsx: AdminFooterBar mobile con 5 iconos
      (Dashboard, Productos, Categorías, Mensajes, Ajustes)
      → src/I Nova SV/admin/AdminLayout.jsx
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] ShopLayout renderiza Navbar + Footer correctamente en todos los breakpoints
  [ ] La bottom bar mobile tiene 5 iconos y no se superpone al contenido (pb-16)
  [ ] ThemeToggle cambia la clase 'dark' en <html> y persiste entre recargas
  [ ] UserAvatar nunca muestra broken image (siempre hay fallback)
  [ ] CookieBanner aparece solo si no hay consentimiento, con spring animation
  [ ] AdminRoute muestra 404 (no redirect) cuando el usuario no es admin
  [ ] El JSON-LD de Organization es válido según el validador de Schema.org
  [ ] AdminLayout tiene sidebar colapsable en desktop y AdminFooterBar en mobile


════════════════════════════════════════════════════════════════════════════════
SPRINT 6 — Carrito, Modales y Filtros
Semana 6 (Días 26–30) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir los componentes de interacción más complejos de la interfaz:
el CartDrawer con su lógica completa de checkout, los 4 modales del sistema,
el ConfirmDialog y los 2 componentes de filtros. Al final del sprint, el flujo
de carrito debía funcionar de extremo a extremo incluyendo la generación del
mensaje de WhatsApp.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  4h  CartDrawer.jsx: drawer lateral derecho, overlay blur, max-w-md,
      lista de items con imagen/nombre/controles de cantidad/precios
      → src/components/CartDrawer.jsx
      Notas: 363 líneas — componente más complejo de la capa pública

  3h  CartDrawer.jsx: indicadores de revalidación — spinner durante
      refreshCartPrices, warning si arePricesStale, bloqueo del checkout
      → src/components/CartDrawer.jsx

  3h  CartDrawer.jsx: checkout WhatsApp — llamada a RPC generate_whatsapp_message
      → URL wa.me → window.open. Fallback a buildWhatsAppUrl() si RPC falla
      → src/components/CartDrawer.jsx

  2h  CartDrawer.jsx: animación translateX(100%) → translateX(0),
      useBodyScrollLock al abrir, refreshCartPrices() automático al abrir
      → src/components/CartDrawer.jsx

  3h  ConfirmDialog.jsx: 3 tipos — danger (botón rojo), warning (botón ámbar),
      info (botón azul). Consumidor de ConfirmContext.
      → src/components/ConfirmDialog.jsx

  3h  LoginModal.jsx: mensajes dinámicos por trigger (cart/favorites/contact),
      botón Google OAuth
      → src/components/LoginModal.jsx

  5h  SearchModal.jsx: input con useDebounce, búsqueda real-time contra
      productService, sugerencias populares hardcoded cuando input vacío,
      cards compactas con imagen/nombre/precio
      → src/components/SearchModal.jsx
      Notas: 148 líneas

  4h  ShareModal.jsx: Clipboard API + fallback manual, botón WhatsApp,
      navigator.share nativo si disponible
      → src/components/ShareModal.jsx
      Notas: 167 líneas. Tres mecanismos según capacidades del browser

  5h  FavoritesModal.jsx: productos cargados desde Supabase por IDs locales,
      limpieza automática de IDs inválidos que ya no corresponden a productos activos
      → src/components/FavoritesModal.jsx
      Notas: 151 líneas

  3h  FilterSidebar.jsx: panel desktop con checkboxes de categorías y toggle
      'Solo ofertas'. Solo visible desde md+
      → src/components/FilterSidebar.jsx

  4h  MobileFilterDrawer.jsx: drawer inferior mobile con selector de orden,
      categorías como pills scrollables, toggle ofertas, botones Limpiar/Aplicar
      → src/components/MobileFilterDrawer.jsx
      Notas: 133 líneas
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] CartDrawer abre/cierra correctamente bloqueando el scroll sin conflictos
  [ ] El checkout genera una URL de WhatsApp válida con el mensaje completo
  [ ] Si arePricesStale es true, el botón de checkout está deshabilitado
  [ ] SearchModal busca con debounce y muestra sugerencias cuando el input está vacío
  [ ] FavoritesModal limpia IDs de productos eliminados o desactivados
  [ ] ConfirmDialog resuelve la Promise con true o false según la elección del usuario
  [ ] ShareModal copia la URL al clipboard y abre WhatsApp con el texto correcto
  [ ] Los filtros de categoría y oferta funcionan desde FilterSidebar y MobileFilterDrawer


════════════════════════════════════════════════════════════════════════════════
SPRINT 7 — Componentes de Producto y Páginas Core
Semana 7 (Días 31–35) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir el OfferCountdown con su arquitectura de tick compartido, el
ProductCard con toda la lógica de estados de oferta, y las dos páginas más
visitadas del sistema: HomePage y CatalogPage. La CatalogPage era
especialmente importante por su sincronización bidireccional con los
searchParams de la URL, haciendo el estado del catálogo completamente
compartible.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  4h  OfferCountdown.jsx: arquitectura de tick compartido a nivel de módulo —
      tickCallbacks Map único, un solo setInterval(1000ms) alimenta TODOS los
      countdowns activos en la página. Suscripción/cancelación al montar/desmontar.
      → src/components/OfferCountdown.jsx
      Notas: 161 líneas. 20 productos con oferta = 1 solo intervalo, no 20

  4h  OfferCountdown.jsx: bloques días/horas/minutos/segundos con countdownPulse,
      badge de descuento porcentual, 3 estados: activo / inminente <1h / expirado
      → src/components/OfferCountdown.jsx

  4h  ProductCard.jsx: React.memo, imagen aspect-[4/5] hover scale 1.05,
      badge de oferta Math.round((1-price/old_price)*100)%,
      badge 'Próxima oferta' ámbar con icono schedule
      → src/components/ProductCard.jsx

  4h  ProductCard.jsx: OfferCountdown integrado, botón favorito con
      showAuthModal('favorites'), botón carrito con showAuthModal('cart'),
      precio actual + precio anterior tachado, link al slug
      → src/components/ProductCard.jsx

  3h  HomePage.jsx: sección Hero — imagen desde settings.hero_image_url,
      título/subtítulo dinámicos, CTA 'Ver Catálogo'
      → src/I Nova SV/HomePage.jsx

  3h  HomePage.jsx: sección Especialidades — grid de categorías con iconos
      Material Symbols, cards navegables a /catalogo?category=slug
      → src/I Nova SV/HomePage.jsx

  2h  HomePage.jsx: sección Nuestra Historia — texto narrativo con imagen lateral
      → src/I Nova SV/HomePage.jsx

  3h  HomePage.jsx: sección Productos Destacados — grid de ProductCard con
      productos recientes y ofertas activas
      → src/I Nova SV/HomePage.jsx

  5h  CatalogPage.jsx: sincronización bidireccional con URL searchParams
      (?category, ?search, ?sort, ?page) — cualquier cambio de filtro actualiza la URL
      → src/I Nova SV/CatalogPage.jsx
      Notas: Estado compartible. El botón de atrás restaura filtros anteriores.

  4h  CatalogPage.jsx: grid 2/3/4 columnas, FilterSidebar (desktop),
      MobileFilterDrawer (mobile), paginación offset con Anterior/Siguiente
      → src/I Nova SV/CatalogPage.jsx

  3h  CatalogPage.jsx: loading con skeletons shimmer, empty state con ilustración,
      error state
      → src/I Nova SV/CatalogPage.jsx
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] Con 10 ProductCards con oferta activa, existe exactamente 1 setInterval en el módulo
  [ ] El countdown se cancela al desmontar los componentes, sin memory leaks
  [ ] ProductCard con React.memo no se re-renderiza cuando cambia el carrito de otro producto
  [ ] Agregar al carrito desde ProductCard abre el auth modal si no hay sesión
  [ ] Cambiar el filtro en CatalogPage actualiza la URL y el grid simultáneamente
  [ ] Copiar la URL con filtros y abrirla en otra pestaña produce el mismo estado visual
  [ ] El botón de atrás del navegador restaura el estado anterior de filtros
  [ ] Los skeletons animados aparecen durante cada carga de nueva página de resultados


════════════════════════════════════════════════════════════════════════════════
SPRINT 8 — Páginas Públicas Completas
Semana 8 (Días 36–40) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Completar todas las páginas públicas restantes: ProductDetailPage con galería
y productos relacionados, ContactPage con su triple protección anti-bot
(Turnstile + honeypot + rate limiting), y las páginas legales. También se
completó la configuración SEO de todas las páginas con meta tags, Open Graph
y JSON-LD Product.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  3h  ProductDetailPage.jsx: galería — imagen principal + thumbnails clickeables
      del array images[], cambio de imagen principal al hacer click
      → src/I Nova SV/ProductDetailPage.jsx

  4h  ProductDetailPage.jsx: nombre, precio, descripción, categoría, tags como chips,
      botón agregar al carrito con selector de cantidad, botón compartir
      → src/I Nova SV/ProductDetailPage.jsx

  3h  ProductDetailPage.jsx: oferta activa (precio anterior tachado + badge +
      OfferCountdown) y oferta programada (badge 'Próxima oferta' + 'Inicia en...')
      → src/I Nova SV/ProductDetailPage.jsx

  2h  ProductDetailPage.jsx: nota personalizada — textarea cuyo contenido se incluye
      en el payload del carrito y luego en el mensaje de WhatsApp
      → src/I Nova SV/ProductDetailPage.jsx

  2h  ProductDetailPage.jsx: productos relacionados — grid de ProductCard de la misma
      categoría, excluyendo el producto actual
      → src/I Nova SV/ProductDetailPage.jsx

  2h  ProductDetailPage.jsx: StructuredData Product (nombre, precio, imagen, sku,
      availability InStock), meta tags dinámicos title/description/OG
      → src/I Nova SV/ProductDetailPage.jsx

  3h  ContactPage.jsx: campos nombre, email, asunto (select), mensaje.
      Validación y sanitización con sanitizeInput() antes de procesar
      → src/I Nova SV/ContactPage.jsx
      Notas: 348 líneas — página con más capas de seguridad del sistema

  3h  ContactPage.jsx: Cloudflare Turnstile widget invisible, obtención de token
      antes del submit, incluir en el INSERT a contact_messages
      → src/I Nova SV/ContactPage.jsx

  2h  ContactPage.jsx: honeypot — campo 'website' con opacity:0, position:absolute.
      Contenido = bot detectado, submit descartado silenciosamente
      → src/I Nova SV/ContactPage.jsx

  2h  ContactPage.jsx: rate limiting — localStorage 'last_contact_sent' TTL 60s
      → src/I Nova SV/ContactPage.jsx

  3h  ContactPage.jsx: flujo completo — validar → honeypot → rate limit → token
      Turnstile → INSERT → reset formulario + widget → notificación éxito
      → src/I Nova SV/ContactPage.jsx

  2h  NotFoundPage.jsx: 404 minimalista con noindex/nofollow en meta robots
      → src/I Nova SV/NotFoundPage.jsx

  2h  PrivacyPage.jsx: política de privacidad con prose Tailwind, meta tags
      → src/I Nova SV/PrivacyPage.jsx

  2h  TermsPage.jsx: términos y condiciones con prose Tailwind, meta tags
      → src/I Nova SV/TermsPage.jsx

  4h  SEO meta tags: react-helmet-async en todas las páginas públicas —
      title único, description, og:title, og:description, og:image, og:url
      → Todas las páginas en src/I Nova SV/

  3h  QA: prueba integral del flujo público completo — navegación → producto →
      carrito → WhatsApp, en mobile y desktop, dark y light mode
      → (QA manual)
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] La galería cambia la imagen principal al hacer click en los thumbnails
  [ ] La nota personalizada aparece correctamente en el mensaje de WhatsApp
  [ ] El honeypot rechaza silenciosamente envíos donde el campo 'website' tiene contenido
  [ ] El rate limiting impide un segundo envío en menos de 60 segundos
  [ ] El widget Turnstile se resetea correctamente tras un envío exitoso
  [ ] NotFoundPage tiene noindex en meta robots
  [ ] El JSON-LD Product es válido en el Rich Results Test de Google
  [ ] Todas las páginas tienen título único, description contextual y og:image


════════════════════════════════════════════════════════════════════════════════
SPRINT 9 — Panel de Administración Completo
Semana 9 (Días 41–45) | Lunes – Viernes | 44 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Construir el panel de administración completo con sus 6 páginas, el
ProductModal (el componente más complejo del sistema con 524 líneas y
validaciones cruzadas entre campos), y el ImageUploader con compresión Canvas
y eliminación automática de metadata EXIF. Al final del sprint, la
administradora debía poder gestionar el 100% del contenido de la tienda sin
acceder directamente a Supabase.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  4h  DashboardPage.jsx: RPC get_dashboard_data → StatCards para cada métrica
      (productos, categorías, ofertas activas, mensajes no leídos, favoritos, usuarios).
      Click en StatCard abre StatDetailModal.
      → src/I Nova SV/admin/DashboardPage.jsx

  4h  DashboardPage.jsx: widgets — RecentProducts, CategoryChart, TopFavorites,
      RecentMessages
      → src/I Nova SV/admin/DashboardPage.jsx

  4h  ProductsPage.jsx: listado con búsqueda debounce 500ms, filtro por categoría,
      filtro por ofertas activas, paginación 25/página
      → src/I Nova SV/admin/ProductsPage.jsx

  4h  ProductsPage.jsx: eliminación individual con ConfirmDialog (danger),
      eliminación masiva con checkboxes, cleanup de Storage — solo filenames
      de URLs *.supabase.co (HIGH-002)
      → src/I Nova SV/admin/ProductsPage.jsx

  4h  ProductModal.jsx: nombre, slug (auto-generado + editable + verificación
      unicidad en DB), descripción, precio, precio anterior
      → src/components/admin/ProductModal.jsx
      Notas: 524 líneas — componente admin más complejo del sistema

  4h  ProductModal.jsx: lógica de ofertas — duración → offer_ends_at,
      offer_starts_at opcional → programada, duración 0 → sin vencimiento,
      vaciar old_price → limpiar ambas fechas. Validación: old_price > price
      → src/components/admin/ProductModal.jsx

  4h  ProductModal.jsx: categoría (select), imágenes (ImageUploader + URL manual),
      tags como chips con Enter, toggle activo/inactivo
      → src/components/admin/ProductModal.jsx

  3h  ImageUploader.jsx: selección click/drag, validación tipo y tamaño (5MB máx),
      compresión Canvas → WebP 80%, máx 1200px dimensión mayor
      → src/components/admin/ImageUploader.jsx
      Notas: LOW-009 — Canvas elimina automáticamente toda la metadata EXIF/GPS

  2h  ImageUploader.jsx: upload al bucket product-images, retorna publicUrl,
      estado de progreso
      → src/components/admin/ImageUploader.jsx

  4h  CategoriesPage.jsx: CRUD completo, selector de icono Material Symbols,
      preview del ícono. Al guardar dispara 'categories-updated' para invalidar caché.
      → src/I Nova SV/admin/CategoriesPage.jsx

  3h  MessagesPage.jsx: listado con indicador leído/no leído, marcar como leído,
      eliminación con ConfirmDialog
      → src/I Nova SV/admin/MessagesPage.jsx

  2h  FavoritesPage.jsx: ranking de productos más favoriteados, conteo descendente
      → src/I Nova SV/admin/FavoritesPage.jsx

  3h  SettingsPage.jsx: StoreSettingsForm con todos los campos de store_settings
      → src/I Nova SV/admin/SettingsPage.jsx
      Notas: Al guardar, Realtime propaga el cambio a todas las pestañas abiertas

  3h  SettingsPage.jsx: gestión de roles (listar usuarios, cambiar role),
      StoreCategoryImagesForm
      → src/I Nova SV/admin/SettingsPage.jsx
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 44 horas

DEFINICIÓN DE DONE
  [ ] DashboardPage muestra stats correctos obtenidos de la RPC
  [ ] ProductModal rechaza guardar cuando old_price <= price
  [ ] El slug se verifica como único en DB; slugs duplicados muestran error claro
  [ ] Al especificar duración + old_price, offer_ends_at se calcula correctamente
  [ ] Al vaciar old_price, offer_ends_at y offer_starts_at se limpian automáticamente
  [ ] ImageUploader produce archivos WebP sin metadata EXIF detectable
  [ ] La eliminación masiva de productos elimina sus imágenes de Supabase Storage
  [ ] Guardar en SettingsPage propaga cambios al catálogo público sin recargar
  [ ] Guardar una categoría invalida el caché de useCategories en la misma pestaña


════════════════════════════════════════════════════════════════════════════════
SPRINT 10 — SEO, Seguridad, Testing y Deploy
Semana 10 (Días 46–50) | Lunes – Viernes | 40 horas
════════════════════════════════════════════════════════════════════════════════

OBJETIVO
Sprint de cierre y aseguramiento de calidad. Auditorías de SEO, seguridad y
accesibilidad; setup del framework de tests con casos críticos en Vitest y
Cypress; configuración del entorno de producción en Vercel con las variables
correctas; y primer deploy a producción con verificación de que todos los
sistemas funcionaban en el entorno real.

TAREAS
─────────────────────────────────────────────────────────────────────────────
  3h  Auditoría SEO: verificar título único, description, canonical, OG tags
      y JSON-LD válido en todas las páginas. Usar Rich Results Test de Google.
      → Todas las páginas públicas

  3h  Auditoría de seguridad: verificar CSP en vercel.json, probar que ninguna
      página carga recursos fuera de la whitelist
      → vercel.json

  3h  Auditoría de accesibilidad: contraste en light y dark mode, alt en imágenes,
      roles ARIA en modales, navegación por teclado en flujos principales
      → Componentes UI
      Notas: MED-012 — documentar Tab cycling como deuda técnica acotada

  2h  Setup de Vitest: vitest.config.js, jsdom, @testing-library/react
      → vitest.config.js

  3h  Tests unitarios: productUtils.js — getOfferStatus() con los 3 estados,
      fechas límite y combinaciones de campos
      → src/utils/productUtils.test.js

  3h  Tests unitarios: whatsapp.js — truncamiento inteligente, mensaje siempre
      < 2000 chars, indicador correcto de productos truncados
      → src/utils/whatsapp.test.js

  2h  Tests unitarios: sanitize.js — eliminación de HTML, bloqueo de
      javascript:/data:/vbscript:, rechazo de UUIDs inválidos
      → src/utils/sanitize.test.js

  1h  Tests unitarios: slug.js — caracteres especiales, emojis, fallback a timestamp
      → src/utils/slug.test.js

  2h  Setup de Cypress: cypress.config.js, fixtures, comandos custom,
      variables de entorno de test
      → cypress/

  4h  Test E2E Cypress: flujo completo de compra — catálogo → filtrar →
      detalle → carrito → CartDrawer → link WhatsApp generado correctamente
      → cypress/e2e/purchase_flow.cy.js

  3h  Test E2E Cypress: flujo de autenticación — click en favorito sin sesión →
      LoginModal con contexto correcto → login (mock) → favorito guardado
      → cypress/e2e/auth_flow.cy.js

  4h  Test E2E Cypress: CRUD admin — login como admin → crear producto →
      verificar en catálogo → editar oferta → verificar countdown → eliminar
      → cypress/e2e/admin_crud.cy.js

  2h  Configuración Vercel Dashboard: variables de entorno de producción,
      Node 18.x, output directory 'dist'
      → Vercel Dashboard

  2h  Primer deploy a producción: verificar build, SPA fallback, headers activos,
      Supabase acepta el dominio de producción en Auth providers
      → Vercel / Supabase Dashboard

  2h  Pruebas de rendimiento: chunk sizes, Lighthouse en producción
      (objetivo ≥ 90 en Performance, Accessibility, Best Practices y SEO),
      verificar cache headers correctos en assets
      → (QA final)

  1h  Revisión final: todos los comentarios HIGH-*, MED-*, LOW-* del código fuente
      tienen entrada en el glosario de remediaciones de la documentación técnica
      → Documentación
─────────────────────────────────────────────────────────────────────────────
  TOTAL: 40 horas

DEFINICIÓN DE DONE
  [ ] Tests unitarios de productUtils, whatsapp, sanitize y slug pasan al 100%
  [ ] Test E2E del flujo de compra pasa sin intervención manual
  [ ] Lighthouse en producción ≥ 90 en Performance, Accessibility, Best Practices y SEO
  [ ] Los headers de seguridad están activos y verificables en producción
  [ ] La CSP bloquea scripts externos no whitelisted y no bloquea recursos legítimos
  [ ] Login con Google OAuth funciona en el dominio de producción
  [ ] El SPA fallback funciona: /catalogo y /admin devuelven la app, no un 404 del servidor
  [ ] Todos los comentarios HIGH-*, MED-*, LOW-* tienen entrada en el glosario


================================================================================
RESUMEN GENERAL DEL PROYECTO
================================================================================

  Sprint  Semana   Días    Horas   Enfoque principal
  ──────  ───────  ──────  ──────  ────────────────────────────────────────────
    1     Sem. 1   5 días   40h    Infraestructura, DB schema, RLS, RPCs, Storage
    2     Sem. 2   5 días   40h    Utilities, services, types TypeScript
    3     Sem. 3   5 días   41h    6 hooks, ConfirmContext, SettingsContext, AuthContext
    4     Sem. 4   5 días   41h    CartContext, FavoritesContext, App.jsx, vercel.json
    5     Sem. 5   5 días   40h    Layout, Navbar, AdminLayout, UI utils
    6     Sem. 6   5 días   40h    CartDrawer, 4 modales, 2 componentes de filtros
    7     Sem. 7   5 días   40h    OfferCountdown, ProductCard, HomePage, CatalogPage
    8     Sem. 8   5 días   40h    ProductDetailPage, ContactPage, páginas legales, SEO
    9     Sem. 9   5 días   44h    6 páginas admin, ProductModal, ImageUploader
   10     Sem. 10  5 días   40h    Auditorías, Vitest, Cypress E2E, deploy producción
  ──────  ───────  ──────  ──────  ────────────────────────────────────────────
  TOTAL            50 días  406h   1 desarrollador · ~2.5 meses calendario

================================================================================`;

const graphicContent = `I Nova SV - descripción Gráfica

## Naturaleza y propósito del sistema

I Nova SV es una aplicación web de catálogo comercial construida para un negocio de venta directa en El Salvador, cuyo modelo de operación se aleja deliberadamente de lo que se entiende por ecommerce convencional. No existe pasarela de pagos, no existe gestión de inventario, y el concepto de stock es irrelevante para su funcionamiento: todos los productos se consideran disponibles por definición, porque el negocio opera por pedido y el cierre de cada venta ocurre fuera del sistema, a través de una conversación en WhatsApp. La aplicación existe para un propósito acotado y bien definido: permitir que un visitante explore un catálogo visual, acumule productos en un carrito, y genere con un solo gesto un mensaje pre-formateado que abre WhatsApp con el pedido completo listo para enviar. Todo lo que ocurre después de ese momento — la confirmación de disponibilidad, la negociación del precio final, el acuerdo de entrega — sucede entre el comprador y la administradora sin ninguna mediación técnica. Esta decisión de diseño no es una limitación sino una elección que simplifica radicalmente la arquitectura y elimina toda la complejidad asociada a pagos, órdenes, reembolsos y estados de envío.

## Stack tecnológico y decisiones de arquitectura

El sistema está construido como una Single Page Application en React 19 con Vite como bundler, Tailwind CSS en su versión 4 para los estilos, y Supabase como backend completo que provee base de datos PostgreSQL, autenticación, almacenamiento de archivos y suscripciones en tiempo real. Esta combinación tiene sentido para el caso porque el negocio necesita un sistema que una sola persona pueda administrar sin conocimientos de infraestructura: Supabase elimina la necesidad de un servidor propio, Vercel elimina la necesidad de un proceso de deploy manual, y React con Vite ofrece un entorno de desarrollo productivo sin la complejidad de un framework con renderizado en servidor. La decisión de no usar Next.js o Remix fue pragmática: la aplicación no tiene requisitos de SEO tan estrictos como para justificar el SSR en todas las páginas, y la complejidad operativa adicional no se justifica para un negocio de esta escala.

La arquitectura sigue un principio que el proyecto denomina guest-first, que significa que toda la experiencia de navegación y compra funciona sin que el usuario haya iniciado sesión. El carrito existe y funciona para visitantes anónimos, los productos son visibles sin autenticación, y el pedido puede generarse y enviarse por WhatsApp sin haber creado una cuenta. La autenticación desbloquea funcionalidades de persistencia, como sincronizar el carrito entre dispositivos o guardar favoritos en la base de datos, pero no es una barrera de entrada. Ciertas acciones están restringidas a usuarios autenticados por razones de seguridad y trazabilidad, como enviar mensajes de contacto, pero la experiencia central del catálogo es completamente pública. El bundle de JavaScript se divide en tres chunks para optimizar la carga inicial: un chunk de vendedor que agrupa React, Supabase, Framer Motion y las librerías de routing, un chunk de UI con las librerías de notificaciones y sanitización, y un tercer chunk reservado para expansión futura. Todas las páginas se cargan de forma diferida mediante React.lazy, lo que significa que el código de una página solo se descarga cuando el usuario la visita por primera vez.

## El modelo de datos

La base de datos tiene ocho tablas que cubren todas las entidades del negocio. La tabla de productos es la central del sistema y contiene, además de los campos esperados como nombre, descripción y precio, una estructura de ofertas con tres campos temporales que permiten programar descuentos: un precio anterior que activa el modo de oferta cuando está presente, una fecha de inicio que permite programar una oferta futura, y una fecha de vencimiento que la desactiva automáticamente cuando llega. Esta combinación de tres campos genera lo que el sistema llama estados de oferta, que son tres condiciones mutuamente excluyentes calculadas en tiempo de ejecución: una oferta está activa cuando el precio anterior existe, la fecha de inicio ya pasó y la fecha de vencimiento no ha llegado; está programada cuando la fecha de inicio está en el futuro; y está expirada cuando la fecha de vencimiento ya pasó. La lógica para determinar en cuál de estos tres estados se encuentra un producto está centralizada en un único archivo de utilidades para garantizar que todos los componentes usen el mismo criterio.

Las categorías son entidades simples con nombre, slug, ícono e imagen, y tienen una relación de uno a muchos con los productos. Los perfiles son la extensión del sistema de autenticación de Supabase: cuando un usuario inicia sesión por primera vez, el sistema crea automáticamente un registro en esta tabla con el rol de usuario común, y el único campo que distingue a un administrador de un usuario regular es el valor del campo de rol, que solo puede modificarse directamente desde el panel de Supabase o desde la página de ajustes del panel de administración. Los favoritos se modelan como una tabla de relación entre usuarios y productos, con una fila por cada combinación, lo que permite consultas eficientes y políticas de seguridad precisas. Los carritos de usuario almacenan el estado completo del carrito como un objeto JSON en una sola columna, lo que simplifica la sincronización a costa de impedir consultas analíticas sobre los items individuales. Los mensajes de contacto guardan cada envío del formulario junto con el token de Cloudflare Turnstile para verificación posterior. La tabla de configuración de la tienda es intencionalmente singular: siempre tiene exactamente una fila que contiene todos los parámetros globales del negocio, desde el texto del hero hasta las URLs de redes sociales. Finalmente, la tabla de logs del sistema recibe los errores graves del frontend en lotes de cinco segundos, funcionando como un sistema de monitoreo ligero sin dependencias externas.

## El sistema de autenticación

La autenticación está delegada completamente a Google OAuth a través de Supabase Auth, lo que significa que no existe la opción de registro con email y contraseña. Esta decisión elimina toda la superficie de ataque asociada al almacenamiento de contraseñas y simplifica el proceso de registro a un solo clic, lo cual es adecuado para el público objetivo de la tienda. Cuando un usuario inicia sesión, Supabase emite un token JWT que el SDK almacena automáticamente en localStorage bajo la clave configurada como identificador único del proyecto, para evitar colisiones con otras aplicaciones Supabase en el mismo dominio durante desarrollo local. El contexto de autenticación implementa una capa adicional de caché en sessionStorage que guarda los datos del usuario y su perfil durante una hora, de modo que al recargar la página no sea necesario esperar una consulta de red para determinar el estado de sesión.

La decisión más importante y menos obvia de todo el sistema de autenticación es el desacoplamiento entre el callback de cambio de estado de autenticación y la carga del perfil del usuario. Cuando Supabase notifica que el estado de autenticación cambió, el callback solo actualiza el objeto de usuario en el estado de React y almacena un identificador de referencia. Un efecto de React separado, que se dispara cuando ese identificador cambia, es el responsable de consultar la tabla de perfiles. Esta separación existe porque el SDK de Supabase puede generar condiciones de interbloqueo si se ejecutan operaciones asíncronas contra la base de datos dentro del propio callback de autenticación. Mover la carga del perfil de vuelta al interior del callback, aunque parece una simplificación razonable, reproduciría un bug de concurrencia que fue identificado y corregido deliberadamente. El efecto que carga el perfil también maneja el caso de un usuario que inicia sesión por primera vez: si la consulta no encuentra un registro en la tabla de perfiles, crea uno automáticamente con el rol de usuario común.

## El modelo de autorización y seguridad

La filosofía de seguridad del sistema descansa en el principio de que ninguna capa de defensa es suficiente por sí sola. Las restricciones implementadas en el frontend son necesarias para la experiencia de usuario — impedir que alguien sin sesión agregue favoritos, por ejemplo — pero no son una garantía de seguridad real, porque cualquier persona con conocimientos básicos puede enviar requests directamente a la API de Supabase saltándose completamente la interfaz. La seguridad real está en las políticas de Row Level Security de PostgreSQL, que se evalúan en el servidor para cada operación independientemente de cómo llegó la solicitud. Cuando las dos capas están presentes, una falla en el frontend solo produce una mala experiencia de usuario pero no compromete los datos; una política RLS mal configurada, en cambio, expone los datos incluso si el frontend funciona perfectamente.

Cada campo de texto que el usuario puede ingresar pasa por una función de sanitización basada en DOMPurify configurada para eliminar absolutamente todo el HTML, sin excepciones ni etiquetas permitidas, antes de ser procesado o almacenado. Las URLs proporcionadas por el usuario se validan contra una expresión regular que bloquea protocolos peligrosos como javascript, data y vbscript independientemente de si están escritos en mayúsculas o minúsculas. Todos los identificadores de productos que llegan como parámetros de URL o desde localStorage se validan como UUIDs válidos antes de usarse en consultas de base de datos, y cualquier cláusula que use una lista de identificadores está limitada a cien elementos para prevenir consultas que podrían sobrecargar el servidor. Las búsquedas de texto escapan los caracteres especiales de SQL como el porcentaje y el guión bajo antes de pasarlos a una cláusula de coincidencia parcial, previniendo que un usuario malintencionado pueda manipular el comportamiento de la búsqueda.

El formulario de contacto implementa tres mecanismos de protección independientes. El primero es Cloudflare Turnstile, un sistema de captcha invisible que genera un token criptográfico que se envía junto con el mensaje y puede verificarse del lado del servidor. El segundo es un campo honeypot, un input HTML completamente invisible para los humanos pero visible para los bots que siguen el DOM, de modo que cualquier envío donde ese campo tenga contenido se descarta silenciosamente sin informar al remitente. El tercero es un límite de velocidad implementado en localStorage que impide enviar dos mensajes en menos de sesenta segundos. Los headers HTTP configurados en Vercel completan el modelo de seguridad: la Content Security Policy define una lista blanca de dominios desde los cuales se permite cargar scripts, estilos, imágenes y fuentes, bloqueando cualquier recurso externo no autorizado y mitigando ataques de inyección de contenido.

## El flujo de compra

Un visitante que llega a la tienda por primera vez puede explorar el catálogo completo, ver el detalle de cada producto, agregar items al carrito y generar el mensaje de WhatsApp sin ninguna fricción de autenticación. Cuando agrega un producto al carrito, el item se escribe inmediatamente en localStorage con el precio vigente en ese momento, que queda registrado como snapshot para evitar que cambios posteriores en el catálogo modifiquen silenciosamente el pedido en curso. El CartDrawer, el componente que muestra el contenido del carrito como un panel lateral, ejecuta automáticamente una revalidación de precios al abrirse: consulta Supabase para verificar que los precios almacenados siguen siendo correctos y que todos los productos siguen activos, y elimina cualquier item que haya sido desactivado por la administradora desde que fue agregado. Esta revalidación también se ejecuta periódicamente cada sesenta segundos mientras la pestaña del navegador está visible, y el sistema lleva un contador de fallos consecutivos: si la revalidación falla tres veces seguidas o pasan más de cinco minutos sin un refresh exitoso, el carrito muestra un aviso visible y bloquea el botón de checkout hasta que los precios puedan confirmarse.

Cuando el usuario decide proceder, el sistema llama a una función almacenada en Supabase que genera el mensaje formateado con el nombre de cada producto, su cantidad, su precio unitario, el total por línea y el total general. Si esa función falla por cualquier razón, existe una función local de respaldo que construye el mismo mensaje directamente en el cliente. El mensaje resultante se codifica con encodeURIComponent para que pueda viajar como parámetro de URL, y se construye el enlace de WhatsApp con el número configurado en las variables de entorno. Si el mensaje codificado supera el límite práctico de aproximadamente dos mil caracteres que una URL de WhatsApp puede manejar de forma confiable, el sistema aplica un truncamiento inteligente que elimina productos del final del carrito e indica cuántos quedaron fuera, de modo que el enlace siempre funcione aunque el carrito sea grande. El enlace se abre con window.open en una nueva pestaña, preservando el contexto de la tienda.

El carrito tiene dos comportamientos de ciclo de vida que merecen mención. El primero es la expiración automática: si el carrito lleva siete días sin ser modificado, se limpia y el usuario recibe una notificación que le explica por qué. El segundo es la sincronización entre pestañas: el carrito escucha eventos de cambio en localStorage, de modo que si el usuario tiene la tienda abierta en dos pestañas y agrega un producto en una, la otra se actualiza automáticamente sin necesidad de recargar.

## El sistema de estado global

La aplicación distribuye su estado global en cinco contextos de React que tienen una jerarquía de dependencias estricta. El contexto de autenticación debe envolver a todos los demás porque el carrito y los favoritos necesitan saber si hay un usuario activo para decidir si sincronizan con la base de datos. El contexto de configuración de la tienda mantiene una suscripción de Realtime activa contra la tabla singleton de configuración, de modo que cualquier cambio que la administradora haga en los ajustes se refleja en la tienda sin necesidad de recargar la página, con un debounce de quinientos milisegundos para evitar cascadas de re-renderizado cuando varios campos se actualizan en rápida sucesión. El contexto de confirmación implementa un patrón particularmente elegante: expone una función que retorna una Promesa que se resuelve con verdadero o falso según la elección del usuario en un diálogo modal, lo que permite escribir código de confirmación que parece síncrono aunque el resultado dependa de una interacción del usuario.

El orden de los providers en el punto de entrada de la aplicación no es arbitrario y no debe modificarse. AuthProvider va primero porque CartProvider y FavoritesProvider usan el hook de autenticación internamente y fallarían si se intentara renderizarlos sin ese contexto disponible. SettingsProvider puede ir después de Auth porque no depende del usuario. CartProvider y FavoritesProvider van al final porque son los consumidores, no los proveedores, de la información de autenticación.

## El catálogo y la experiencia de usuario

El catálogo implementa sus filtros de forma que el estado queda completamente reflejado en los parámetros de la URL. Cuando un usuario filtra por categoría, activa el filtro de ofertas o cambia el orden, esos cambios se escriben en los searchParams de la URL, lo que tiene una consecuencia valiosa: el estado del catálogo es compartible y navegable con el botón de atrás del navegador. Si alguien copia la URL con los filtros activos y la comparte, el destinatario ve exactamente el mismo estado de catálogo. Los filtros se procesan del lado del servidor, lo que significa que Supabase recibe las condiciones de búsqueda y solo devuelve los productos que las cumplen, en lugar de cargar todos los productos y filtrar en el cliente.

La tarjeta de producto calcula el porcentaje de descuento como una operación matemática sobre el precio actual y el precio anterior, y lo muestra redondeado al entero más cercano. El countdown de ofertas utiliza una arquitectura de tick compartido a nivel de módulo: un único intervalo de un segundo alimenta a todos los componentes de countdown que estén montados simultáneamente en la página, en lugar de que cada tarjeta con oferta tenga su propio intervalo. Esto significa que si el catálogo muestra veinte productos con oferta activa, solo existe un setInterval corriendo, no veinte. Cada countdown se suscribe a ese tick compartido al montarse y cancela su suscripción al desmontarse, lo que previene memory leaks cuando el usuario navega fuera de la página.

## El carrito en detalle

El carrito merece una descripción extendida porque concentra más decisiones de diseño que cualquier otro componente del sistema. La decisión fundamental es que localStorage es la fuente primaria de verdad, no Supabase. Esto significa que el carrito existe y persiste incluso si el servicio de base de datos no está disponible, que las operaciones son instantáneas sin latencia de red, y que no hay diferencia funcional entre un usuario autenticado y uno anónimo desde la perspectiva del carrito. La base de datos es el destino de sincronización para usuarios autenticados, no el origen. Cuando un usuario inicia sesión y tiene items en el carrito local, esos items se suben a Supabase y sobreescriben cualquier carrito guardado previamente. Cuando inicia sesión con el carrito vacío, el sistema descarga el carrito guardado en la base de datos. La sincronización con la base de datos tiene un debounce de mil quinientos milisegundos para no generar una escritura por cada pequeño cambio, y usa una función de reintento con backoff exponencial para manejar fallos transitorios de red.

Los límites de cincuenta unidades por producto y cincuenta items distintos no son caprichosos. Existen porque el mensaje de WhatsApp que se genera a partir del carrito debe caber en una URL, y las URLs tienen límites prácticos en diferentes sistemas operativos y aplicaciones. Con carteras grandes, el mensaje supera fácilmente ese límite y el enlace deja de funcionar. Los límites duros garantizan que el mensaje siempre sea transmisible, y el mecanismo de truncamiento maneja los casos donde se intenta superar ese límite de todas formas.

## El panel de administración

El panel de administración protege su acceso con una estrategia deliberadamente desorientadora: cuando alguien sin permisos intenta acceder a cualquier ruta bajo /admin, el sistema muestra una página de error 404 en lugar de redirigir a la página principal o mostrar un mensaje de acceso denegado. Esta decisión oculta la existencia del panel a quienes no saben que existe, haciendo que el reconocimiento de la superficie de ataque sea más difícil. La verificación se realiza en dos capas: el componente de guardia de rutas verifica el rol en el cliente, y las políticas de Row Level Security verifican el rol en el servidor para cada operación de escritura, de modo que incluso si alguien lograra saltarse el guardia del cliente, no podría realizar ninguna operación con consecuencias reales.

La creación y edición de productos es la operación más compleja del panel. El formulario gestiona la lógica de ofertas con validaciones cruzadas: el precio anterior debe ser estrictamente mayor que el precio actual para que tenga sentido como referencia de descuento, el slug debe ser único en toda la base de datos y el sistema lo verifica con una consulta antes de guardar, y las fechas de inicio y vencimiento tienen restricciones de coherencia temporal. La subida de imágenes pasa por un proceso de compresión mediante Canvas que reescala la imagen a un máximo de mil doscientos píxeles en su dimensión mayor y la re-exporta como WebP con una calidad del ochenta por ciento. Este proceso tiene un efecto secundario que en este contexto es una característica de privacidad: al pasar la imagen por Canvas, se elimina toda la metadata EXIF, incluyendo las coordenadas GPS que los teléfonos móviles insertan automáticamente en cada fotografía. Para una administradora que toma fotos de sus productos desde su domicilio, esta eliminación automática de la ubicación geográfica es significativa.

## Rendimiento y optimización

Las decisiones de rendimiento del sistema son coherentes con su escala y contexto. El caché de categorías vive a nivel de módulo de JavaScript, fuera del estado de React, con un tiempo de vida de diez minutos. Esto significa que múltiples componentes que necesiten la lista de categorías comparten la misma promesa de carga y la misma respuesta en caché, sin necesidad de coordinación. La invalidación manual es posible mediante un evento de browser personalizado que el panel de administración dispara al guardar cambios en las categorías, aunque los cambios en otra pestaña no se propagan automáticamente hasta que expira el TTL. El debounce en el campo de búsqueda evita consultar Supabase en cada pulsación de tecla, esperando a que el usuario pause antes de lanzar la búsqueda. Los AbortController asociados a cada solicitud de productos cancelan automáticamente las requests obsoletas cuando el usuario cambia los filtros antes de que llegue la respuesta anterior, lo que evita que respuestas tardías sobreescriban resultados más recientes.

## Estado actual y deuda técnica

El sistema está funcionalmente completo para su propósito declarado. El catálogo, el carrito, el flujo de WhatsApp, el sistema de ofertas, el panel de administración y todos los mecanismos de seguridad están implementados y documentados. Las limitaciones conocidas son acotadas y en su mayoría son decisiones conscientes de diseño: el focus trap de los modales no maneja el ciclado de Tab entre elementos, lo que es una limitación de accesibilidad menor que está documentada en el código. El caché de categorías no se sincroniza entre pestañas, lo que significa que un cambio del admin puede tardar hasta diez minutos en verse en otra pestaña abierta del catálogo. El sistema de logs usa la base de datos como destino, lo que funciona para la escala actual pero se volvería problemático si el volumen de errores creciera significativamente.

La deuda técnica más importante es la ausencia de tests automatizados. La documentación menciona una estructura de tests con Vitest, Cypress y Playwright, pero no hay evidencia de que existan tests escritos que cubran los flujos críticos. Para un sistema cuya operación depende de la correcta generación del mensaje de WhatsApp, la revalidación de precios y las políticas de seguridad de la base de datos, la ausencia de tests significa que cualquier modificación futura carga con el riesgo de introducir regresiones que solo se detectarían en producción. Esta es la brecha más relevante entre el estado actual del sistema y un estado que se podría considerar completamente robusto.`;

const funcContent = `# I Nova SV — Descripción funcional del código

## Visión general del sistema

I Nova SV es una aplicación web de catálogo comercial construida para un negocio de venta directa en El Salvador que opera completamente al margen de los mecanismos convencionales del comercio electrónico. No existe pasarela de pagos, no existe gestión de inventario, y el concepto de stock es funcionalmente irrelevante: todos los productos se consideran disponibles por definición porque el negocio trabaja por pedido, y el cierre de cada venta ocurre fuera del sistema, a través de una conversación en WhatsApp entre el comprador y la administradora. La aplicación existe para un propósito deliberadamente acotado: permitir que un visitante explore un catálogo visual atractivo, acumule productos en un carrito, y con un solo gesto genere un mensaje pre-formateado que abre WhatsApp con el pedido completo listo para enviar. Todo lo que ocurre después de ese momento — la confirmación de disponibilidad, el acuerdo de precio final, la logística de entrega — sucede entre personas sin ninguna mediación técnica. Esta decisión de diseño no es una limitación técnica sino una elección que elimina radicalmente la complejidad asociada a pagos, órdenes, reembolsos y estados de envío, permitiendo que una sola persona administre el negocio completo sin infraestructura especializada. El sistema está construido sobre React 19 con Vite como bundler, Tailwind CSS en su versión 4 para estilos, y Supabase como backend completo que provee base de datos PostgreSQL, autenticación mediante Google OAuth, almacenamiento de archivos y suscripciones en tiempo real, todo desplegado en Vercel como aplicación estática.

## Arquitectura general y organización del código

El sistema es una Single Page Application pura, sin renderizado en servidor ni generación estática de páginas, lo que es apropiado dado que el contenido del catálogo cambia con frecuencia y el negocio no requiere un SEO de nivel enterprise. Toda la lógica vive en el cliente y se comunica con Supabase directamente desde el navegador usando la clave anónima pública, que por diseño solo permite las operaciones que las políticas de Row Level Security autorizan explícitamente. La organización del código refleja una separación de responsabilidades en capas bien definidas. La capa más baja es la configuración y las utilidades: un cliente Supabase singleton que se instancia una única vez para evitar conflictos de autenticación, funciones de formateo de precios basadas en el API de internacionalización nativo del navegador, funciones de sanitización y validación de inputs, un sistema de logging que escribe en consola durante desarrollo y envía errores a la base de datos en producción, y utilidades especializadas para construir URLs de WhatsApp, generar slugs desde texto arbitrario, y extraer nombres de archivo de URLs de Supabase Storage de forma segura. Por encima de esa capa viven los servicios, que son funciones que construyen y ejecutan consultas específicas contra Supabase: uno para productos con soporte completo de filtros, paginación y ordenamiento, y uno para categorías con campos explícitamente seleccionados. Los hooks personalizados abstraen la lógica de estado asíncrono para que los componentes no necesiten manejar directamente los ciclos de carga, error y cancelación de requests. Los contextos de React centralizan el estado que necesita ser compartido entre partes distantes del árbol de componentes. Y finalmente los componentes y páginas consumen todo lo anterior para construir la interfaz visible.

El bundle de JavaScript se divide en tres chunks de carga diferida. El chunk de vendedor agrupa las dependencias más grandes y estables: React, React Router, el cliente de Supabase y Framer Motion. El chunk de interfaz agrupa las librerías de notificaciones, meta tags y sanitización. El tercer chunk está reservado para uso futuro. Todas las páginas se cargan de forma diferida mediante React.lazy, lo que significa que el código de una página solo se descarga cuando el usuario la visita por primera vez, reduciendo el tiempo de carga inicial a solo lo necesario para renderizar la página de entrada.

## El modelo de datos

La base de datos tiene ocho tablas que modelan todas las entidades relevantes para el negocio. La tabla de productos es la central del sistema y merece una descripción extendida. Además de los campos esperados como nombre, descripción y precio en dólares, implementa una estructura de ofertas temporales compuesta por tres campos que trabajan en conjunto: un precio anterior que activa el modo de descuento cuando está presente, una fecha de inicio que permite programar una oferta para el futuro, y una fecha de vencimiento que la desactiva automáticamente cuando llega. Esta combinación genera lo que el sistema trata como tres estados mutuamente excluyentes calculados en tiempo de ejecución, cuya lógica está centralizada en un único archivo de utilidades para garantizar que todos los componentes del sistema usen exactamente el mismo criterio de clasificación. Una oferta está activa cuando el precio anterior existe, la fecha de inicio ya pasó o no fue especificada, y la fecha de vencimiento no ha llegado o no fue especificada. Una oferta está programada cuando la fecha de inicio existe y todavía es futura. Una oferta está expirada cuando la fecha de vencimiento existe y ya pasó. Los productos también almacenan un campo de slug generado a partir del nombre, un array de URLs de imágenes, un array de tags, una referencia a su categoría, y un campo booleano que controla si el producto es visible en el catálogo público.

Las categorías son entidades simples con nombre, slug, un ícono referenciado como nombre de Material Symbol, una imagen y una descripción opcional. La relación entre categorías y productos es de uno a muchos: cada producto pertenece a una categoría, y una categoría puede tener cualquier número de productos. Los perfiles son la extensión del sistema de autenticación de Supabase en la base de datos del proyecto: cuando un usuario inicia sesión por primera vez, el sistema crea automáticamente un registro en esta tabla con el identificador que Supabase Auth asignó al usuario y el rol de usuario común. El único campo que diferencia a un administrador de un usuario regular es el valor del campo de rol, que por diseño solo puede modificarse desde el panel de Supabase directamente o desde la página de ajustes del panel de administración, que a su vez requiere ser administrador para acceder.

Los favoritos se modelan como una tabla de relación entre usuarios y productos, con una fila por cada combinación usuario-producto, lo que permite consultas eficientes y políticas de seguridad granulares. Los carritos de usuario almacenan el estado completo del carrito de un usuario autenticado como un objeto JSON en una sola columna, lo que simplifica enormemente la sincronización pero impide cualquier análisis sobre los items individuales desde la base de datos. Los mensajes de contacto guardan cada envío del formulario junto con el token de Cloudflare Turnstile incluido en el payload, permitiendo una verificación posterior de la autenticidad del envío. La tabla de configuración de la tienda es intencionalmente singular y siempre tiene exactamente una fila que contiene todos los parámetros globales del negocio, desde el texto y la imagen del hero hasta los enlaces de redes sociales y el número de teléfono de contacto. Finalmente, la tabla de logs del sistema recibe los errores graves que el frontend detecta en producción, agrupados en lotes de cinco segundos para no generar una escritura por cada error individual.

## El sistema de autenticación y sesiones

La autenticación está delegada completamente a Google OAuth a través de Supabase Auth, lo que significa que no existe la posibilidad de registrarse con email y contraseña. Esta decisión elimina toda la superficie de ataque asociada al almacenamiento y validación de contraseñas y reduce el proceso de registro a un único clic, lo cual es adecuado para el perfil de usuario de una tienda pequeña donde la fricción de registro debe ser mínima. El cliente de Supabase se configura con un identificador de almacenamiento personalizado que distingue sus tokens de los de cualquier otra aplicación Supabase que pudiera estar corriendo en el mismo dominio durante el desarrollo local.

El contexto de autenticación implementa una estrategia de caché en sessionStorage que persiste los datos del usuario y su perfil durante una hora, referenciada por una marca de tiempo de creación. Cuando el usuario recarga la página, el sistema primero intenta hidratar su estado desde esa caché antes de hacer cualquier consulta de red, lo que evita una pantalla de carga visible en cada recarga. La caché se invalida automáticamente cuando el token de sesión expira o cuando el usuario cierra sesión.

La decisión más crítica y menos obvia del sistema de autenticación es el desacoplamiento entre el callback que Supabase invoca cuando el estado de autenticación cambia y el proceso de cargar el perfil del usuario desde la base de datos. Cuando Supabase notifica que un usuario inició sesión, el callback del contexto de autenticación únicamente actualiza el objeto de usuario en el estado de React y registra su identificador en una referencia mutable. Un efecto de React completamente separado, que se activa en respuesta al cambio de ese identificador, es el responsable de consultar la tabla de perfiles. Esta separación existe porque el SDK de Supabase puede generar condiciones de interbloqueo si se ejecutan operaciones asíncronas contra la base de datos dentro del propio callback de cambio de estado de autenticación. Mover la carga del perfil de vuelta al interior del callback, aunque parece una simplificación lógica para alguien que no conoce este detalle del SDK, reproduciría un bug de concurrencia que fue identificado y resuelto deliberadamente. La referencia mutable al identificador del usuario actúa además como guarda contra condiciones de carrera: si el estado de autenticación cambia mientras una consulta de perfil está en vuelo, la respuesta de esa consulta se descarta en lugar de sobrescribir el perfil del usuario que inició sesión posteriormente.

El efecto que carga el perfil también gestiona el caso de un usuario que inicia sesión por primera vez: si la consulta no encuentra un registro en la tabla de perfiles, el sistema crea uno automáticamente con el rol de usuario común. Cuando un usuario cierra sesión, el sistema limpia el caché de sessionStorage de forma controlada, eliminando únicamente las claves relacionadas con la sesión sin tocar el carrito ni los favoritos almacenados en localStorage.

## El modelo de autorización y seguridad en capas

La filosofía de seguridad del sistema descansa en el principio de que ninguna capa de defensa es suficiente por sí sola y que las capas deben complementarse en lugar de reemplazarse mutuamente. Las restricciones implementadas en el frontend son necesarias para la experiencia de usuario pero no representan una garantía de seguridad real, porque cualquier persona con conocimientos básicos de HTTP puede enviar requests directamente a la API de Supabase omitiendo completamente la interfaz web. La seguridad real está en las políticas de Row Level Security de PostgreSQL, que se evalúan en el servidor para cada operación con independencia de cómo llegó la solicitud. Cuando ambas capas funcionan correctamente, una falla en el frontend produce como mucho una mala experiencia de usuario pero no compromete datos. Una política RLS mal configurada, en cambio, expone los datos aunque el frontend funcione perfectamente.

Todas las tablas tienen RLS habilitado. Los productos y las categorías pueden ser leídos por cualquier visitante sin autenticación, pero solo pueden ser modificados por usuarios con rol de administrador. Los perfiles solo pueden ser leídos y modificados por el propio usuario al que pertenecen, con la excepción del administrador que puede modificar el campo de rol en cualquier perfil. Los favoritos y los carritos son completamente privados: cada usuario solo puede ver y modificar sus propios registros, y ningún usuario puede acceder a los de otro. Los mensajes de contacto pueden ser insertados por cualquier usuario autenticado pero solo pueden ser leídos y eliminados por administradores. La configuración de la tienda puede ser leída por cualquier visitante pero solo modificada por administradores.

Cada campo de texto que el usuario puede ingresar a través de la interfaz pasa por una función de sanitización basada en DOMPurify configurada para eliminar absolutamente todo el HTML sin excepciones antes de ser procesado o almacenado. Las URLs proporcionadas por el usuario se validan contra una expresión que detecta y bloquea protocolos peligrosos como javascript, data y vbscript independientemente de cómo estén escritos en términos de capitalización. Todos los identificadores de productos que llegan como parámetros de URL o desde localStorage se validan como UUIDs antes de usarse en consultas de base de datos, y las cláusulas que aceptan listas de identificadores están limitadas a cien elementos para prevenir consultas que podrían saturar el servidor. Las búsquedas de texto escapan los caracteres que tienen significado especial en los patrones de coincidencia de SQL antes de pasarlos a la consulta, impidiendo que un usuario manipule el comportamiento de la búsqueda más allá de sus intenciones declaradas.

El formulario de contacto implementa tres mecanismos de protección independientes que actúan en secuencia. Cloudflare Turnstile genera un token criptográfico que viaja junto con el mensaje y puede verificarse del lado del servidor para confirmar que el envío provino de un navegador humano real. Un campo honeypot completamente invisible para los usuarios humanos pero presente en el DOM captura a los bots automatizados que rellenan todos los campos del formulario que encuentran: si ese campo tiene cualquier contenido cuando el formulario se envía, el sistema descarta silenciosamente el envío sin informar al remitente que fue detectado. Un límite de velocidad implementado mediante una marca de tiempo en localStorage impide enviar dos mensajes en menos de sesenta segundos, independientemente de si el primero fue exitoso o no.

Los headers HTTP configurados en Vercel completan el modelo de seguridad desde la perspectiva del protocolo. La Content Security Policy define una lista blanca estricta de dominios desde los cuales se permite cargar scripts, estilos, imágenes, fuentes y establecer conexiones, bloqueando cualquier recurso externo no autorizado y mitigando ataques de inyección de contenido. La cabecera X-Frame-Options impide que la aplicación sea incrustada en iframes de otros dominios, cerrando el vector de ataques de clickjacking. La cabecera X-Content-Type-Options impide que el navegador infiera tipos MIME distintos a los declarados, neutralizando ciertos tipos de ataques de confusión de contenido.

## El flujo de compra de principio a fin

Un visitante que llega a la tienda por primera vez puede explorar el catálogo completo, leer el detalle de cualquier producto y agregar items al carrito sin ninguna fricción de autenticación. Cuando agrega un producto al carrito, el item se escribe inmediatamente en localStorage con el precio vigente en ese momento como un valor fijo, que queda registrado como snapshot para aislar el carrito de cambios posteriores en el catálogo. El carrito no es solo una lista de referencias a productos sino una copia de los datos relevantes en el momento del agregado. Esta decisión implica que si la administradora cambia el precio de un producto después de que fue agregado al carrito, el carrito seguirá mostrando el precio original hasta que ocurra una revalidación.

La revalidación de precios es el mecanismo que cierra esa brecha. El CartDrawer ejecuta automáticamente una consulta a Supabase al abrirse para verificar que los precios almacenados en el carrito corresponden a los precios actuales en la base de datos. También elimina del carrito cualquier item cuyo producto haya sido desactivado por la administradora desde que fue agregado. Esta misma revalidación se ejecuta periódicamente cada sesenta segundos mientras la pestaña del navegador está activa y visible en pantalla, con la condición de visibilidad implementada para no generar tráfico innecesario cuando el usuario tiene la pestaña en segundo plano. El sistema mantiene un contador de fallos consecutivos: si la revalidación falla tres veces seguidas, o si transcurren más de cinco minutos sin un refresh exitoso, el carrito activa un estado de advertencia que muestra un aviso visible al usuario y bloquea el botón de checkout hasta que los precios puedan confirmarse con la base de datos.

Cuando el usuario decide proceder con su pedido, el sistema llama a una función almacenada en Supabase que recibe los items del carrito y genera el mensaje formateado con el nombre de cada producto, su cantidad, su precio unitario, el subtotal por línea y el total general. Si esa función remota falla por cualquier razón, existe una función local que construye el mismo mensaje directamente en el cliente como mecanismo de respaldo. El mensaje resultante se codifica para que pueda viajar como parámetro de una URL sin que los caracteres especiales, tildes o saltos de línea rompan el enlace. Si el mensaje codificado supera el límite práctico de aproximadamente dos mil caracteres que las URLs de WhatsApp pueden manejar con fiabilidad en todos los sistemas operativos y aplicaciones, el sistema aplica un truncamiento inteligente que elimina productos del final del mensaje e indica cuántos quedaron fuera, garantizando que el enlace siempre sea funcional independientemente del tamaño del carrito.

El carrito tiene además dos comportamientos de ciclo de vida importantes. Primero, se auto-elimina tras siete días de inactividad medidos desde la última modificación, mostrando una notificación explicativa al usuario cuando esto ocurre. Segundo, se sincroniza entre pestañas del mismo navegador mediante eventos de cambio en localStorage, de modo que si el usuario tiene la tienda abierta en dos pestañas simultáneas, las modificaciones en una se reflejan en la otra sin necesidad de recargar.

## La gestión del estado global

La aplicación distribuye su estado global en cinco contextos de React con una jerarquía de dependencias estricta que determina el orden en que deben anidarse en el árbol de providers. El contexto de autenticación debe ser el más externo de todos porque el contexto del carrito y el de favoritos necesitan saber si hay un usuario activo para decidir si sincronizan con la base de datos, y ambos fallarían si intentaran consumir el contexto de autenticación sin encontrarlo disponible en el árbol.

El contexto de configuración de la tienda mantiene una suscripción activa al sistema de cambios en tiempo real de Supabase apuntando a la tabla de configuración. Cualquier actualización que la administradora guarde desde el panel se propaga a todas las instancias abiertas de la tienda en segundos, sin que los usuarios necesiten recargar la página. La suscripción valida el payload recibido antes de aplicarlo al estado, y aplica un debounce de medio segundo para absorber actualizaciones en ráfaga sin provocar cascadas de re-renderizado.

El contexto de confirmación implementa un patrón que merece mención especial por su elegancia: expone una única función que retorna una Promesa que se resuelve con verdadero o falso según la elección del usuario en un diálogo modal. Esto permite que el código que necesita confirmación del usuario se escriba de forma secuencial y legible, aunque el resultado dependa de una interacción asíncrona del usuario.

Los favoritos viven en un contexto que mantiene sincronización bidireccional entre localStorage y la base de datos cuando hay un usuario autenticado. Cuando un usuario inicia sesión, el sistema carga sus favoritos locales, carga sus favoritos de la base de datos, y produce la unión de ambos conjuntos sin duplicados. Los favoritos que estaban solo en localStorage se insertan en la base de datos, garantizando que los productos marcados antes de iniciar sesión no se pierdan. La función de consulta de favoritos utiliza un conjunto interno de JavaScript en lugar de un array para garantizar que las búsquedas sean de tiempo constante independientemente del número de favoritos, lo que es relevante para el rendimiento cuando los íconos de favorito de decenas de tarjetas de producto se renderizan simultáneamente en el catálogo.

## El catálogo y la experiencia de navegación

El catálogo implementa sus filtros de forma que el estado queda completamente reflejado en los parámetros de la URL del navegador. Cuando un usuario selecciona una categoría, activa el filtro de ofertas o elige un criterio de ordenamiento, esos cambios se escriben en la URL, lo que produce varias consecuencias valiosas: el estado del catálogo puede ser compartido enviando la URL, puede ser recuperado usando el botón de atrás del navegador, y persiste si el usuario recarga la página. Todos los filtros se procesan del lado del servidor, de modo que Supabase recibe las condiciones de búsqueda y devuelve únicamente los productos que las satisfacen en lugar de cargar el catálogo completo y filtrar en el cliente. Las búsquedas de texto utilizan coincidencia parcial insensible a mayúsculas sobre el nombre y la descripción del producto. La paginación está implementada con desplazamiento por offset, mostrando un número fijo de productos por página con controles de navegación anterior y siguiente.

La tarjeta de producto es el componente visual más repetido de la aplicación y está optimizada con memoización para evitar re-renderizados innecesarios cuando el estado global cambia por razones ajenas a ese producto específico. Calcula el porcentaje de descuento como una operación aritmética sobre el precio actual y el precio anterior, redondeada al entero más próximo. El countdown de tiempo real que aparece en productos con oferta activa utiliza una arquitectura de tick compartido a nivel de módulo: existe un único intervalo de un segundo en toda la aplicación que alimenta a todos los componentes de countdown que estén montados simultáneamente, en lugar de que cada tarjeta con oferta cree su propio temporizador. Esto significa que si el catálogo muestra veinte productos con oferta, solo hay un único intervalo corriendo, no veinte. Cada countdown individual se suscribe a ese tick compartido cuando se monta y cancela su suscripción cuando se desmonta, previniendo acumulación de memoria cuando el usuario navega entre páginas.

## El panel de administración

El panel de administración protege su acceso con una estrategia deliberadamente desorientadora: cuando alguien sin los permisos necesarios intenta acceder a cualquier ruta bajo la raíz del panel, el sistema renderiza la página de error 404 estándar en lugar de redirigir a la página principal o mostrar un mensaje explícito de acceso denegado. Esta decisión oculta la existencia del panel a quienes no saben que existe. La verificación de permisos ocurre en el cliente a través de un componente guard que consulta el rol del usuario en el contexto de autenticación, y en el servidor a través de las políticas RLS que rechazan cualquier operación de escritura que no provenga de una sesión con rol de administrador, garantizando que incluso si alguien lograra sortear la verificación del cliente, no pudiera realizar ninguna operación con consecuencias reales en la base de datos.

El formulario de creación y edición de productos es el componente más complejo del panel, con más de quinientas líneas de código que gestionan una lógica de validación cruzada entre campos. El precio anterior debe ser estrictamente mayor que el precio actual para que el descuento tenga sentido aritmético. El slug se genera automáticamente a partir del nombre al crear un producto nuevo, pero puede editarse manualmente, y el sistema verifica su unicidad contra la base de datos antes de permitir guardar. La lógica de ofertas temporales tiene cuatro modos posibles que se determinan por la combinación de valores en los campos relacionados: si el precio anterior tiene valor y se especifica una duración en días, horas o minutos, el sistema calcula y almacena la fecha exacta de vencimiento. Si además se especifica una fecha de inicio futura, la oferta se marca como programada y no aparecerá como activa hasta que llegue esa fecha. Si la duración especificada es cero, la oferta se activa sin fecha de vencimiento y permanece hasta que sea modificada manualmente. Si el campo de precio anterior se vacía, el sistema limpia también las fechas de inicio y vencimiento para evitar estados inconsistentes.

La subida de imágenes procesa cada archivo a través del API Canvas del navegador, que reescala la imagen a un máximo de mil doscientos píxeles en su dimensión mayor y la re-exporta en formato WebP con una calidad del ochenta por ciento. Este proceso tiene un efecto secundario que en este contexto específico es una característica de privacidad relevante: al pasar la imagen por Canvas, se elimina toda la metadata EXIF que los dispositivos móviles insertan automáticamente en cada fotografía, incluyendo las coordenadas GPS del lugar donde fue tomada. Para una administradora que fotografía sus productos desde su domicilio, esta eliminación automática de la ubicación geográfica tiene implicaciones de privacidad que justifican el mecanismo independientemente de sus beneficios de compresión.

## Rendimiento y optimizaciones

Las decisiones de rendimiento del sistema son coherentes con su escala y las necesidades reales del negocio. El caché de categorías vive a nivel de módulo de JavaScript, fuera del estado de React y por lo tanto fuera del ciclo de renderizado, con un tiempo de vida de diez minutos. Múltiples componentes que necesiten la lista de categorías en la misma pestaña comparten la misma promesa de carga y la misma respuesta en caché, sin necesidad de coordinación explícita entre ellos. La invalidación manual es posible mediante un evento personalizado del navegador que el panel de administración dispara al guardar cambios en las categorías, aunque los cambios realizados en otra pestaña no se propagan automáticamente hasta que el TTL expire en la pestaña del catálogo.

El debounce aplicado al campo de búsqueda evita que cada pulsación de tecla genere una consulta a la base de datos, esperando a que el usuario deje de escribir antes de lanzar la búsqueda. Los AbortController asociados a cada solicitud de productos cancelan automáticamente las requests que quedan obsoletas cuando el usuario cambia los filtros antes de que llegue la respuesta anterior, evitando que respuestas tardías sobreescriban resultados más recientes y causando la confusión visual que eso produciría.

## Estado actual y deuda técnica

El sistema está funcionalmente completo para el propósito que fue diseñado. El catálogo, el carrito, el flujo de generación del mensaje de WhatsApp, el sistema de ofertas temporales con sus tres estados, el panel de administración completo, y todos los mecanismos de seguridad descritos están implementados y documentados de forma coherente. Las limitaciones conocidas son acotadas y en su mayoría son el resultado de decisiones conscientes con sus justificaciones documentadas en el código: el focus trap de los modales no maneja el ciclado completo del foco con la tecla Tab, lo que representa una limitación de accesibilidad menor para usuarios de teclado. El caché de categorías no se sincroniza entre pestañas del mismo navegador, lo que significa que un cambio guardado desde el panel de administración puede tardar hasta diez minutos en verse en una pestaña del catálogo que esté abierta simultáneamente.

La deuda técnica más significativa es la ausencia de tests automatizados. La documentación del proyecto describe una estructura de tests con Vitest para pruebas unitarias, Cypress para pruebas de extremo a extremo interactivas, y Playwright como alternativa headless, pero no hay evidencia en el repositorio de que existan tests escritos que cubran ninguno de los flujos críticos del sistema. Para un sistema cuya operación central depende de la correcta generación del mensaje de WhatsApp, la precisión de los cálculos de descuento, la revalidación de precios del carrito y la integridad de las políticas de seguridad de la base de datos, la ausencia de cobertura de tests significa que cualquier modificación futura carga con el riesgo de introducir regresiones que solo serían detectadas en producción. Esta es la brecha más relevante entre el estado actual del sistema y un estado que podría considerarse completamente robusto para un equipo en crecimiento.`;

// Extractor and formatter for Sprints from raw plain-text document
function SprintsFormatter({ content }) {
  const sprints = [];

  if (content) {
    // Normalize Windows line endings before parsing
    const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Split by sprint headers (keeping the SPRINT N... together with its tasks)
    const sprintBlocks = normalized.split(/(?=^SPRINT\s+\d+\s*[—–-])/m);

    for (const block of sprintBlocks) {
      const headerMatch = block.match(/^SPRINT\s+(\d+)\s*[—–-]\s*(.+)/m);
      if (!headerMatch) continue;

      const sprintId = parseInt(headerMatch[1], 10);
      const tasks = [];

      // Match task lines: "  Nh  Description\n      → file\n      Notas: ..."
      const lines = block.split('\n');
      let i = 0;
      while (i < lines.length) {
        const taskMatch = lines[i].match(/^\s+(\d+(?:\.\d+)?)h\s+(.+)/);
        if (taskMatch) {
          const h = parseFloat(taskMatch[1]);
          let task = taskMatch[2].trim();
          let file = '';
          let notes = '';

          // Look ahead for continuation lines, → file, and Notas:
          let j = i + 1;
          while (j < lines.length && !lines[j].match(/^\s+\d+(?:\.\d+)?h\s/) && !lines[j].match(/^[─═]/) && !lines[j].match(/^\s*TOTAL/) && !lines[j].match(/DEFINICIÓN DE DONE/) && lines[j].trim() !== '') {
            const fileLine = lines[j].match(/^\s+→\s*(.+)/);
            const notesLine = lines[j].match(/^\s+Notas:\s*(.+)/);
            if (fileLine) {
              file = fileLine[1].trim();
            } else if (notesLine) {
              notes = notesLine[1].trim();
            } else if (!fileLine && !notesLine && lines[j].trim()) {
              // Continuation of task description
              task += ' ' + lines[j].trim();
            }
            j++;
          }

          tasks.push({ task, file, h, notes });
          i = j;
        } else {
          i++;
        }
      }

      if (tasks.length > 0) {
        sprints.push({ id: sprintId, tasks });
      }
    }
  }

  if (sprints.length === 0) {
    return <p className="text-slate-500">Error: No se pudieron parsear los datos de los sprints.</p>;
  }

  let globalTotalHours = 0;
  sprints.forEach(sprint => {
    sprint.tasks.forEach(t => { globalTotalHours += t.h; });
  });

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-[var(--space-2xl)]">
      {/* Resumen Global */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-[var(--space-lg)] flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 m-0 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Total de Desarrollo
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 sm:ml-8 font-medium">
            (2 meses y 7 días de desarrollo)
          </p>
        </div>
        <div className="flex flex-col sm:items-end">
          <span className="text-3xl font-black text-primary leading-none">{globalTotalHours}h</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-white/10 px-3 py-1 rounded-md inline-block mt-2">
            1,201.75 USD
          </span>
        </div>
      </div>

      {sprints.map((sprint) => {
        let totalHours = 0;
        return (
          <section key={sprint.id} className="space-y-[var(--space-md)]">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
              <span className="flex items-center justify-center rounded-lg aspect-square w-[clamp(2rem,5vw,2.5rem)] bg-slate-100 dark:bg-white/10 shadow-sm border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-100 font-black shrink-0 transition-colors mt-0.5">
                {sprint.id}
              </span>
              Sprint {sprint.id} de Desarrollo
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
              <table className="w-full text-left text-sm whitespace-nowrap sm:whitespace-normal">
                <thead>
                  <tr className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 uppercase text-xs tracking-wider">
                    <th className="px-4 py-3 font-semibold w-1/3">Tarea / Componente</th>
                    <th className="px-4 py-3 font-semibold w-1/4">Archivo / Ubicación</th>
                    <th className="px-4 py-3 font-semibold text-center w-20">Horas</th>
                    <th className="px-4 py-3 font-semibold w-1/3">Notas Clave</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                  {sprint.tasks.map((t, i) => {
                    totalHours += t.h;
                    return (
                      <tr key={i} className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 whitespace-normal break-words align-top">{t.task}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs align-top">{t.file}</td>
                        <td className="px-4 py-3 text-center font-bold text-primary align-top">{t.h}h</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-normal align-top">{t.notes}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-100 dark:bg-white/5 font-bold">
                    <td colSpan="2" className="px-4 py-3 text-right text-slate-700 dark:text-slate-200 uppercase text-xs tracking-wider">TOTAL DEL SPRINT</td>
                    <td className="px-4 py-3 text-center text-primary">{totalHours}h</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}

// Universal text renderer that handles both markdown-style and legal document formats
function MarkdownRenderer({ content }) {
  if (!content) return <p className="text-slate-500">Documento no disponible o vacío.</p>;

  // Normalize Windows line endings
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split by ━━━ separators (legal docs) OR \n\n (markdown docs)
  const hasLegalSeparators = normalized.includes('━━━');
  
  let sections;
  if (hasLegalSeparators) {
    // Legal document format: split by ━━━ lines
    sections = normalized.split(/━{4,}/).filter(s => s.trim().length > 0);
  } else {
    // Markdown format: split by double newlines
    sections = normalized.split(/\n\s*\n/).filter(s => s.trim().length > 0);
  }

  let sectionCounter = 0;

  // Render a single text block (paragraph, list, sub-header, or metadata table)
  const renderBlock = (block, key) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Markdown ## headers
    if (trimmed.startsWith('## ')) {
      sectionCounter++;
      return (
        <div key={key}>
          {key > 0 && <hr className="border-slate-200 dark:border-white/10 my-[var(--space-xl)]" />}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-start gap-3">
            <span className="flex items-center justify-center rounded-lg aspect-square w-[clamp(2rem,5vw,2.5rem)] bg-slate-100 dark:bg-white/10 shadow-sm border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-100 font-black shrink-0 transition-colors mt-0.5">
              {sectionCounter}
            </span>
            <span className="mt-1">{trimmed.replace(/^## /, '')}</span>
          </h2>
        </div>
      );
    }

    // Markdown # title
    if (trimmed.startsWith('# ')) {
      return <h1 key={key} className="text-2xl font-black text-slate-900 dark:text-white mb-4">{trimmed.replace('# ', '')}</h1>;
    }

    // Sub-headers like "1.1 El Donante" or "X.Y Title"
    if (/^\d+\.\d+\s+/.test(trimmed) && trimmed.split('\n').length === 1) {
      return (
        <h3 key={key} className="text-lg font-bold text-slate-700 dark:text-slate-200 mt-[var(--space-md)] mb-[var(--space-xs)]">
          {trimmed}
        </h3>
      );
    }

    // Metadata table with | separators (DOCUMENTO | DETALLE format)
    const lines = trimmed.split('\n').filter(l => l.trim());
    const isTable = lines.length >= 2 && lines.some(l => l.includes('|')) && !lines[0].startsWith('-');
    if (isTable) {
      const dataLines = lines.filter(l => l.includes('|') && !/^[-|]+$/.test(l.trim()));
      if (dataLines.length >= 2) {
        return (
          <div key={key} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-50 dark:bg-white/5">
            {dataLines.map((line, i) => {
              const parts = line.split('|').map(p => p.trim());
              if (parts.length < 2) return null;
              const label = parts[0];
              const value = parts.slice(1).join(' ').trim();
              // Skip the header row separator
              if (/^[-]+$/.test(label)) return null;
              return (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row gap-1 sm:gap-4 px-5 py-3 ${i < dataLines.length - 1 ? 'border-b border-slate-200 dark:border-white/10' : ''}`}
                >
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 sm:w-48 shrink-0 uppercase tracking-wide">{label}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{value}</span>
                </div>
              );
            })}
          </div>
        );
      }
    }

    // Check if block is a list (lines starting with -)
    const listLines = lines.filter(l => /^\s*-\s/.test(l));
    if (listLines.length > 0) {
      // Merge continuation lines (lines that don't start with -)
      const items = [];
      let currentItem = '';
      for (const line of lines) {
        if (/^\s*-\s/.test(line)) {
          if (currentItem) items.push(currentItem);
          currentItem = line.replace(/^\s*-\s/, '').trim();
        } else if (currentItem && line.trim()) {
          currentItem += ' ' + line.trim();
        }
      }
      if (currentItem) items.push(currentItem);

      // If there was intro text before the list
      const introLines = [];
      for (const line of lines) {
        if (/^\s*-\s/.test(line)) break;
        if (line.trim()) introLines.push(line.trim());
      }

      return (
        <div key={key} className="space-y-2">
          {introLines.length > 0 && (
            <p className="leading-relaxed">{introLines.join(' ')}</p>
          )}
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Standard paragraph — join continuation lines
    return <p key={key} className="leading-relaxed">{lines.join(' ')}</p>;
  };

  if (hasLegalSeparators) {
    // Legal document: each section is separated by ━━━
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-[var(--space-lg)]">
        {sections.map((section, sIdx) => {
          const trimmed = section.trim();
          // Split section into blocks by double newline
          const blocks = trimmed.split(/\n\s*\n/).filter(b => b.trim().length > 0);

          if (blocks.length === 0) return null;

          // Check if first block is a CLÁUSULA header or major section title
          const firstBlock = blocks[0].trim();
          const isClausula = /^CLÁUSULA\s/i.test(firstBlock);
          const isMajorHeader = /^[A-ZÁÉÍÓÚÑÜ\s]{4,}$/.test(firstBlock.split('\n')[0].trim()) && firstBlock.split('\n').length <= 2;

          return (
            <div key={sIdx} className="space-y-[var(--space-md)]">
              {sIdx > 0 && <hr className="border-slate-200 dark:border-white/10 my-[var(--space-lg)]" />}
              {(isClausula || isMajorHeader) && (
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-start gap-3">
                  {isClausula && (() => { sectionCounter++; return null; })()}
                  {isClausula && (
                    <span className="flex items-center justify-center rounded-lg aspect-square w-[clamp(2rem,5vw,2.5rem)] bg-slate-100 dark:bg-white/10 shadow-sm border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-100 font-black shrink-0 transition-colors mt-0.5">
                      {sectionCounter}
                    </span>
                  )}
                  <span className="mt-1">{firstBlock.split('\n').map(l => l.trim()).join(' ')}</span>
                </h2>
              )}
              {blocks.slice(isClausula || isMajorHeader ? 1 : 0).map((block, bIdx) => renderBlock(block, `${sIdx}-${bIdx}`))}
            </div>
          );
        })}
      </div>
    );
  }

  // Markdown format
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-[var(--space-lg)]">
      {sections.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState('funcional');

  const tabs = [
    { id: 'funcional', label: 'Descripción Funcional (Sistema)', content: graphicContent },
    { id: 'codigo', label: 'Descripción Funcional (Código)', content: funcContent },
    { id: 'sprints', label: 'Sprints de Desarrollo', content: sprintsContent },
    { id: 'donacion', label: 'Términos de Donación', content: donacionContent },
  ];

  return (
    <div className="transition-colors duration-300 pb-[var(--space-3xl)]">
      <Helmet>
        <title>Documentación Interna | {SITE_NAME}</title>
        <meta property="og:url" content={`${BASE_URL}/admin/documentacion`} />
        <meta
          name="description"
          content={`Documentación técnica y organizativa del proyecto ${SITE_NAME}.`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="w-full">
        {/* Usamos el mismo diseño en contenedor que en TermsPage */}
        <div className="bg-white dark:bg-white/5 rounded-3xl p-[var(--space-xl)] sm:p-[var(--space-3xl)] shadow-360 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-[var(--space-xl)] border-b border-slate-200 dark:border-white/10 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-[var(--space-xs)] transition-colors">
                Documentación Interna Privada
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Archivos confidenciales: Sprints, arquitectura y términos legales de donación.
              </p>
              <div className="mt-4 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-xl px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"><path d="M12 9v4"/><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0z"/><path d="M12 17h.01"/></svg>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <span className="font-bold">Aviso de confidencialidad:</span> Esta documentación es de carácter estrictamente privado e interno. Los datos aquí contenidos <span className="font-semibold">no son visibles para el público</span> y no pueden ser accedidos por personas no autorizadas. El acceso a esta sección está restringido exclusivamente a administradores del sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - Glassmorphism style matching admin elements */}
          <div className="flex flex-wrap mb-[var(--space-xl)] gap-2 sm:gap-4 bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold transition-all flex-1 text-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-white/10'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content rendering */}
          <div className="relative mt-[var(--space-xl)]">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`transition-opacity duration-300 ${
                  activeTab === tab.id ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                {/* Switch between renderer types based on the tab */}
                {tab.id === 'sprints' ? (
                  <SprintsFormatter content={tab.content} />
                ) : (
                  <MarkdownRenderer content={tab.content} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
