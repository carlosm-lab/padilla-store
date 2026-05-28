
## Resumen Ejecutivo Automatizado
- Total archivos auditados: 90
- Total líneas revisadas: 12974
- Hallazgos críticos: 5
- Hallazgos altos: 87
- Hallazgos medios: 13
- Hallazgos bajos: 16

## Hallazgos Detallados
### C:\Users\usuar\Desktop\I Nova SV\src\components\admin\RecentProducts.jsx
- **Líneas auditadas:** 76
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 43
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\components\admin\TopFavorites.jsx
- **Líneas auditadas:** 75
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 38
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\components\FavoritesModal.jsx
- **Líneas auditadas:** 151
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 122
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\components\Footer.jsx
- **Líneas auditadas:** 74
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 32
  - *Código:* `© {new Date().getFullYear()} I Nova Sv. Todos los derechos reservados.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 55
  - *Código:* `© {new Date().getFullYear()} I Nova Sv. Todos los derechos reservados.`

### C:\Users\usuar\Desktop\I Nova SV\src\components\Logo.jsx
- **Líneas auditadas:** 22
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 7
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\components\ProductCard.jsx
- **Líneas auditadas:** 128
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 72
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\components\ShareModal.jsx
- **Líneas auditadas:** 172
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 61
  - *Código:* `? `Mira este producto en I Nova Sv: ${product.name}``
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 62
  - *Código:* `: `Mira esto en I Nova Sv`;`

### C:\Users\usuar\Desktop\I Nova SV\src\components\StructuredData.jsx
- **Líneas auditadas:** 72
- **SECURITY [CRÍTICO]**: dangerouslySetInnerHTML encontrado en línea 11
  - *Código:* `dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 23
  - *Código:* `"name": "I Nova Sv",`

### C:\Users\usuar\Desktop\I Nova SV\src\components\ui\CookieBanner.jsx
- **Líneas auditadas:** 58
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 19
  - *Código:* `localStorage.setItem('cookie_consent', 'true');`

### C:\Users\usuar\Desktop\I Nova SV\src\components\ui\UserAvatar.jsx
- **Líneas auditadas:** 31
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 19
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\config\constants.js
- **Líneas auditadas:** 78
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 52
  - *Código:* `export const SITE_NAME = "I Nova Sv";`

### C:\Users\usuar\Desktop\I Nova SV\src\context\CartContext.jsx
- **Líneas auditadas:** 396
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 4
  - *Código:* `// El corazón de la lógica de ventas en I Nova Sv. Maneja:`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 54
  - *Código:* `if (oldCart) { localStorage.setItem('pages_cart', oldCart); localStorage.removeItem('cart'); }`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 55
  - *Código:* `if (oldTime) { localStorage.setItem('pages_cart_timestamp', oldTime); localStorage.removeItem('cart_timestamp'); }`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 56
  - *Código:* `if (oldExp) { localStorage.setItem('pages_cart_was_expired', oldExp); localStorage.removeItem('cart_was_expired'); }`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 70
  - *Código:* `localStorage.setItem('pages_cart_was_expired', 'true');`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 136
  - *Código:* `localStorage.setItem('pages_cart', JSON.stringify(cartItems));`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 344
  - *Código:* `localStorage.setItem('pages_cart_timestamp', Date.now().toString());`

### C:\Users\usuar\Desktop\I Nova SV\src\context\FavoritesContext.jsx
- **Líneas auditadas:** 188
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 55
  - *Código:* `localStorage.setItem('pages_favorites', oldFavs);`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 68
  - *Código:* `localStorage.setItem('pages_favorites', JSON.stringify(valid));`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 123
  - *Código:* `localStorage.setItem('pages_favorites', JSON.stringify(updatedFavorites));`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 139
  - *Código:* `localStorage.setItem('pages_favorites', JSON.stringify(favorites));`

### C:\Users\usuar\Desktop\I Nova SV\src\context\__tests__\FavoritesContext.test.jsx
- **Líneas auditadas:** 90
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 81
  - *Código:* `localStorage.setItem('favorites', JSON.stringify([legacyId]));`

