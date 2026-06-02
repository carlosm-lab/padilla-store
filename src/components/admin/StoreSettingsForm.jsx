import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSettings } from '@/context/SettingsContext';
import { logger } from '@/utils/logger';


export default function StoreSettingsForm({ showToast }) {
  const { settings, fetchSettings } = useSettings();
  const [formData, setFormData] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    contact_phone: '',
    contact_email: '',
    social_facebook: '',
    social_instagram: '',
    social_tiktok: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_description: settings.hero_description || '',
        contact_phone: settings.contact_phone || '',
        contact_email: settings.contact_email || '',
        social_facebook: settings.social_facebook || '',
        social_instagram: settings.social_instagram || '',
        social_tiktok: settings.social_tiktok || ''
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (!settings?.id) {
        throw new Error("No existing settings found to update.");
      }

      const { error } = await supabase
        .from('store_settings')
        .update({
          hero_title: formData.hero_title,
          hero_subtitle: formData.hero_subtitle,
          hero_description: formData.hero_description,
          contact_phone: formData.contact_phone,
          contact_email: formData.contact_email,
          social_facebook: formData.social_facebook,
          social_instagram: formData.social_instagram,
          social_tiktok: formData.social_tiktok,
        })
        .eq('id', settings.id);

      if (error) throw error;
      showToast('Configuración actualizada exitosamente.');
      await fetchSettings(); // refresh global context
    } catch (error) {
      logger.error('Error updating settings:', error);
      showToast('Error al actualizar la configuración.', true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-360 overflow-hidden flex flex-col mb-8">
      <div className="p-6 border-b border-slate-100 dark:border-white/5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">store</span>
          Configuración de la Tienda
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Modifica los textos principales, imagen del inicio y métodos de contacto generales.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Hero Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Hero Section (Inicio)</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="settings-hero-title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título Principal</label>
              <input 
                id="settings-hero-title"
                type="text" 
                name="hero_title"
                value={formData.hero_title}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="settings-hero-subtitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subtítulo</label>
              <textarea 
                id="settings-hero-subtitle"
                name="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={handleChange}
                required
                rows="2"
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            <div>
              <label htmlFor="settings-hero-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Texto Descriptivo (Párrafo)</label>
              <textarea 
                id="settings-hero-description"
                name="hero_description"
                value={formData.hero_description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Información de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="settings-contact-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Teléfono / WhatsApp</label>
              <input 
                id="settings-contact-phone"
                type="text" 
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="+503 1234 5678"
              />
              <p className="text-xs text-slate-500 mt-1">Este número se usará para los botones de enviar pedido por WhatsApp.</p>
            </div>
            <div>
              <label htmlFor="settings-contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
              <input 
                id="settings-contact-email"
                type="email" 
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Redes Sociales (URLs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="settings-social-facebook" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Facebook</label>
              <input 
                id="settings-social-facebook"
                type="url" 
                name="social_facebook"
                value={formData.social_facebook}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label htmlFor="settings-social-instagram" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Instagram</label>
              <input 
                id="settings-social-instagram"
                type="url" 
                name="social_instagram"
                value={formData.social_instagram}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label htmlFor="settings-social-tiktok" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">TikTok</label>
              <input 
                id="settings-social-tiktok"
                type="url" 
                name="social_tiktok"
                value={formData.social_tiktok}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="https://tiktok.com/@..."
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto justify-center bg-primary text-white font-bold py-3 sm:py-2 px-6 rounded-lg shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">save</span>
            )}
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
