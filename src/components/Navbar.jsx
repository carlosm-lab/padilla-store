import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import FavoritesModal from './FavoritesModal';
import Logo from './Logo';
import ThemeToggle from './ui/ThemeToggle';
import UserAvatar from './ui/UserAvatar';


export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const { user, isAdmin, signOut, authModalContext, showAuthModal, hideAuthModal } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Trigger bounce animation when cartCount changes (increases)
  const prevCount = useRef(cartCount);
  useEffect(() => {
    if (cartCount > prevCount.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(timer);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  // Determine if login modal should be open (local trigger OR context trigger)
  const isLoginOpen = isLoginModalOpen || authModalContext !== null;
  const loginContext = authModalContext || 'generic';

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
    hideAuthModal();
  };

  const handleOpenFavorites = () => {
    if (!user) {
      showAuthModal('favorites');
      return;
    }
    setIsFavoritesModalOpen(true);
  };
  const userMenuRef = useRef(null);



  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex items-center justify-between border-b border-[#E5E3E0] dark:border-white/5 bg-[#F5F3F0]/95 dark:bg-[#1D1E20]/95 backdrop-blur-md px-container h-[var(--navbar-height)] sticky top-0 z-50">
        <div className="flex items-center gap-[clamp(1rem,3vw,2rem)]">
          <Logo />
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => `select-none px-4 py-2 text-[14px] font-medium transition-all ${isActive ? 'text-[#1C2035] dark:text-white font-semibold' : 'text-[#5E5B56] dark:text-slate-400 hover:text-[#1C2035] dark:hover:text-white'}`}>Inicio</NavLink>
            <NavLink to="/catalog" className={({ isActive }) => `select-none px-4 py-2 text-[14px] font-medium transition-all ${isActive ? 'text-[#1C2035] dark:text-white font-semibold' : 'text-[#5E5B56] dark:text-slate-400 hover:text-[#1C2035] dark:hover:text-white'}`}>Catálogo</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `select-none px-4 py-2 text-[14px] font-medium transition-all ${isActive ? 'text-[#1C2035] dark:text-white font-semibold' : 'text-[#5E5B56] dark:text-slate-400 hover:text-[#1C2035] dark:hover:text-white'}`}>Contacto</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-1.5 md:gap-3">
          <ThemeToggle />

          {/* Search Icon Button instead of input */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-10 h-10 text-[#1C2035] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            aria-label="Abrir buscador"
          >
            <span className="material-symbols-outlined font-light" style={{ fontSize: '24px' }}>search</span>
          </button>

          {/* Favorites Button */}
          <button 
            onClick={handleOpenFavorites} 
            aria-label="Abrir favoritos" 
            className="flex relative items-center justify-center w-10 h-10 text-[#1C2035] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined font-light" style={{ fontSize: '24px' }}>favorite</span>
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#1C2035] dark:bg-white text-white dark:text-[#1C2035] text-[9px] font-bold aspect-square w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
            )}
          </button>

          {/* Cart/Bag Button */}
          <button
            data-testid="cart-button"
            onClick={() => setIsCartOpen(true)}
            className="hidden md:flex relative items-center justify-center w-10 h-10 text-[#1C2035] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            aria-label="Abrir carrito"
          >
            <span className={`material-symbols-outlined font-light transition-transform duration-300 ${isBouncing ? 'scale-110' : ''}`} style={{ fontSize: '24px' }}>shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#1C2035] dark:bg-white text-white dark:text-[#1C2035] text-[9px] font-bold aspect-square w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center justify-center w-10 h-10 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors overflow-hidden shrink-0 cursor-pointer" aria-label="Menú de usuario" title="Menú de usuario">
                <UserAvatar user={user} className="w-8 h-8 rounded-full" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 backdrop-blur-sm rounded-xl shadow-360 border border-gray-100 dark:border-white/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-100 dark:border-white/5">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{user.user_metadata?.full_name || 'Usuario'}</p>
                    <p className="text-sm text-slate-500 dark:text-gray-300 truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors font-medium mb-1"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>admin_panel_settings</span>
                        Panel de Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors font-medium cursor-pointer"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center justify-center w-10 h-10 text-[#1C2035] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors shrink-0 cursor-pointer" aria-label="Ingresar" title="Mi Cuenta">
              <span className="material-symbols-outlined font-light" style={{ fontSize: '24px' }}>person</span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-white/5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe select-none">
        <div className="flex items-center justify-around h-16">
          <NavLink to="/" end className={({ isActive }) => `flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${isActive ? 'text-primary' : 'text-black dark:text-white'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>home</span>
            <span className="text-[10px] font-semibold">Inicio</span>
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${isActive ? 'text-primary' : 'text-black dark:text-white'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>storefront</span>
            <span className="text-[10px] font-semibold">Catálogo</span>
          </NavLink>
          <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center justify-center gap-0.5 w-full h-full text-black dark:text-white transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
            <span className="text-[10px] font-semibold">Buscar</span>
          </button>
          <NavLink to="/contact" className={({ isActive }) => `flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${isActive ? 'text-primary' : 'text-black dark:text-white'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>mail</span>
            <span className="text-[10px] font-semibold">Contacto</span>
          </NavLink>
          <button data-testid="cart-button-mobile" onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center justify-center gap-0.5 w-full h-full text-black dark:text-white transition-colors">
            <span className={`material-symbols-outlined transition-transform duration-300 ${isBouncing ? 'scale-125 text-primary' : ''}`} style={{ fontSize: '24px' }}>shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1/2 translate-x-4 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
            <span className={`text-[10px] font-semibold transition-colors duration-300 ${isBouncing ? 'text-primary' : ''}`}>Carrito</span>
          </button>
        </div>
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        context={loginContext}
      />

      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />
    </>
  );
}
