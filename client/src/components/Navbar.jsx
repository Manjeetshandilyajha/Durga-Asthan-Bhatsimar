import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame, Phone, ShieldCheck, Heart } from 'lucide-react';
import { SITE_DETAILS, templeFacadeImg } from '../utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'मुख्य पृष्ठ', path: '/' },
    { name: 'मंदिरक इतिहास', path: '/history' },
    { name: 'माता रानी दर्शन', path: '/mata-rani' },
    { name: 'पंडित जी', path: '/pandit' },
    { name: 'समिति', path: '/samiti' },
    { name: 'फोटो गैलरी', path: '/gallery' },
    { name: 'पूजा आ उत्सव', path: '/events' },
    { name: 'इतिहास साझा करू', path: '/share-history' },
    { name: 'संपर्क करू', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#6A0909]/95 backdrop-blur-md border-b-2 border-[#D4AF37] shadow-xl text-white">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#990000] via-[#E65100] to-[#990000] py-1 text-center text-xs sm:text-sm font-semibold tracking-wider border-b border-[#D4AF37]/30 flex items-center justify-center gap-2 px-4">
        <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
        <span>जय माता दी! भटसिमरक पावन धरती पर अहाँ सभक स्वागत अछि।</span>
        <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300 bg-[#E65100]">
              <img
                src={templeFacadeImg}
                alt="दुर्गा स्थान मंदिर भटसिमर"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#FFD700] tracking-wide leading-tight group-hover:text-amber-200 transition-colors">
                {SITE_DETAILS.name}
              </h1>
              <p className="text-xs text-amber-100 font-medium tracking-wider">
                ग्राम - भटसिमर, मधुबनी (बिहार)
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#E65100] text-white border border-[#D4AF37] shadow-md font-semibold'
                    : 'text-amber-100 hover:bg-[#800000] hover:text-[#FFD700]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Quick Contact & Admin Access */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_DETAILS.contactMobile}`}
              className="flex items-center gap-2 bg-[#E65100] hover:bg-[#D9531E] text-white px-4 py-2 rounded-full text-xs font-bold border border-[#D4AF37] transition-all shadow-md hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{SITE_DETAILS.contactMobile}</span>
            </a>

            <Link
              to="/admin/login"
              title="प्रशासनिक लॉगिन"
              className="p-2 text-amber-200 hover:text-white hover:bg-[#800000] rounded-full transition-colors border border-amber-500/30"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/admin/login"
              className="p-1.5 text-amber-200 hover:text-white rounded-md"
              title="प्रशासन लॉगिन"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-amber-200 hover:text-white hover:bg-[#800000] focus:outline-none"
              aria-label="नेविगेशन मेनू"
            >
              {isOpen ? <X className="w-7 h-7 text-[#FFD700]" /> : <Menu className="w-7 h-7 text-[#FFD700]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#6A0909] border-t border-[#D4AF37]/50 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-[#E65100] text-white border-l-4 border-[#FFD700] font-bold'
                  : 'text-amber-100 hover:bg-[#800000] hover:text-[#FFD700]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-amber-500/30 flex flex-col gap-3">
            <a
              href={`tel:${SITE_DETAILS.contactMobile}`}
              className="flex items-center justify-center gap-2 bg-[#E65100] text-white py-3 rounded-lg text-sm font-bold border border-[#D4AF37]"
            >
              <Phone className="w-4 h-4 text-[#FFD700]" />
              <span>संपर्क करू: {SITE_DETAILS.contactPerson} ({SITE_DETAILS.contactMobile})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
