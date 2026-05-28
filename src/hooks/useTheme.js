// ──────────────────────────────────────────────────────────────
// HOOK: useTheme (Dark Mode)
// ──────────────────────────────────────────────────────────────
// Maneja la preferencia dark/light del usuario.
// Persiste en localStorage bajo la key 'pages_theme'.
//
// Migración histórica: el proyecto usaba la key 'detalles_eternos_theme'. Si un usuario viejo
// tiene la key de tema anterior, se migra al nuevo formato para no romper UI.
// Este código de migración se puede eliminar ~6 meses después del
// rebranding (cuando ya no haya usuarios con la key vieja).
//
// El dark mode se aplica con la clase 'dark' en <html>,
// que Tailwind CSS v4 usa para sus variantes dark:.
// ──────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { safeLocalStorage } from '@/utils/storage';

const OLD_KEY = 'detalles_eternos_theme';  // Legacy — migración
const NEW_KEY = 'pages_theme';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Migrar key vieja si existe
      const oldMode = safeLocalStorage.getItem(OLD_KEY);
      if (oldMode) {
        safeLocalStorage.setItem(NEW_KEY, oldMode);
        safeLocalStorage.removeItem(OLD_KEY);
      }
      
      const savedMode = safeLocalStorage.getItem(NEW_KEY);
      return savedMode === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      safeLocalStorage.setItem(NEW_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeLocalStorage.setItem(NEW_KEY, 'light');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme: () => setIsDarkMode(prev => !prev) };
}
