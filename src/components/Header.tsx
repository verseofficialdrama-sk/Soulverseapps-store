import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, Heart, User, Settings, LogOut, Menu, X, 
  Bell, ChevronDown, CheckCircle, Award
} from 'lucide-react';

interface HeaderProps {
  onCartToggle: () => void;
  onLoginToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartToggle, onLoginToggle }) => {
  const { 
    currentUser, logoutUser, cart, activeTab, setActiveTab, settings,
    notifications, clearNotifications
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [bellDropdownOpen, setBellDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const defaultLinks = [
    { name: 'Home', tab: 'Home' },
    { name: 'Products', tab: 'Products' },
    { name: 'Services', tab: 'Services' },
    { name: 'Portfolio', tab: 'Portfolio' },
    { name: 'Blog', tab: 'Blog' },
    { name: 'About Us', tab: 'AboutUs' },
    { name: 'Contact', tab: 'Contact' },
    { name: 'FAQ', tab: 'FAQ' }
  ];

  const navLinks = settings.navigationMenu && settings.navigationMenu.length > 0 
    ? settings.navigationMenu.map(item => ({ name: item.label, tab: item.tab }))
    : defaultLinks;

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b-2 border-slate-900 bg-white/95 backdrop-blur-md">
      {/* Announcement Bar */}
      {settings.announcement && (
        <div className="w-full bg-slate-900 py-2 text-center text-[10px] font-bold tracking-widest text-white uppercase px-4 border-b-2 border-slate-900">
          {settings.announcement}
        </div>
      )}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('Home')} 
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="relative w-8 h-8 mr-1.5 bg-slate-900 rotate-45 flex items-center justify-center shrink-0 border border-slate-900 shadow-sm">
              <div className="w-3.5 h-3.5 bg-indigo-500 rotate-12"></div>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase font-display">
              {settings.logoText || 'Soulverse'}
            </span>
            <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-none uppercase font-mono">
              APPS
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-none ${
                  activeTab === link.tab
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Notifications / Live Logs Bell */}
          <div className="relative">
            <button
              onClick={() => setBellDropdownOpen(!bellDropdownOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-none border border-transparent hover:border-slate-200 transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-none bg-indigo-500" />
              )}
            </button>

            {bellDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-none border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] z-50">
                <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-display">Live App Updates</h3>
                  <button 
                    onClick={clearNotifications}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600"
                  >
                    Clear
                  </button>
                </div>
                <div className="mt-2 max-h-60 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400 font-medium">
                      No system notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif, index) => (
                      <div key={index} className="flex gap-2 text-xs text-slate-600 p-2.5 rounded-none border border-slate-100 bg-slate-50 font-mono">
                        <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{notif}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => handleNavClick('Products')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-none border border-transparent hover:border-slate-200 transition-colors relative hidden sm:block"
            title="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onCartToggle}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-none border border-transparent hover:border-slate-200 transition-colors relative"
            title="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-none bg-slate-900 text-[9px] font-black text-white border border-slate-900 shadow-sm font-mono">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Profile / Admin Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 hover:bg-slate-50 border-2 border-slate-900 rounded-none transition-all text-left focus:outline-none"
              >
                <div className="h-6 w-6 rounded-none bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="avatar" className="h-full w-full object-cover rounded-none" />
                  ) : (
                    currentUser.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[80px]">{currentUser.name}</p>
                  <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Member</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-none border-2 border-slate-900 bg-white p-1.5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-200">
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Signed in as</p>
                    <p className="text-xs font-bold text-slate-900 truncate font-mono">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      handleNavClick('Profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-none transition-colors"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    My Account
                  </button>

                  <button
                    onClick={() => {
                      logoutUser();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 rounded-none transition-colors border-t border-slate-100 mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginToggle}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-y-0.5 hover:translate-x-0.5 cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-none border border-slate-200 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-slate-900 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => handleNavClick(link.tab)}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none ${
                activeTab === link.tab
                  ? 'text-slate-900 bg-slate-50 border-l-4 border-slate-900'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