### C:\Users\usuar\Desktop\I Nova SV\src\hooks\useTheme.js
- **Líneas auditadas:** 48
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 26
  - *Código:* `localStorage.setItem(NEW_KEY, oldMode);`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 39
  - *Código:* `localStorage.setItem(NEW_KEY, 'dark');`
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 42
  - *Código:* `localStorage.setItem(NEW_KEY, 'light');`

### C:\Users\usuar\Desktop\I Nova SV\src\index.css
- **Líneas auditadas:** 118
- **BRAND [ALTO]**: Brand Color Inconsistency (Blue vs Red) encontrado en línea 5
  - *Código:* `--color-primary: #2563eb;`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\admin\DocumentationPage.jsx
- **Líneas auditadas:** 1515
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 9
  - *Código:* `I Nova Sv — PLAN DE DESARROLLO POR SPRINTS`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 10
  - *Código:* `Proyecto interno: I Nova Sv`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 161
  - *Código:* `2h  supabaseClient.js: singleton con storageKey 'I Nova Sv-auth' (evita conflictos`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 265
  - *Código:* `3h  useTheme.js: dark mode con persistencia 'I Nova Sv_theme', migración de key`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 304
  - *Código:* `3h  AuthContext.jsx: caché en sessionStorage (I Nova Sv_user, I Nova Sv_profile,`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 305
  - *Código:* `I Nova Sv_auth_cache_time) con TTL 1 hora`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 357
  - *Código:* `con escritura inmediata en localStorage (I Nova Sv_cart) como fuente primaria`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 374
  - *Código:* `(I Nova Sv_cart_timestamp) con notificación toast`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 453
  - *Código:* `NUNCA I Nova Sv_cart ni I Nova Sv_favorites`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 456
  - *Código:* `2h  Logo.jsx: icono Material Symbols + texto 'I Nova Sv', versiones sm/md/lg`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 502
  - *Código:* `→ src/I Nova Sv/admin/AdminLayout.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 506
  - *Código:* `→ src/I Nova Sv/admin/AdminLayout.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 635
  - *Código:* `→ src/I Nova Sv/HomePage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 639
  - *Código:* `→ src/I Nova Sv/HomePage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 642
  - *Código:* `→ src/I Nova Sv/HomePage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 646
  - *Código:* `→ src/I Nova Sv/HomePage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 650
  - *Código:* `→ src/I Nova Sv/CatalogPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 655
  - *Código:* `→ src/I Nova Sv/CatalogPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 659
  - *Código:* `→ src/I Nova Sv/CatalogPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 690
  - *Código:* `→ src/I Nova Sv/ProductDetailPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 694
  - *Código:* `→ src/I Nova Sv/ProductDetailPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 698
  - *Código:* `→ src/I Nova Sv/ProductDetailPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 702
  - *Código:* `→ src/I Nova Sv/ProductDetailPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 706
  - *Código:* `→ src/I Nova Sv/ProductDetailPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 710
  - *Código:* `→ src/I Nova Sv/ProductDetailPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 714
  - *Código:* `→ src/I Nova Sv/ContactPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 719
  - *Código:* `→ src/I Nova Sv/ContactPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 723
  - *Código:* `→ src/I Nova Sv/ContactPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 726
  - *Código:* `→ src/I Nova Sv/ContactPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 730
  - *Código:* `→ src/I Nova Sv/ContactPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 733
  - *Código:* `→ src/I Nova Sv/NotFoundPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 736
  - *Código:* `→ src/I Nova Sv/PrivacyPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 739
  - *Código:* `→ src/I Nova Sv/TermsPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 743
  - *Código:* `→ Todas las páginas en src/I Nova Sv/`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 780
  - *Código:* `→ src/I Nova Sv/admin/DashboardPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 784
  - *Código:* `→ src/I Nova Sv/admin/DashboardPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 788
  - *Código:* `→ src/I Nova Sv/admin/ProductsPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 793
  - *Código:* `→ src/I Nova Sv/admin/ProductsPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 820
  - *Código:* `→ src/I Nova Sv/admin/CategoriesPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 824
  - *Código:* `→ src/I Nova Sv/admin/MessagesPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 827
  - *Código:* `→ src/I Nova Sv/admin/FavoritesPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 830
  - *Código:* `→ src/I Nova Sv/admin/SettingsPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 835
  - *Código:* `→ src/I Nova Sv/admin/SettingsPage.jsx`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 963
  - *Código:* `const graphicContent = `I Nova Sv - descripción Gráfica`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 967
  - *Código:* `I Nova Sv es una aplicación web de catálogo comercial construida para un negocio de venta directa en El Salvador, cuyo modelo de operación se aleja deliberadamente de lo que se entiende por ecommerce convencional. No existe pasarela de pagos, no existe gestión de inventario, y el concepto de stock es irrelevante para su funcionamiento: todos los productos se consideran disponibles por definición, porque el negocio opera por pedido y el cierre de cada venta ocurre fuera del sistema, a través de una conversación en WhatsApp. La aplicación existe para un propósito acotado y bien definido: permitir que un visitante explore un catálogo visual, acumule productos en un carrito, y genere con un solo gesto un mensaje pre-formateado que abre WhatsApp con el pedido completo listo para enviar. Todo lo que ocurre después de ese momento — la confirmación de disponibilidad, la negociación del precio final, el acuerdo de entrega — sucede entre el comprador y la administradora sin ninguna mediación técnica. Esta decisión de diseño no es una limitación sino una elección que simplifica radicalmente la arquitectura y elimina toda la complejidad asociada a pagos, órdenes, reembolsos y estados de envío.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 1037
  - *Código:* `const funcContent = `# I Nova Sv — Descripción funcional del código`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 1041
  - *Código:* `I Nova Sv es una aplicación web de catálogo comercial construida para un negocio de venta directa en El Salvador que opera completamente al margen de los mecanismos convencionales del comercio electrónico. No existe pasarela de pagos, no existe gestión de inventario, y el concepto de stock es funcionalmente irrelevante: todos los productos se consideran disponibles por definición porque el negocio trabaja por pedido, y el cierre de cada venta ocurre fuera del sistema, a través de una conversación en WhatsApp entre el comprador y la administradora. La aplicación existe para un propósito deliberadamente acotado: permitir que un visitante explore un catálogo visual atractivo, acumule productos en un carrito, y con un solo gesto genere un mensaje pre-formateado que abre WhatsApp con el pedido completo listo para enviar. Todo lo que ocurre después de ese momento — la confirmación de disponibilidad, el acuerdo de precio final, la logística de entrega — sucede entre personas sin ninguna mediación técnica. Esta decisión de diseño no es una limitación técnica sino una elección que elimina radicalmente la complejidad asociada a pagos, órdenes, reembolsos y estados de envío, permitiendo que una sola persona administre el negocio completo sin infraestructura especializada. El sistema está construido sobre React 19 con Vite como bundler, Tailwind CSS en su versión 4 para estilos, y Supabase como backend completo que provee base de datos PostgreSQL, autenticación mediante Google OAuth, almacenamiento de archivos y suscripciones en tiempo real, todo desplegado en Vercel como aplicación estática.`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\CatalogPage.jsx
