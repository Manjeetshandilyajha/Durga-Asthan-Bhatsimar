import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Flame, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { DEFAULT_PANDITS, pandit1Img, pandit2Img, pandit3Img } from '../utils/constants';
import PanditCard from '../components/PanditCard';

const getPhotoUrl = (photoPath, index) => {
  if (!photoPath) {
    if (index === 0) return pandit1Img;
    if (index === 1) return pandit2Img;
    return pandit3Img;
  }
  if (photoPath.startsWith('http://') || photoPath.startsWith('https://') || photoPath.startsWith('data:')) {
    return photoPath;
  }
  if (photoPath.includes('pandit1')) return pandit1Img;
  if (photoPath.includes('pandit2')) return pandit2Img;
  if (photoPath.includes('pandit3')) return pandit3Img;
  return photoPath;
};

const PanditPage = () => {
  const [pandits, setPandits] = useState(DEFAULT_PANDITS);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set document title and meta description for SEO
  useEffect(() => {
    document.title = 'हमर पंडित जी | दुर्गा स्थान, भटसिमर';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'दुर्गा स्थान, भटसिमर सँ जुड़ल पंडित जीक परिचय।';
  }, []);

  // Fetch pandits from Backend API
  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await API.get('/pandits');
        if (res.data && res.data.length > 0) {
          setPandits(res.data);
        }
      } catch (err) {
        console.error('Error fetching pandits:', err);
        setPandits(DEFAULT_PANDITS);
      } finally {
        setLoading(false);
      }
    };
    fetchPandits();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF5EF] pb-20">
      {/* Devotional Hero Header Banner */}
      <section className="relative bg-[#6A0909] text-white py-16 lg:py-20 border-b-4 border-[#D4AF37] shadow-xl overflow-hidden">
        {/* Subtle Decorative Pattern Layer */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E65100] border border-[#D4AF37] text-amber-200 text-xs sm:text-sm font-bold shadow-md"
          >
            <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
            <span>पावन पूजा-पाठ आ सेवा</span>
            <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFD700] tracking-wide"
          >
            हमर पंडित जी
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-28 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-amber-100 font-serif max-w-2xl mx-auto leading-relaxed"
          >
            "दुर्गा स्थान, भटसिमर सँ जुड़ल हमर पंडित जी"
          </motion.p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        
        {/* Intro Devotional Note */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-md mb-12 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6A0909] via-[#E65100] to-[#6A0909]"></div>
          <p className="text-gray-800 font-serif text-base sm:text-lg leading-relaxed">
            दुर्गा स्थान, भटसिमरक पावन प्रांगण में निष्ठा, नियम आ वैदिक विधि-विधान सँ माता रानीक नित्य पूजा-पाठ आ महाआरती संपन्न करबै वाला आदरणीय पंडित जनक परिचय।
          </p>
        </div>

        {/* 3 Pandit Ji Cards Grid: Desktop 3 per row (equal height), Mobile 1 per row */}
        {loading ? (
          <div className="text-center py-12 text-[#6A0909] font-bold">
            लोड भऽ रहल अछि... (Loading...)
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pandits.map((pandit, idx) => (
              <div key={pandit._id || idx} className="h-full">
                <PanditCard
                  pandit={pandit}
                  index={idx}
                  onSelect={(p) => setSelectedPandit(p)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Navigation Back Link */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#6A0909] hover:bg-[#800000] text-[#FFD700] px-6 py-3 rounded-2xl font-bold border border-[#D4AF37] shadow-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-[#FFD700]" />
            <span>मुख्य पृष्ठ पर वापस जाउ</span>
          </Link>
        </div>
      </div>

      {/* Detailed Modal (पूरा परिचय Lightbox View) */}
      <AnimatePresence>
        {selectedPandit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF5EF] rounded-3xl border-4 border-[#D4AF37] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPandit(null)}
                className="absolute top-4 right-4 p-2 bg-[#6A0909] text-[#FFD700] hover:bg-[#E65100] hover:text-white rounded-full transition-colors border border-[#D4AF37] shadow"
                aria-label="बंद करू"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Devotional Header */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E65100]/10 border border-[#E65100]/30 text-[#6A0909] text-xs font-bold mb-4">
                <Sparkles className="w-4 h-4 text-[#E65100]" />
                <span>पूरा परिचय (Pandit Profile)</span>
              </div>

              {/* Large Original Pandit Photo */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-[#6A0909]">
                <img
                  src={getPhotoUrl(selectedPandit.photo, pandits.findIndex(p => p._id === selectedPandit._id))}
                  alt={selectedPandit.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const idx = pandits.findIndex(p => p._id === selectedPandit._id);
                    if (idx === 0) e.target.src = pandit1Img;
                    else if (idx === 1) e.target.src = pandit2Img;
                    else e.target.src = pandit3Img;
                  }}
                />
              </div>

              {/* Pandit Name */}
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#6A0909] mb-2">
                {selectedPandit.name}
              </h2>

              {/* Pandit Role */}
              <div className="inline-block bg-[#E65100] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-[#D4AF37] mb-4 shadow">
                {selectedPandit.role}
              </div>

              {/* Devotional Description */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-inner mb-6">
                <p className="text-gray-800 font-serif text-base leading-relaxed">
                  "{selectedPandit.description}"
                </p>
              </div>

              {/* Close Action Button */}
              <button
                onClick={() => setSelectedPandit(null)}
                className="w-full py-3 bg-[#6A0909] hover:bg-[#800000] text-[#FFD700] font-extrabold text-sm rounded-xl border border-[#D4AF37] shadow transition-colors"
              >
                जय माता दी! (बंद करू)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PanditPage;
