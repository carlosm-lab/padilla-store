import { Link } from 'react-router-dom';
import { SITE_NAME, LEGAL_NAME, BUSINESS_PHONE, CONTACT_EMAIL, CONTACT_LOCATION } from '@/config/constants';

export default function Footer() {

  return (
    <footer className="mt-[var(--space-2xl)] border-t border-slate-200 dark:border-transparent bg-background-light dark:bg-background-dark py-[var(--space-xl)] px-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[var(--space-xl)]">
        <div className="flex flex-col gap-[var(--space-md)]">
          <span className="text-slate-900 dark:text-slate-100 font-bold text-[var(--text-base)]">{SITE_NAME}</span>
          <p className="text-[var(--text-sm)] text-slate-500 dark:text-slate-400">Tienda en línea de accesorios tecnológicos, bisutería fina de acero y plata, y productos electrónicos en San Miguel, El Salvador. Entrega a domicilio en 24 horas.</p>
          <p className="text-[var(--text-xs)] text-slate-400 dark:text-slate-500">{LEGAL_NAME}</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-[var(--space-md)]">Navegación</h4>
          <ul className="text-[var(--text-sm)] text-slate-500 dark:text-slate-400 space-y-[var(--space-xs)]">
            <li><Link className="hover:text-primary font-medium transition-colors" to="/">Inicio</Link></li>
            <li><Link className="hover:text-primary font-medium transition-colors" to="/catalog">Catálogo de productos</Link></li>
            <li><Link className="hover:text-primary font-medium transition-colors" to="/contact">Contacto</Link></li>
            <li><Link className="hover:text-primary font-medium transition-colors" to="/privacy">Política de Privacidad</Link></li>
            <li><Link className="hover:text-primary font-medium transition-colors" to="/terms">Términos de Servicio</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-[var(--space-md)]">Soporte y Atención</h4>
          <p className="text-[var(--text-sm)] text-slate-500 dark:text-slate-400 mb-[var(--space-md)]">
            ¿Tienes alguna duda sobre nuestros productos, envíos o devoluciones? Nuestro equipo está listo para ayudarte en cualquier momento.
          </p>
          <ul className="text-[var(--text-sm)] text-slate-500 dark:text-slate-400 space-y-[var(--space-xs)]">
            <li><Link className="hover:text-primary font-medium transition-colors" to="/contact">Contactar por WhatsApp o Correo</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-[var(--space-md)]">Contacto</h4>
          <address className="not-italic text-[var(--text-sm)] text-slate-500 dark:text-slate-400 space-y-[var(--space-xs)]">
            <p><a href={`tel:${BUSINESS_PHONE.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{BUSINESS_PHONE}</a></p>
            <p><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors break-all">{CONTACT_EMAIL}</a></p>
            <p>{CONTACT_LOCATION}</p>
            <p className="text-[var(--text-xs)] text-slate-400 dark:text-slate-500 pt-1">L-V: 8:00 AM – 6:00 PM | Sáb: 8:00 AM – 1:00 PM</p>
          </address>
        </div>
      </div>
      {/* Bottom Section - Copyright & Links */}
      <div className="mt-[var(--space-xl)] pt-[var(--space-lg)] border-t border-slate-200 dark:border-transparent text-[var(--text-xs)] text-slate-400 dark:text-slate-500">
        
        {/* Mobile Layout */}
        <div className="flex flex-col w-full gap-[var(--space-md)] md:hidden">
          {/* Copyright - Edge to Edge, Auto-scaling */}
          <p 
            className="w-full text-center whitespace-nowrap overflow-hidden font-medium" 
            style={{ fontSize: 'clamp(10px, 3.3vw, 14px)' }}
          >
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          
          {/* Credits - Edge to Edge, Auto-scaling */}
          <div className="w-full text-center whitespace-nowrap overflow-hidden">
            <a 
              href="https://www.confeccionesliss.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block w-full text-center hover:opacity-80 transition-opacity"
            >
              <code 
                className="font-mono bg-slate-100 dark:bg-white/10 py-1 px-2 rounded text-slate-500 dark:text-slate-400 inline-block w-full text-center"
                style={{ fontSize: 'clamp(9px, 3.2vw, 14px)' }}
              >
                &lt;<span className="text-primary">Patrocinado</span> <span className="text-pink-400">por</span>=<span className="font-semibold bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">"Confecciones Liss"</span> /&gt;
              </code>
            </a>
          </div>
          
          <div className="flex justify-center gap-[var(--space-lg)] w-full mt-[var(--space-xs)] text-[var(--text-xs)]">
            <Link className="hover:text-primary transition-colors" to="/privacy">Política de Privacidad</Link>
            <Link className="hover:text-primary transition-colors" to="/terms">Términos de Servicio</Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row justify-between items-center w-full gap-[var(--space-md)]">
          <div className="flex items-center gap-4">
            <p className="whitespace-nowrap">
              © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
            </p>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="inline-flex items-center transition-colors">
              <a 
                href="https://www.confeccionesliss.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity"
              >
                <code className="font-mono bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                  &lt;<span className="text-primary">Patrocinado</span> <span className="text-pink-400">por</span>=<span className="font-semibold bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">"Confecciones Liss"</span> /&gt;
                </code>
              </a>
            </div>
          </div>
          
          <div className="flex gap-[var(--space-lg)]">
            <Link className="hover:text-primary transition-colors" to="/privacy">Política de Privacidad</Link>
            <Link className="hover:text-primary transition-colors" to="/terms">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