- **Líneas auditadas:** 281
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 142
  - *Código:* `<title>Catálogo | I Nova Sv</title>`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 145
  - *Código:* `<meta name="description" content="Explora nuestra colección completa de accesorios para celular, cases y más en I Nova Sv." />`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\ContactPage.jsx
- **Líneas auditadas:** 348
- **SECURITY [BAJO]**: localStorage without try/catch encontrado en línea 121
  - *Código:* `localStorage.setItem('last_contact_sent', Date.now().toString());`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 137
  - *Código:* `<title>Contacto | I Nova Sv</title>`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\HomePage.jsx
- **Líneas auditadas:** 189
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 53
  - *Código:* `<title>Inicio | I Nova Sv</title>`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 54
  - *Código:* `<meta name="description" content="Encuentra los mejores accesorios para tu celular en I Nova Sv." />`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 55
  - *Código:* `<meta property="og:title" content="I Nova Sv" />`
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 80
  - *Código:* `<img`
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 123
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\NotFoundPage.jsx
- **Líneas auditadas:** 24
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 8
  - *Código:* `<title>Página no encontrada - I Nova Sv</title>`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\PrivacyPage.jsx
- **Líneas auditadas:** 312
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 28
  - *Código:* `I Nova Sv es un servicio de catálogo comercial en línea operado desde El Salvador que permite a sus visitantes explorar productos, guardar favoritos, gestionar un carrito de compras y comunicarse con la administración del negocio a través del formulario de contacto integrado en la plataforma. Esta política describe de manera exhaustiva qué información recopila el servicio, cómo la utiliza, dónde la almacena, durante cuánto tiempo la conserva, con qué terceros la comparte, y qué derechos tiene usted como usuario sobre sus propios datos. La política aplica a todas las personas que accedan a la plataforma, independientemente de si han creado una cuenta o si navegan como visitantes anónimos, y cubre tanto la información recopilada activamente a través de formularios e interacciones como la información recopilada de forma pasiva a través del funcionamiento técnico del servicio.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 44
  - *Código:* `El responsable del tratamiento de los datos personales recopilados a través de esta plataforma es I Nova Sv, negocio de venta directa operado en El Salvador. Las consultas relacionadas con el tratamiento de datos personales pueden dirigirse a través del formulario de contacto disponible en la plataforma o mediante el número de WhatsApp habilitado para comunicación comercial.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 75
  - *Código:* `El servicio utiliza Supabase como proveedor de infraestructura de base de datos y autenticación. Como parte del funcionamiento normal de ese servicio, se registran ciertos datos técnicos asociados a las conexiones y operaciones realizadas, incluyendo potencialmente direcciones IP y marcas de tiempo de las solicitudes. Esta información es gestionada por Supabase según sus propias políticas de privacidad y retención de datos, que son independientes de las de I Nova Sv. Los errores técnicos que se producen durante el uso de la plataforma se envían a nuestra base de datos en una tabla de registros del sistema que contiene el nivel de severidad del error, un mensaje descriptivo, información de contexto técnico y la marca de tiempo del evento. Esta información se utiliza exclusivamente para la detección y corrección de problemas técnicos y no contiene datos de identificación personal de los usuarios salvo que esos datos formen accidentalmente parte del mensaje de error.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 123
  - *Código:* `La plataforma comparte información con un número limitado de proveedores de servicios técnicos que son necesarios para su funcionamiento. Supabase, proveedor estadounidense de servicios de base de datos e infraestructura en la nube, procesa y almacena todos los datos de la plataforma en sus servidores. Supabase actúa como encargado del tratamiento bajo las instrucciones de I Nova Sv y opera bajo sus propias certificaciones de seguridad y cumplimiento. Google, como proveedor del sistema de autenticación OAuth, recibe la solicitud de autenticación cuando usted elige iniciar sesión y transfiere a la plataforma la información de perfil descrita anteriormente, pero no recibe de vuelta información sobre su actividad dentro de la plataforma. Cloudflare, proveedor del sistema de verificación antispam Turnstile utilizado en el formulario de contacto, procesa información técnica del navegador para determinar si el envío del formulario proviene de un usuario humano. Vercel, proveedor de servicios de alojamiento web, sirve la aplicación desde sus servidores de distribución de contenido y puede registrar información técnica de las solicitudes HTTP según sus propias políticas. La plataforma no comparte datos personales con ningún otro tercero, no vende datos a anunciantes, y no transfiere información a plataformas de análisis de comportamiento de usuarios.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 225
  - *Código:* `Los datos recopilados por esta plataforma son procesados y almacenados por Supabase, cuya infraestructura puede estar ubicada en servidores situados fuera de El Salvador, incluyendo potencialmente servidores en los Estados Unidos de América o en otras jurisdicciones. Al utilizar esta plataforma usted acepta que sus datos pueden ser transferidos y procesados en esas jurisdicciones, que pueden tener leyes de protección de datos distintas a las de su país de residencia. Vercel, como proveedor de distribución de contenido, también opera una red de servidores distribuida globalmente. I Nova Sv selecciona proveedores que ofrecen garantías contractuales razonables sobre la protección de los datos que procesan en su nombre.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 253
  - *Código:* `Es importante destacar un aspecto particular del modelo de negocio de I Nova Sv que tiene implicaciones directas sobre la privacidad. A diferencia de un ecommerce convencional donde toda la transacción ocurre dentro del sistema y los datos del pedido quedan bajo el control exclusivo del operador de la plataforma, el cierre de cada venta en este servicio ocurre a través de WhatsApp, que es una plataforma de terceros con sus propias políticas de privacidad y condiciones de uso.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 257
  - *Código:* `Cuando usted confirma un pedido y el sistema abre WhatsApp con el mensaje pre-formateado, ese mensaje contiene la lista de productos seleccionados, las cantidades, los precios y cualquier nota personalizada que usted haya añadido. A partir de ese momento, esa información queda sujeta a las políticas de Meta Platforms y de WhatsApp, sobre las cuales I Nova Sv no tiene ningún control ni responsabilidad. Si usted tiene preocupaciones sobre el tratamiento de sus datos por parte de WhatsApp, le recomendamos consultar las políticas de privacidad de esa plataforma antes de proceder con el envío del mensaje. La plataforma no almacena el contenido de los mensajes enviados por WhatsApp ni tiene acceso a la conversación que se desarrolla a partir de ese punto.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 303
  - *Código:* `Esta política de privacidad está vigente desde su publicación y refleja las prácticas de tratamiento de datos implementadas en la versión actual de la plataforma I Nova Sv. Última actualización: Marzo 2026.`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\ProductDetailPage.jsx
- **Líneas auditadas:** 286
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 92
  - *Código:* `<title>{product.name} | I Nova Sv</title>`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 94
  - *Código:* `<meta property="og:title" content={`${product.name} | I Nova Sv`} />`
- **SEO [ALTO]**: Missing alt attribute encontrado en línea 276
  - *Código:* `<img`

### C:\Users\usuar\Desktop\I Nova SV\src\pages\TermsPage.jsx
- **Líneas auditadas:** 451
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 28
  - *Código:* `Al acceder, navegar o utilizar de cualquier manera la plataforma web de I Nova Sv, usted declara haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones de Uso. Esta aceptación es inmediata y automática desde el momento en que usted accede a cualquier página de la plataforma, independientemente de si ha creado una cuenta, de si ha realizado alguna compra, o de si ha interactuado con alguna funcionalidad específica del servicio. Si usted no está de acuerdo con alguno de los términos aquí establecidos, debe abstenerse de utilizar la plataforma de forma inmediata y no volver a acceder a ella hasta que los términos sean de su conformidad o hasta que haya obtenido una aclaración por escrito del operador del servicio.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 31
  - *Código:* `Estos términos constituyen un acuerdo legalmente vinculante entre usted, en su calidad de usuario de la plataforma, y I Nova Sv, en su calidad de operador del servicio. La relación entre las partes se rige exclusivamente por los presentes términos y por la legislación aplicable de la República de El Salvador. Cualquier uso continuado de la plataforma después de la publicación de modificaciones a estos términos constituirá aceptación tácita de dichas modificaciones.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 44
  - *Código:* `I Nova Sv opera como una plataforma de catálogo comercial en línea cuyo propósito es exhibir productos disponibles para la venta y facilitar el contacto entre compradores interesados y la administración del negocio. La plataforma no es una tienda en línea en el sentido convencional del término: no procesa pagos, no gestiona inventario en tiempo real, no garantiza la disponibilidad inmediata de ningún producto, y no constituye por sí misma un contrato de compraventa. La plataforma es un medio de presentación y comunicación, no un sistema de transacciones comerciales automatizadas.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 252
  - *Código:* `El desarrollador del sistema que construyó y mantiene la infraestructura tecnológica de la plataforma actúa en calidad de prestador de servicios técnicos y no tiene participación alguna en las decisiones comerciales del negocio, en la determinación de los precios, en la gestión del inventario, en las políticas de devolución, ni en ningún otro aspecto operativo del negocio de I Nova Sv. El desarrollador no es responsable por ninguna pérdida, daño, perjuicio o reclamación de ningún tipo que derive del uso de la plataforma, de las transacciones realizadas a través de ella, de la información publicada en el catálogo, o de cualquier otro aspecto del funcionamiento del negocio. El usuario reconoce expresamente que el desarrollador es un tercero ajeno a cualquier relación comercial que pudiera establecerse entre el usuario y el negocio, y renuncia expresamente a cualquier reclamación contra el desarrollador relacionada con el uso de la plataforma o con cualquier transacción comercial.`
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 442
  - *Código:* `Los presentes Términos y Condiciones de Uso están vigentes desde su publicación y son aplicables a todos los usuarios de la plataforma I Nova Sv. Última actualización: Marzo 2026.`

