# Documentación Técnica - I Nova Sv

Este documento contiene la arquitectura técnica del proyecto de e-commerce I Nova Sv.

## Stack Tecnológico
- React 19
- Vite 6
- Tailwind CSS v4
- Supabase (Backend/Database)

## Arquitectura Frontend
El proyecto sigue una arquitectura basada en componentes con React, donde las páginas principales se cargan de forma diferida (lazy loading) para optimizar el rendimiento.

- **Componentes (`src/components`)**: Elementos visuales reutilizables de la UI.
- **Páginas (`src/pages`)**: Vistas completas de la aplicación.
- **Contextos (`src/context`)**: Gestión del estado global (Auth, Cart, Favorites, Settings).
- **Servicios (`src/services`)**: Abstracción de la comunicación con Supabase.
- **Utilidades (`src/utils`)**: Funciones auxiliares.

## Flujo de Compra
El modelo de negocio no incluye pasarela de pagos integrada. El proceso de compra culmina generando un mensaje preformateado que redirige al usuario a WhatsApp, donde se concreta la transacción.

## Base de Datos
La base de datos actual utiliza Supabase.
Las tablas principales incluyen:
- `products`: Catálogo de accesorios para celulares.
- `categories`: Categorías de productos.
- `settings`: Configuración general del sitio.