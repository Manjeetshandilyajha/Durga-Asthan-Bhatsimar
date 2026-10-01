import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShieldCheck, ArrowLeft, X, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { DEFAULT_COMMITTEE_MEMBERS, samiti1Img, samiti2Img, samiti3Img } from '../utils/constants';
import CommitteeCard from '../components/CommitteeCard';

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

const SamitiPage = () => {
  const [members, setMembers] = useState(DEFAULT_COMMITTEE_MEMBERS);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set document title and meta description for SEO
  useEffect(() => {
    document.title = 'दुर्गा पूजा समिति | दुर्गा स्थान, भटसिमर';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'दुर्गा स्थान, भटसिमर के दुर्गा पूजा समिति के पदाधिकारी आ सदस्यगण।';
  }, []);

  // Fetch committee members from Backend API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get('/committee');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setMembers(res.data);
        }
      } catch (err) {
        console.error('Error fetching committee members:', err);
        setMembers(DEFAULT_COMMITTEE_MEMBERS);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
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
            <span>ग्राम - भटसिमर (मधुबनी)</span>
            <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFD700] tracking-wide"
          >
            दुर्गा पूजा समिति, भटसिमर
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
            "दुर्गा स्थान, भटसिमर के पूजा आयोजन सँ जुड़ल समिति"
          </motion.p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        
        {/* Intro Note */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-md mb-12 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6A0909] via-[#E65100] to-[#6A0909]"></div>
          <p className="text-gray-800 font-serif text-base sm:text-lg leading-relaxed">
            दुर्गा स्थान, भटसिमर में प्रतिवर्ष आयोजित होइ वाला पावन दुर्गा पूजा आ मेला आयोजन के सुचारू संचालन लेल समर्पित समिति पदाधिकारी आ सदस्यगण।
          </p>
        </div>

        {/* Members Grid: Desktop 3, Tablet 2, Mobile 1 */}
        {loading ? (
          <div className="text-center py-12 text-[#6A0909] font-bold">
            लोड भऽ रहल अछि... (Loading...)
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {members.map((member, idx) => (
              <div key={member._id || idx} className="h-full">
                <CommitteeCard
                  member={member}
                  index={idx}
                  onSelectPhoto={(m) => setSelectedMember(m)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Back to Home Navigation Button */}
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

      {/* Lightbox Photo View Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF5EF] rounded-3xl border-4 border-[#D4AF37] shadow-2xl max-w-lg w-full p-6 text-center relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-[#6A0909] text-[#FFD700] hover:bg-[#E65100] hover:text-white rounded-full transition-colors border border-[#D4AF37] shadow"
                aria-label="बंद करू"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Photo Frame */}
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-[#6A0909]">
                <img
                  src={getPhotoUrl(selectedMember.photo, members.findIndex(m => m._id === selectedMember._id))}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const idx = members.findIndex(m => m._id === selectedMember._id);
                    if (idx === 0) e.target.src = samiti1Img;
                    else if (idx === 1) e.target.src = samiti2Img;
                    else e.target.src = samiti3Img;
                  }}
                />
              </div>

              {/* Member Details */}
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#6A0909] mb-2">
                {selectedMember.name}
              </h2>

              <div className="inline-flex items-center gap-1.5 bg-[#E65100] text-white px-4 py-1.5 rounded-full text-sm font-bold border border-[#D4AF37] mb-6 shadow">
                <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                <span>{selectedMember.designation}</span>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
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

export default SamitiPage;
