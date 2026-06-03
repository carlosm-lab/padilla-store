-- =============================================================================
-- 016_add_bio_header_name.sql
-- =============================================================================
-- Añade un campo separado para el nombre del header de la página de Links (Bio).
-- =============================================================================

ALTER TABLE public.store_settings
ADD COLUMN IF NOT EXISTS bio_header_name text DEFAULT 'Padilla Store';

-- Inicializar con el valor existente de bio_name para mantener coherencia
UPDATE public.store_settings SET bio_header_name = bio_name WHERE bio_header_name IS NULL;
