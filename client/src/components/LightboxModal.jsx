import React from 'react';
import { X, Download, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LightboxModal = ({ isOpen, onClose, image }) => {
  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl w-full bg-[#4A0505] border-2 border-[#D4AF37] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#6A0909] border-b border-[#D4AF37]/50 text-white">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm font-semibold text-amber-200">
                {image.category || 'दुर्गा स्थान गैलरी'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={image.imageUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="p-2 text-amber-200 hover:text-white hover:bg-[#800000] rounded-full transition-colors"
                title="डाउनलोड करू"
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={onClose}
                className="p-2 text-amber-200 hover:text-white hover:bg-red-800 rounded-full transition-colors"
                title="बंद करू"
              >
                <X className="w-6 h-6 text-[#FFD700]" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 bg-black/60 flex items-center justify-center p-4 overflow-hidden min-h-[300px]">
            <img
              src={image.imageUrl}
              alt={image.title || 'दुर्गा स्थान भटसिमर'}
              className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl border border-amber-500/20"
            />
          </div>

          {/* Caption / Description */}
          <div className="p-6 bg-[#6A0909] text-white border-t border-[#D4AF37]/30">
            <h3 className="font-heading text-xl font-bold text-[#FFD700] mb-2">
              {image.title}
            </h3>
            {image.description && (
              <p className="text-sm text-amber-100/90 leading-relaxed font-serif">
                {image.description}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
