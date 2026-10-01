import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Filter, ZoomIn } from 'lucide-react';
import { GALLERY_CATEGORIES } from '../utils/constants';
import LightboxModal from '../components/LightboxModal';
import API from '../services/api';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('सभटा');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'सभटा' ? '/gallery' : `/gallery?category=${encodeURIComponent(activeCategory)}`;
        const res = await API.get(url);
        setImages(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      {/* Banner */}
      <section className="bg-[#6A0909] text-white py-14 border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E65100] text-amber-100 text-xs font-bold border border-[#D4AF37]">
            <ImageIcon className="w-4 h-4 text-[#FFD700]" />
            <span>पावन फोटो संग्रह</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FFD700]">
            दुर्गा स्थान फोटो गैलरी
          </h1>
          <p className="max-w-2xl mx-auto text-amber-100 font-serif text-base sm:text-lg">
            भटसिमर दुर्गा स्थान मंदिर, माता रानीक अलौकिक प्रतिमा आ दुर्गा पूजक भक्तिमय क्षण।
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-gray-500 mr-2">
            <Filter className="w-4 h-4 text-[#E65100]" />
            <span>वर्ग चुनू:</span>
          </div>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-[#E65100] text-white border-[#D4AF37] shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-100/60 border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading / Empty / Grid */}
        {loading ? (
          <div className="text-center py-16 text-[#6A0909] font-bold text-lg">
            इमेज लोड भ रहल अछि...
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-amber-200 text-gray-600 font-serif">
            एहि श्रेणी में एखनि फोटो उपलब्ध नहि अछि।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <div
                key={img._id || idx}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 temple-card-shadow cursor-pointer h-72 bg-[#6A0909]"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#FFD700] uppercase tracking-wider">
                      {img.category}
                    </span>
                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-white text-base font-bold truncate mt-1">
                    {img.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
};

export default GalleryPage;