### C:\Users\usuar\Desktop\I Nova SV\src\utils\productUtils.js
- **Líneas auditadas:** 72
- **BRAND [ALTO]**: Brand Inconsistency: I Nova Sv (should be I Nova SV) encontrado en línea 4
  - *Código:* `// Las ofertas en I Nova Sv tienen 3 estados posibles:`

### C:\Users\usuar\Desktop\I Nova SV\landing\code.html
- **Líneas auditadas:** 355
- **BRAND [CRÍTICO]**: Brand Inconsistency: ESSENTIALS encontrado en línea 6
  - *Código:* `<title>ESSENTIALS | Accesorios Premium para Móviles</title>`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 129
  - *Código:* `<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Shop</a>`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 130
  - *Código:* `<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">New</a>`
- **BRAND [CRÍTICO]**: Brand Inconsistency: ESSENTIALS encontrado en línea 133
  - *Código:* `ESSENTIALS`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 170
  - *Código:* `<a class="snap-start shrink-0 w-64 md:w-1/3 group relative rounded-2xl overflow-hidden bg-surface-container-low aspect-[4/5] md:aspect-square flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300" href="#">`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 179
  - *Código:* `<a class="snap-start shrink-0 w-64 md:w-1/3 group relative rounded-2xl overflow-hidden bg-surface-container-low aspect-[4/5] md:aspect-square flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300" href="#">`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 188
  - *Código:* `<a class="snap-start shrink-0 w-64 md:w-1/3 group relative rounded-2xl overflow-hidden bg-surface-container-low aspect-[4/5] md:aspect-square flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300" href="#">`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 202
  - *Código:* `<a class="font-body-md text-body-md text-primary hover:text-surface-tint transition-colors underline decoration-1 underline-offset-4" href="#">Ver todos</a>`
- **BRAND [CRÍTICO]**: Brand Inconsistency: ESSENTIALS encontrado en línea 299
  - *Código:* `ESSENTIALS`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 302
  - *Código:* `<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors" href="#">Privacy</a>`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 303
  - *Código:* `<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors" href="#">Terms</a>`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 304
  - *Código:* `<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors" href="#">Shipping</a>`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 305
  - *Código:* `<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors" href="#">Contact</a>`
- **BRAND [CRÍTICO]**: Brand Inconsistency: ESSENTIALS encontrado en línea 308
  - *Código:* `© 2024 ESSENTIALS ACCESSORIES`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 317
  - *Código:* `<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim active:scale-90 transition-transform duration-150 w-16" href="#">`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 321
  - *Código:* `<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim active:scale-90 transition-transform duration-150 w-16" href="#">`
- **A11Y [MEDIO]**: Empty href (href="#") encontrado en línea 325
  - *Código:* `<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim active:scale-90 transition-transform duration-150 w-16 relative" href="#">`

