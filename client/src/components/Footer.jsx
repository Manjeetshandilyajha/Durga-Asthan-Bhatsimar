import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Heart, Compass, ShieldCheck } from 'lucide-react';
import { SITE_DETAILS } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-[#4A0505] text-amber-100 border-t-4 border-[#D4AF37] relative pt-12 pb-6 overflow-hidden">
      {/* Subtle Mithila Background Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-mithila-pattern"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Temple Overview */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-[#FFD700] mb-3 flex items-center gap-2">
              <span>🚩</span> {SITE_DETAILS.name}
            </h3>
            <p className="text-sm leading-relaxed text-amber-200/90 mb-4 font-serif">
              भटसिमरक पावन धरा पर स्थित दुर्गा स्थान ग्रामीण एकता, भक्ति आ अटूट श्रद्धाक महान प्रतीक अछि। माँ दुर्गाक असीम कृपा सभ श्रद्धालु पर निरंतर बनल रहै।
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6A0909] border border-[#D4AF37] text-xs font-semibold text-[#FFD700]">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>जय माता दी!</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-[#FFD700] mb-4 border-b border-[#D4AF37]/30 pb-2">
              त्वरित लिंक (Quick Links)
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E65100]" /> मुख्य पृष्ठ
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E65100]" /> मंदिरक इतिहास
                </Link>
              </li>
              <li>
                <Link to="/mata-rani" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E65100]" /> माता रानी दर्शन
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E65100]" /> फोटो गैलरी
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E65100]" /> पूजा आ उत्सव
                </Link>
              </li>
              <li>
                <Link to="/share-history" className="hover:text-[#FFD700] transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E65100]" /> इतिहास साझा करू
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold text-[#FFD700] mb-4 border-b border-[#D4AF37]/30 pb-2">
              मुख्य संपर्ककर्ता
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-bold text-amber-200">नाम:</span>
                <span>{SITE_DETAILS.contactPerson}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <a href={`tel:${SITE_DETAILS.contactMobile}`} className="hover:underline font-semibold text-amber-200">
                  {SITE_DETAILS.contactMobile}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_DETAILS.whatsappNumber}?text=${encodeURIComponent('जय माता दी! दुर्गा स्थान भटसिमर मंदिर संबंध में संदेश:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp पर गपशप करू</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Temple Location */}
          <div>
            <h4 className="font-heading text-lg font-bold text-[#FFD700] mb-4 border-b border-[#D4AF37]/30 pb-2">
              मंदिर स्थान (Location)
            </h4>
            <div className="flex items-start gap-2 text-sm mb-3">
              <MapPin className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
              <span>{SITE_DETAILS.location}</span>
            </div>
            <a
              href="https://maps.google.com/?q=Bhatsimar+Durga+Sthan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D9531E] text-white px-4 py-2 rounded-md text-xs font-bold border border-[#D4AF37] transition-all shadow-md"
            >
              <span>गूगल मैप्स पर देखू 📍</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-[#D4AF37]/30 pt-6 text-center text-xs text-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} दुर्गा स्थान, भटसिमर। सर्व अधिकार सुरक्षित।</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-semibold">जय माता दी! 🙏🚩</span>
            <Link to="/admin/login" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> एडमिन प्रवेश
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
