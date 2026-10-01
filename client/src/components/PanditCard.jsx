import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Eye, Heart } from 'lucide-react';
import { pandit1Img, pandit2Img, pandit3Img } from '../utils/constants';

// Helper to resolve image URL
const getPhotoUrl = (photoPath, index) => {
  if (!photoPath) {
    if (index === 0) return pandit1Img;
    if (index === 1) return pandit2Img;
    return pandit3Img;
  }
  if (photoPath.startsWith('http://') || photoPath.startsWith('https://') || photoPath.startsWith('data:')) {
    return photoPath;
  }
  // Local static fallback for asset images or uploads
  if (photoPath.includes('pandit1')) return pandit1Img;
  if (photoPath.includes('pandit2')) return pandit2Img;
  if (photoPath.includes('pandit3')) return pandit3Img;
  const backendOrigin = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? ''
    : 'https://durga-asthan-bhatsimar-server.onrender.com';
  return photoPath.startsWith('/') ? `${backendOrigin}${photoPath}` : `${backendOrigin}/${photoPath}`;
};

const PanditCard = ({ pandit, index = 0, onSelect, compact = false }) => {
  const photoUrl = getPhotoUrl(pandit.photo, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="bg-[#FAF5EF] rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full relative group"
    >
      {/* Top Decorative Border Motif */}
      <div className="h-2 bg-gradient-to-r from-[#6A0909] via-[#E65100] to-[#6A0909]"></div>

      {/* Card Content Container */}
      <div className="p-6 flex flex-col items-center flex-grow text-center">
        
        {/* Profile Photo Frame with Mithila/Madhubani Geometric Accent */}
        <div className="relative mb-5 group/photo">
          {/* Subtle Outer Glowing Ring */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E65100] rounded-full blur opacity-75 group-hover/photo:opacity-100 transition duration-300"></div>
          
          {/* Photo Container */}
          <div
            onClick={() => onSelect && onSelect(pandit)}
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-[#6A0909] cursor-pointer"
          >
            <img
              src={photoUrl}
              alt={pandit.name}
              className="w-full h-full object-cover object-top group-hover/photo:scale-110 transition-transform duration-500"
              onError={(e) => {
                // Fallback to local imported asset on load error
                if (index === 0) e.target.src = pandit1Img;
                else if (index === 1) e.target.src = pandit2Img;
                else e.target.src = pandit3Img;
              }}
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1 p-2 text-center">
              <Eye className="w-6 h-6 text-[#FFD700] animate-bounce" />
              <span>चित्र देखू</span>
            </div>
          </div>

          {/* Devotional Badge Icon */}
          <div className="absolute bottom-1 right-1 bg-[#6A0909] border-2 border-[#FFD700] text-[#FFD700] p-1.5 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Pandit Name */}
        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#6A0909] tracking-wide mb-1 group-hover:text-[#E65100] transition-colors">
          {pandit.name}
        </h3>

        {/* Pandit Role Badge */}
        <div className="inline-block bg-[#E65100]/10 border border-[#E65100]/40 text-[#6A0909] px-3.5 py-1 rounded-full text-xs font-extrabold mb-3">
          {pandit.role}
        </div>

        {/* Short Maithili Description */}
        <p className="text-gray-700 text-sm font-serif leading-relaxed line-clamp-3 mb-4 flex-grow">
          {pandit.description}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 pb-6 pt-2 bg-gradient-to-t from-amber-50 to-transparent flex items-center justify-center">
        <button
          onClick={() => onSelect && onSelect(pandit)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6A0909] to-[#800000] hover:from-[#E65100] hover:to-[#D9531E] text-[#FFD700] hover:text-white px-5 py-3 rounded-2xl font-extrabold text-sm border border-[#D4AF37] shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          <Heart className="w-4 h-4 text-[#FFD700] fill-current" />
          <span>पूरा परिचय</span>
        </button>
      </div>

      {/* Decorative Bottom Corner Accents */}
      <div className="absolute top-3 left-3 text-[#D4AF37]/40 pointer-events-none text-xs">❖</div>
      <div className="absolute top-3 right-3 text-[#D4AF37]/40 pointer-events-none text-xs">❖</div>
    </motion.div>
  );
};

export default PanditCard;
