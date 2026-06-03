import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSettings } from '@/context/SettingsContext';
import { logger } from '@/utils/logger';
import ImageUploader from './ImageUploader';


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
    social_tiktok: '',
    bio_name: '',
    bio_description: '',
    bio_image_url: '',
    bio_links: []
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
        social_tiktok: settings.social_tiktok || '',
        bio_name: settings.bio_name || '',
        bio_description: settings.bio_description || '',
        bio_image_url: settings.bio_image_url || '',
        bio_links: settings.bio_links || []
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkToggle = (index) => {
    const newLinks = [...formData.bio_links];
    newLinks[index].is_active = !newLinks[index].is_active;
    setFormData(prev => ({ ...prev, bio_links: newLinks }));
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.bio_links];
    newLinks[index][field] = value;
    setFormData(prev => ({ ...prev, bio_links: newLinks }));
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
          bio_name: formData.bio_name,
          bio_description: formData.bio_description,
          bio_image_url: formData.bio_image_url,
          bio_links: formData.bio_links,
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

        {/* Links Page (Bio) Configuration */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Página de Links (Bio)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Imagen de Perfil</label>
              <ImageUploader 
                currentImage={formData.bio_image_url} 
                onUploadSuccess={(url) => setFormData(prev => ({...prev, bio_image_url: url}))}
                onRemoveImage={() => setFormData(prev => ({...prev, bio_image_url: ''}))}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="bio-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre a mostrar</label>
                <input 
                  id="bio-name"
                  type="text" 
                  name="bio_name"
                  value={formData.bio_name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="bio-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción</label>
                <textarea 
                  id="bio-description"
                  name="bio_description"
                  value={formData.bio_description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5">
            <h4 className="text-md font-bold mb-4 text-slate-900 dark:text-white">Enlaces Disponibles</h4>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {formData.bio_links.map((link, index) => (
                <div key={link.id || index} className={`bg-white dark:bg-[#1a1a24] p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 transition-colors ${link.is_active ? 'border-primary/40' : 'border-slate-200 dark:border-white/10 opacity-70'}`}>
                  <div className="flex items-center gap-3 md:w-1/4">
                    <button 
                      type="button" 
                      onClick={() => handleLinkToggle(index)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${link.is_active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                      role="switch"
                      aria-checked={link.is_active}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${link.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <i className={`${link.icon} text-xl ${link.iconColor}`}></i>
                    <span className="font-semibold truncate text-slate-900 dark:text-white" title={link.id}>{link.id}</span>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Nombre Visible</label>
                      <input 
                        type="text" 
                        value={link.name}
                        onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                        disabled={!link.is_active}
                        className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/10 rounded px-3 py-1.5 text-sm text-slate-900 dark:text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">URL (Destino)</label>
                      <input 
                        type="url" 
                        value={link.url}
                        onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                        disabled={!link.is_active}
                        className="w-full bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/10 rounded px-3 py-1.5 text-sm text-slate-900 dark:text-white disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {formData.bio_links.length === 0 && (
              <p className="text-sm text-slate-500 py-4 text-center">No hay enlaces configurados.</p>
            )}
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:justify-end" aria-live="polite">
          <button
            type="submit"
            disabled={isSaving}
            aria-busy={isSaving}
            className="w-full sm:w-auto justify-center bg-primary text-white font-bold py-3 sm:py-2 px-6 rounded-lg shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" aria-hidden="true"></span>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">save</span>
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
