-- 021_missing_fk_indexes.sql
-- Phase 2 DB Audit: Agregando índices para claves foráneas

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_product_id ON public.user_favorites(product_id);
