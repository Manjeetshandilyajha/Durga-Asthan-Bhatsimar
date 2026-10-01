import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

const TimelineItem = ({ item, isEven }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col md:flex-row items-center mb-12 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Timeline Center Node Badge */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-[#E65100] border-2 border-[#D4AF37] shadow-lg text-[#FFD700]">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>

      {/* Card Content */}
      <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
        <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/40 temple-card-shadow relative group hover:border-[#D4AF37] transition-all">
          
          {/* Section Era Tag */}
          <div className="inline-flex items-center gap-1 bg-[#6A0909] text-[#FFD700] text-xs font-bold px-3 py-1 rounded-full mb-3 shadow">
            <Shield className="w-3 h-3 text-[#FFD700]" />
            <span>{item.section || 'इतिहास'}</span>
            <span className="text-amber-200 ml-1">• {item.year}</span>
          </div>

          <h3 className="font-heading text-xl font-bold text-[#6A0909] mb-2 group-hover:text-[#E65100] transition-colors">
            {item.title}
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed font-serif">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
