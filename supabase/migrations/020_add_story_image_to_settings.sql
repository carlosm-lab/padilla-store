-- 020_add_story_image_to_settings.sql
-- Agrega la columna story_image_url a store_settings para la
-- sección "Tu regalo, tu historia" de la página de inicio.
-- El formulario de administración ya tenía el campo de carga de imagen
-- pero la columna no estaba definida en el esquema.

ALTER TABLE public.store_settings
  ADD COLUMN IF NOT EXISTS story_image_url text;
