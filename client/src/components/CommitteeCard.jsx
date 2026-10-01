import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { samiti1Img, samiti2Img, samiti3Img } from '../utils/constants';

const getPhotoUrl = (photoPath, index) => {
  if (!photoPath) {
    if (index === 0) return samiti1Img;
    if (index === 1) return samiti2Img;
    return samiti3Img;
  }
  if (photoPath.startsWith('http://') || photoPath.startsWith('https://') || photoPath.startsWith('data:')) {
    return photoPath;
  }
  if (photoPath.includes('samiti1')) return samiti1Img;
  if (photoPath.includes('samiti2')) return samiti2Img;
  if (photoPath.includes('samiti3')) return samiti3Img;
  return photoPath;
};

const CommitteeCard = ({ member, index = 0, onSelectPhoto, compact = false }) => {
  const photoUrl = getPhotoUrl(member.photo, index);

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
        
        {/* Photo Frame with Outer Gold Accent Ring */}
        <div className="relative mb-5 group/photo">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E65100] rounded-2xl blur opacity-75 group-hover/photo:opacity-100 transition duration-300"></div>
          
          <div
            onClick={() => onSelectPhoto && onSelectPhoto(member)}
            className="relative w-40 h-52 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-[#6A0909] cursor-pointer"
          >
            <img
              src={photoUrl}
              alt={member.name}
              className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (index === 0) e.target.src = samiti1Img;
                else if (index === 1) e.target.src = samiti2Img;
                else e.target.src = samiti3Img;
              }}
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1 p-2 text-center">
              <Eye className="w-6 h-6 text-[#FFD700] animate-bounce" />
              <span>चित्र देखू</span>
            </div>
          </div>

          {/* Devotional Badge Icon */}
          <div className="absolute -bottom-2 -right-2 bg-[#6A0909] border-2 border-[#FFD700] text-[#FFD700] p-1.5 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Committee Member Name (Devanagari Maithili) */}
        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#6A0909] tracking-wide mb-2 group-hover:text-[#E65100] transition-colors">
          {member.name}
        </h3>

        {/* Member Designation Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#E65100]/10 border border-[#E65100]/40 text-[#6A0909] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold">
          <ShieldCheck className="w-4 h-4 text-[#E65100]" />
          <span>{member.designation}</span>
        </div>
      </div>

      {/* Decorative Bottom Accent Bar */}
      <div className="px-6 pb-4 pt-1 bg-gradient-to-t from-amber-50 to-transparent flex items-center justify-center border-t border-amber-200/50">
        <span className="text-xs font-bold text-[#6A0909] font-serif tracking-wider">
          दुर्गा स्थान, भटसिमर
        </span>
      </div>

      {/* Mithila Motifs */}
      <div className="absolute top-3 left-3 text-[#D4AF37]/40 pointer-events-none text-xs">❖</div>
      <div className="absolute top-3 right-3 text-[#D4AF37]/40 pointer-events-none text-xs">❖</div>
    </motion.div>
  );
};

export default CommitteeCard;
