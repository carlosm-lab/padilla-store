import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Helmet } from 'react-helmet-async';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import StructuredData, { createBreadcrumbSchema, createCollectionSchema } from '@/components/StructuredData';

export default function JewelryCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();
  const filterMode = searchParams.get('filter') || '';
  
  const ITEMS_PER_PAGE = 15;

  const [sortBy, setSortBy] = useState('best-selling');
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  // State for filters
  const [filters, setFilters] = useState(() => ({
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    categories: searchParams.getAll('category'),
    onSaleOnly: searchParams.get('onSaleOnly') === 'true'
  }));

  const { categories: dbCategories } = useCategories();

  // Jewelry catalog categories only
  const jewelryCategories = useMemo(() => {
    return dbCategories.filter(cat => cat.catalog === 'joyeria');
  }, [dbCategories]);

  const activeCatalogSlugs = useMemo(() => {
    return jewelryCategories.map(cat => cat.slug);
  }, [jewelryCategories]);

  const queryCategories = useMemo(() => {
    if (filters.categories.length > 0) {
      return filters.categories;
    }
    return activeCatalogSlugs;
  }, [filters.categories, activeCatalogSlugs]);

  const { products: paginatedProducts, totalCount, loading: prodsLoading } = useProducts({
    catalog: 'joyeria',
    categories: queryCategories,
    search: filters.search,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    onSaleOnly: filters.onSaleOnly,
    sortBy: sortBy,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    filterFavorites: filterMode === 'favorites' ? favorites : null
  });

  // Update URL search params when filters or page change
  const isFirstRender = useRef(true);
  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let activePage = currentPage;
    if (prevFiltersRef.current !== filters) {
      activePage = 1;
      setCurrentPage(1);
      prevFiltersRef.current = filters;
    }

    setSearchParams(prevParams => {
      const merged = new URLSearchParams(prevParams);
      ['search', 'minPrice', 'maxPrice', 'category', 'onSaleOnly', 'page'].forEach(k => merged.delete(k));

      if (filters.search) merged.set('search', filters.search);
      if (filters.minPrice) merged.set('minPrice', filters.minPrice);
      if (filters.maxPrice) merged.set('maxPrice', filters.maxPrice);
      if (filters.onSaleOnly) merged.set('onSaleOnly', 'true');
      if (activePage > 1) merged.set('page', activePage.toString());

      filters.categories.forEach(cat => merged.append('category', cat));

      return merged;
    }, { replace: true });
  }, [filters, currentPage, setSearchParams]);

  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE);

  const handleCategoryClick = (catId) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(catId)
        ? prev.categories.filter(c => c !== catId)
        : [...prev.categories, catId];
      return { ...prev, categories: newCategories };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      categories: [],
      onSaleOnly: false
    });
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.categories.length > 0 ||
      filters.onSaleOnly ||
      filters.minPrice !== '' ||
      filters.maxPrice !== '' ||
      filters.search !== '' ||
      filterMode !== ''
    );
  }, [filters, filterMode]);

  // Only display Jewelry categories in sidebar
  const sidebarCategories = useMemo(() => {
    const filtered = dbCategories.filter(cat => activeCatalogSlugs.includes(cat.slug));
    return filtered.map(cat => ({
      id: cat.slug,
      name: cat.name,
      icon: cat.icon || 'category'
    }));
  }, [dbCategories, activeCatalogSlugs]);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.onSaleOnly) count++;
    if (filterMode === 'favorites') count++;
    return count;
  }, [filters, filterMode]);

  return (
    <>
      <Helmet>
        <title>Catálogo de Joyería de Acero y Bisutería | Padilla Store San Miguel</title>
        <meta name="description" content="Explora el catálogo de Joyería en Padilla Store: anillos, collares y aretes de acero inoxidable y bisutería fina con envío en 24h en San Miguel." />
        <meta property="og:title" content={`Catálogo de Joyería | ${SITE_NAME}`} />
        <meta property="og:description" content="Bisutería fina de acero y plata con entrega a domicilio en 24h en San Miguel." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={`${BASE_URL}/catalog-joyeria`} />
        <link rel="canonical" href={`${BASE_URL}/catalog-joyeria`} />
      </Helmet>
      <StructuredData data={createBreadcrumbSchema([
        { name: 'Inicio', url: '/' },
        { name: 'Joyería', url: '/catalog-joyeria' }
      ])} />
      <StructuredData data={createCollectionSchema(
        "Catálogo de Joyería de Acero y Bisutería", 
        "Explora el catálogo de Joyería en Padilla Store: anillos, collares y aretes de acero inoxidable y bisutería fina con envío en 24h en San Miguel.", 
        "/catalog-joyeria"
      )} />
      <main className="flex flex-1 flex-col lg:flex-row w-full px-container py-[var(--space-lg)] gap-[var(--space-lg)]">
        
        <FilterSidebar
          sidebarCategories={sidebarCategories}
          filters={filters}
          setFilters={setFilters}
          handleCategoryClick={handleCategoryClick}
        />

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Catálogo de Joyería</h1>
          {/* Desktop sort bar */}
          <div className="hidden lg:flex justify-between items-center mb-[var(--space-lg)]">
            <p className="text-[var(--text-sm)] text-slate-500 dark:text-slate-400 font-medium">
              Mostrando {totalCount === 0 ? 0 : Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalCount)}–{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} de {totalCount} productos
            </p>
            <div className="flex items-center gap-[var(--space-sm)]">
              <label htmlFor="catalog-sort" className="text-[var(--text-sm)] font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">Ordenar por:</label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select bg-transparent border-none text-[var(--text-sm)] font-bold text-primary focus:ring-0 cursor-pointer"
              >
                <option value="best-selling">Recomendados</option>
                <option value="newest">Más Nuevos</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Mobile top bar */}
          <div className="flex lg:hidden justify-between items-center mb-[var(--space-lg)]">
            <p className="text-[var(--text-sm)] text-slate-500 dark:text-slate-400 font-medium">
              {totalCount} producto{totalCount !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="relative flex items-center gap-[var(--space-xs)] px-[var(--space-md)] py-[var(--space-sm)] rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors font-medium text-[var(--text-sm)]"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 'var(--icon-md)' }}>tune</span>
              Filtros y Orden
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>

          {prodsLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalCount === 0 && (
                <div className="flex flex-col items-center justify-center py-[var(--space-3xl)] text-center">
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 mb-[var(--space-md)]" style={{ fontSize: '4rem' }}>search_off</span>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-[var(--space-sm)]">No se encontraron productos</p>
                  <button onClick={handleClearFilters} className="text-primary font-semibold hover:underline text-[var(--text-sm)]">Limpiar filtros</button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-[var(--space-xl)] gap-[var(--space-xs)]">
                  {currentPage === 1 ? (
                    <span className="w-11 min-w-[44px] min-h-[44px] aspect-square flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:text-slate-400 opacity-30">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </span>
                  ) : (
                    <Link
                      to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: Math.max(1, currentPage - 1) }).toString()}`}
                      onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      aria-label="Página anterior"
                      className="w-11 min-w-[44px] min-h-[44px] aspect-square flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </Link>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, index, array) => {
                      const prev = array[index - 1];
                      return (
                        <div key={page} className="flex items-center gap-[var(--space-xs)]">
                          {prev && page - prev > 1 && <span className="px-[var(--space-xs)] text-slate-400">...</span>}
                          <Link
                            to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page }).toString()}`}
                            onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            aria-label={`Ir a página ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                            className={`w-11 min-w-[44px] min-h-[44px] aspect-square flex items-center justify-center rounded-lg font-bold transition-all ${currentPage === page ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white'}`}
                          >
                            {page}
                          </Link>
                        </div>
                      );
                    })}
                    
                  {currentPage === totalPages ? (
                    <span className="w-11 min-w-[44px] min-h-[44px] aspect-square flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:text-slate-400 opacity-30">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </span>
                  ) : (
                    <Link
                      to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: Math.min(totalPages, currentPage + 1) }).toString()}`}
                      onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      aria-label="Página siguiente"
                      className="w-11 min-w-[44px] min-h-[44px] aspect-square flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <MobileFilterDrawer
        isFilterDrawerOpen={isFilterDrawerOpen}
        setIsFilterDrawerOpen={setIsFilterDrawerOpen}
        sidebarCategories={sidebarCategories}
        filters={filters}
        setFilters={setFilters}
        handleCategoryClick={handleCategoryClick}
        sortBy={sortBy}
        setSortBy={setSortBy}
        hasActiveFilters={hasActiveFilters}
        handleClearFilters={handleClearFilters}
        totalCount={totalCount}
      />
    </>
  );
}
