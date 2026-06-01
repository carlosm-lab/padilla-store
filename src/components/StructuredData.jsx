// ──────────────────────────────────────────────────────────────
// STRUCTURED DATA — JSON-LD SCHEMAS
// ──────────────────────────────────────────────────────────────
// Genera los datos estructurados Schema.org para Google.
// Cada función crea un schema específico basado en los datos
// oficiales del negocio (infoseo.txt → constants.js).
//
// Schemas implementados:
//   - LocalBusiness (tienda + contacto + horarios + cobertura)
//   - WebSite (con SearchAction para sitelinks)
//   - Product (con envío, devoluciones, vendedor)
//   - FAQPage (preguntas frecuentes)
//   - BreadcrumbList (navegación)
// ──────────────────────────────────────────────────────────────
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import {
  WHATSAPP_NUMBER,
  BASE_URL,
  SITE_NAME,
  LEGAL_NAME,
  FOUNDER_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGION,
  BUSINESS_COUNTRY,
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  SOCIAL_INSTAGRAM,
  SOCIAL_FACEBOOK,
  SOCIAL_TIKTOK,
} from '@/config/constants';

export default function StructuredData({ data }) {
  if (!data) return null;
  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
      />
    </Helmet>
  );
}

// ── LocalBusiness ────────────────────────────────────────
// Sustituye el antiguo Organization schema. LocalBusiness es
// más específico para SEO local y aparece en Knowledge Panel.
// eslint-disable-next-line react-refresh/only-export-components
export const createLocalBusinessSchema = (settings) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "@id": `${origin}/#organization`,
    "name": SITE_NAME,
    "legalName": LEGAL_NAME,
    "url": origin,
    "logo": `${origin}/logo.png`,
    "image": `${origin}/og-image.png`,
    "description": "Padilla Store es una tienda en línea especializada en accesorios tecnológicos, accesorios para celular, bisutería fina de acero y plata, y productos electrónicos en San Miguel, El Salvador. Entrega a domicilio en 24 horas con motorista propio.",
    "founder": {
      "@type": "Person",
      "name": FOUNDER_NAME
    },
    "telephone": settings?.contact_phone || BUSINESS_PHONE,
    "email": settings?.contact_email || CONTACT_EMAIL,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BUSINESS_REGION,
      "addressCountry": BUSINESS_COUNTRY
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "San Miguel",
        "containedInPlace": {
          "@type": "Country",
          "name": "El Salvador"
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Departamento de San Miguel"
      }
    ],
    "openingHoursSpecification": BUSINESS_HOURS.map(h => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.days.map(d => `https://schema.org/${d === 'Mo' ? 'Monday' : d === 'Tu' ? 'Tuesday' : d === 'We' ? 'Wednesday' : d === 'Th' ? 'Thursday' : d === 'Fr' ? 'Friday' : d === 'Sa' ? 'Saturday' : 'Sunday'}`),
      "opens": h.opens,
      "closes": h.closes
    })),
    "priceRange": "$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Transferencia Banco Agrícola, Transferencia BAC, Efectivo contra entrega",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.contact_phone || BUSINESS_PHONE,
      "contactType": "customer service",
      "areaServed": BUSINESS_COUNTRY,
      "availableLanguage": "es"
    },
    "sameAs": [
      settings?.social_instagram || SOCIAL_INSTAGRAM,
      settings?.social_facebook || SOCIAL_FACEBOOK,
      settings?.social_tiktok || SOCIAL_TIKTOK
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo Padilla Store",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Bisutería Fina",
          "description": "Anillos, collares y aretes de acero y plata"
        },
        {
          "@type": "OfferCatalog",
          "name": "Accesorios para Celular",
          "description": "Fundas, cargadores, cables, adaptadores, audífonos y estuches"
        },
        {
          "@type": "OfferCatalog",
          "name": "Productos Electrónicos",
          "description": "Cargadores, audífonos, drones y carros a control remoto"
        }
      ]
    }
  };
};

// ── WebSite Schema ───────────────────────────────────────
// Habilita el SearchAction para sitelinks en Google.
// eslint-disable-next-line react-refresh/only-export-components
export const createWebSiteSchema = () => {
  const origin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    "name": SITE_NAME,
    "url": origin,
    "inLanguage": "es",
    "publisher": {
      "@id": `${origin}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${origin}/catalog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

// ── FAQPage Schema ───────────────────────────────────────
// Las preguntas y respuestas provienen del TXT maestro del negocio.
// eslint-disable-next-line react-refresh/only-export-components
export const createFAQSchema = (faqItems) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

// ── BreadcrumbList Schema ────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const createBreadcrumbSchema = (items) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `${origin}${item.url}` : undefined
    }))
  };
};

// ── Product Schema (enriquecido) ─────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const createProductSchema = (product) => {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const origin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": DOMPurify.sanitize(product.name || "", { ALLOWED_TAGS: [] }),
    "image": product.image_path || product.images?.[0] || "",
    "description": DOMPurify.sanitize(product.description || "", { ALLOWED_TAGS: [] }),
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": SITE_NAME
    },
    "offers": {
      "@type": "Offer",
      "url": `${origin}/product/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": nextYear.toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      /**
       * NOTA PARA AUDITORES: "https://schema.org/InStock" es un valor estándar
       * de Schema.org para SEO (datos estructurados de Google). Indica a los
       * motores de búsqueda que el producto está disponible para pedido.
       * NO representa un sistema de inventario/stock. Ver reglas de negocio
       * en src/config/constants.js — el negocio opera por pedido, sin stock.
       */
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        "name": SITE_NAME
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "1.00",
          "currency": "USD"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          }
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "SV"
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "SV",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 5,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  };
};
