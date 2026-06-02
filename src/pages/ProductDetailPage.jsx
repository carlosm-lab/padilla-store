import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/formatPrice';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import StructuredData, { createProductSchema, createBreadcrumbSchema } from '@/components/StructuredData';
import ShareModal from '@/components/ShareModal';
import { isOfferActive as isOfferActiveUtil, isOfferScheduled as isOfferScheduledUtil } from '@/utils/productUtils';
import OfferCountdown from '@/components/OfferCountdown';
import { BASE_URL, SITE_NAME } from '@/config/constants';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user, showAuthModal } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Bloquear el scroll del background cuando el modal de imagen esté abierto
  useBodyScrollLock(isImageModalOpen);

  const { product, loading, error, refetch } = useProduct(slug);
  const { products: relatedProducts } = useProducts({
    category: product?.category,
    limit: 5,
    skip: !product
  });

  const [mainImg, setMainImg] = useState('');
  const [customNote, setCustomNote] = useState('');

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast.error('Error al cargar el producto');
        navigate('/');
      } else if (!product) {
        toast.error('Producto no encontrado');
        navigate('/');
      }
    }
  }, [loading, product, navigate, error]);

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMainImg(product.image_path || product.images?.[0] || '');
      setCustomNote('');
    }
  }, [product]);

  // Callback para refrescar datos cuando una oferta expira o inicia
  // (debe estar antes de los early returns para no violar las reglas de Hooks)
  const handleOfferExpire = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div className="flex-1 flex justify-center items-center py-24"><div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (!product) return null;

  // Related products
  const related = (relatedProducts || []).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!user) { showAuthModal('cart'); return; }
    addToCart(product, 1, null, customNote);
  };

  const handleToggleFavorite = (productId) => {
    if (!user) { showAuthModal('favorites'); return; }
    toggleFavorite(productId);
  };

  const getOgDescription = () => {
    if (!product.description) return '';
    return product.description.length > 150 ? product.description.substring(0, 147) + '...' : product.description;
  };

  const isOfferActive = isOfferActiveUtil(product);

  const getCatalogUrl = () => {
    if (product?.categories?.slug === 'joyeria') {
      return '/catalog-joyeria';
    }
    return '/catalog-tecnologia';
  };

  return (
    <>
      <Helmet>
        <title>{product.name.replace(/iphon/i, 'iPhone')} | Padilla Store — Tienda en Línea San Miguel</title>
        <meta name="description" content={getOgDescription()} />
        <meta property="og:title" content={`${product.name.replace(/iphon/i, 'iPhone')} | ${SITE_NAME}`} />
        <meta property="og:image" content={mainImg} />
        <meta property="og:description" content={getOgDescription()} />
        <meta property="og:url" content={`${BASE_URL}/product/${product.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name.replace(/iphon/i, 'iPhone')} | ${SITE_NAME}`} />
        <meta name="twitter:description" content={getOgDescription()} />
        <meta name="twitter:image" content={mainImg} />
        <link rel="canonical" href={`${BASE_URL}/product/${product.slug}`} />
      </Helmet>
      <StructuredData data={createProductSchema(product, `${BASE_URL}/product/${product.slug}`)} />
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Inicio', url: '/' },
        { name: 'Catálogo', url: getCatalogUrl() },
        { name: (product.categories?.name || product.category || 'Productos').replace(/iphon/i, 'iPhone').replace(/\b\w/g, c => c.toUpperCase()), url: `${getCatalogUrl()}?category=${product.categories?.slug || ''}` },
        { name: product.name.replace(/iphon/i, 'iPhone') }
      ])} />

      <main className="flex-1 px-container py-[var(--space-lg)]">
        {/* 1. Arquitectura de Layout y Proporciones: Grid 45/55 aprox (60/40) con gap-12 */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_1fr] gap-12 items-start">
          
          {/* Columna Izquierda: Sticky top-24 (Solo en Desktop) */}
          <div className="md:sticky md:top-24 flex flex-col-reverse md:flex-row gap-5 md:gap-7 items-start w-full min-w-0">
            
            {/* Sistema de miniaturas un lateral en desktop, fila abajo en móvil */}
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-24 shrink-0 md:max-h-[600px] overflow-x-auto md:overflow-y-auto no-scrollbar pb-2 md:pb-0 min-w-0">
              {/* Imágenes reales de la galería */}
              {(product.images?.length > 0 ? product.images : (product.image_path ? [product.image_path] : [])).map((img, i) => (
                <button
                  key={`img-${i}`}
                  type="button"
                  onClick={() => setMainImg(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-gray-50 dark:bg-white/10 ${mainImg === img ? 'border-primary shadow-sm' : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600'}`}
                >
                  <img src={img || '/logo.png'} alt={`${product.name} thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-center" />
                </button>
              ))}

              {/* Bocetos vacíos ( placeholders ) para mantener el diseño de la galería */}
              {Array.from({ length: Math.max(0, 4 - (product.images?.length > 0 ? product.images.length : (product.image_path ? 1 : 0))) }).map((_, i) => (
                <div 
                  key={`empty-${i}`} 
                  className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Sutil Línea Divisoria Vertical (Solo visible en Desktop) */}
            <div className="hidden md:block w-px bg-slate-200 dark:bg-slate-700/50 self-stretch shrink-0 mt-2 mb-2 rounded-full"></div>

            {/* Imagen Principal: max-h-[600px] object-cover rounded-xl (tamaño original) */}
            <div className="w-full md:flex-1 relative bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm min-w-0">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="cursor-zoom-in group relative w-full flex items-center justify-center"
              >
                <img 
                  src={mainImg || '/logo.png'} 
                  alt={product.name} 
                  fetchpriority="high" 
                  loading="eager" 
                  className="w-full h-auto max-h-[600px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-white text-5xl drop-shadow-md">zoom_in</span>
                </div>
              </button>
              
              {/* Botón de Favorito reubicado superpuesto en la esquina superior derecha */}
              <button
                onClick={() => handleToggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md shadow-md transition-all hover:scale-110"
                aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <span className={`material-symbols-outlined ${isFavorite(product.id) ? 'text-primary' : 'text-slate-400 dark:text-slate-300'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Información */}
          <div className="flex flex-col gap-6 min-w-0">
            
            {/* Breadcrumbs Semánticos y Capitalizados */}
            <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 dark:text-slate-400 gap-2 items-center whitespace-nowrap overflow-x-auto pb-1">
              <ol className="flex items-center gap-2">
                <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
                <li><Link to={getCatalogUrl()} className="hover:text-primary transition-colors">Catálogo</Link></li>
                <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
                <li>
                  <span className="text-primary font-medium truncate capitalize">
                    {(product.categories?.name || product.category || 'Productos').replace(/iphon/i, 'iPhone').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="min-w-0 flex flex-col gap-4">
              {/* 2. Jerarquía Tipográfica: Título H1 optimizado text-4xl font-extrabold text-gray-900 */}
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight min-w-0 break-words">
                {product.name.replace(/iphon/i, 'iPhone')}
              </h1>
              
              {/* Reconstrucción de la Descripción: Viñetas técnicas sin texto promocional, resolviendo overflow */}
              <div className="w-full min-w-0 overflow-hidden">
                <ul className="text-slate-600 dark:text-slate-400 text-base space-y-2 list-disc list-inside">
                  <li><strong>Material:</strong> Cuero vegano</li>
                  <li><strong>Protección:</strong> Contra caídas de 2 metros</li>
                  <li><strong>Compatibilidad:</strong> Compatible con carga MagSafe</li>
                </ul>
              </div>
            </div>

            {/* 3. UX y Optimización de la "Buy Box" (Bloque cohesivo sin líneas divisorias) */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
              
              {/* Precio más inmediato y visual text-2xl font-bold */}
              <div className="flex flex-col gap-1">
                <div className="flex items-end gap-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                  {isOfferActive && (
                    <p className="text-lg text-slate-400 line-through font-medium">
                      {formatPrice(product.old_price)}
                    </p>
                  )}
                </div>
                {(isOfferActive || isOfferScheduledUtil(product)) && product.offer_ends_at && (
                  <OfferCountdown
                    offer_ends_at={product.offer_ends_at}
                    offer_starts_at={product.offer_starts_at}
                    variant="detail"
                    onExpire={handleOfferExpire}
                  />
                )}
              </div>

              {/* Campo de Personalización en Acordeón (Collapsible) */}
              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between list-none font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[1.125rem]">edit_note</span>
                    <span>¿Necesitas personalizar tu pedido?</span>
                  </div>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-3">
                  <textarea
                    className="w-full p-3 rounded-xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    id="custom-note"
                    placeholder="Ej. Talla de anillo, grabado especial, modelo exacto... (Máx. 500 caracteres)"
                    rows="2"
                    maxLength={500}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                  ></textarea>
                </div>
              </details>

              {/* Botón de Acción Principal y Compartir agrupados */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Añadir al carrito
                </button>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-14 flex-shrink-0 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-300 flex items-center justify-center bg-slate-100 dark:bg-transparent"
                  title="Compartir"
                >
                  <span className="material-symbols-outlined text-primary">share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">También Te Puede Gustar</h2>
              <Link to={getCatalogUrl()} className="text-primary font-bold text-sm hover:underline">Ver Todo</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group flex flex-col gap-3 cursor-pointer">
                  <div className="aspect-square rounded-2xl overflow-hidden relative bg-gray-50 dark:bg-white/10 border border-slate-100 dark:border-white/5 shadow-sm">
                    <img src={p.image_path || p.images?.[0] || '/logo.png'} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 z-10 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleFavorite(p.id); }}
                        className="p-1 transition-all duration-300 hover:scale-110 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                      >
                        <span
                          className={`material-symbols-outlined text-[1.125rem] transition-colors ${isFavorite(p.id) ? 'text-primary' : 'text-slate-400 dark:text-slate-300'}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          favorite
                        </span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{p.name.replace(/iphon/i, 'iPhone')}</h4>
                    <p className="text-primary font-bold">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
        url={`${BASE_URL}${location.pathname}`}
      />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsImageModalOpen(false)}></div>

          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/60 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-12 h-12 flex items-center justify-center transition-all z-20"
            aria-label="Cerrar imagen"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <img
            src={mainImg || '/logo.png'}
            alt={product.name}
            className="relative z-10 w-auto h-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] sm:max-w-[calc(100vw-6rem)] sm:max-h-[calc(100vh-6rem)] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
