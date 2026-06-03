-- =============================================================================
-- 015_add_bio_settings.sql
-- =============================================================================
-- Añade los campos necesarios para la configuración dinámica de la página de Links (Bio).
-- Incluye un JSONB para precargar los enlaces por defecto y poder activarlos/desactivarlos.
-- =============================================================================

ALTER TABLE public.store_settings
ADD COLUMN IF NOT EXISTS bio_name text DEFAULT 'Padilla Store',
ADD COLUMN IF NOT EXISTS bio_description text DEFAULT 'Accesorios tecnológicos, bisutería fina de acero y plata en San Miguel. Entrega a domicilio en 24h.',
ADD COLUMN IF NOT EXISTS bio_image_url text DEFAULT '/logo.svg',
ADD COLUMN IF NOT EXISTS bio_links jsonb DEFAULT '[
  {
    "id": "whatsapp",
    "name": "WhatsApp",
    "url": "https://api.whatsapp.com/send?phone=50374866909",
    "icon": "fa-brands fa-whatsapp",
    "iconColor": "text-[#25d366]",
    "is_active": true
  },
  {
    "id": "website",
    "name": "Página web",
    "url": "https://padillastore.com",
    "icon": "fa-solid fa-globe",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "facebook",
    "name": "Página de Facebook",
    "url": "https://facebook.com/padillastoresv",
    "icon": "fa-brands fa-facebook",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "facebook-admin",
    "name": "Perfil de Facebook",
    "url": "https://web.facebook.com/padillastoresv.admin/",
    "icon": "fa-brands fa-facebook",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "instagram",
    "name": "Instagram",
    "url": "https://instagram.com/padillastoresv",
    "icon": "fa-brands fa-instagram",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "tiktok",
    "name": "TikTok",
    "url": "https://tiktok.com/@padillastoresv",
    "icon": "fa-brands fa-tiktok",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "threads",
    "name": "Threads",
    "url": "https://www.threads.com/@padillastoresv",
    "icon": "fa-brands fa-threads",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "twitter",
    "name": "X (Twitter)",
    "url": "https://x.com/padillastoresv",
    "icon": "fa-brands fa-x-twitter",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "url": "https://www.youtube.com/@padillastoresv",
    "icon": "fa-brands fa-youtube",
    "iconColor": "text-[#ff0000]",
    "is_active": true
  },
  {
    "id": "linkedin",
    "name": "LinkedIn",
    "url": "https://www.linkedin.com/company/padillastoresv",
    "icon": "fa-brands fa-linkedin",
    "iconColor": "text-[#0a66c2]",
    "is_active": true
  },
  {
    "id": "pinterest",
    "name": "Pinterest",
    "url": "https://www.pinterest.com/padillastoresv",
    "icon": "fa-brands fa-pinterest",
    "iconColor": "text-[#bd081c]",
    "is_active": true
  },
  {
    "id": "marketplace",
    "name": "MarketPlace",
    "url": "https://web.facebook.com/marketplace/profile/padillastoresv/",
    "icon": "fa-solid fa-store",
    "iconColor": "",
    "is_active": true
  },
  {
    "id": "location",
    "name": "Ubicación",
    "url": "https://maps.app.goo.gl/search/San+Miguel,+El+Salvador",
    "icon": "fa-solid fa-map-location-dot",
    "iconColor": "text-[#ea4335]",
    "is_active": true
  }
]'::jsonb;

-- Trigger an update to fill the default values for the existing row
UPDATE public.store_settings SET bio_name = bio_name;
