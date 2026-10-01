import React, { useState } from 'react';
import { Eye, Sparkles, Heart, Flower2, Shield } from 'lucide-react';
import { mataRaniImg } from '../utils/constants';
import LightboxModal from '../components/LightboxModal';

const MataRaniPage = () => {
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      {/* Header Banner */}
      <section className="bg-[#6A0909] text-white py-14 border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E65100] text-amber-100 text-xs font-bold border border-[#D4AF37]">
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>श्री श्री १०८ माँ दुर्गा महारानी</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FFD700]">
            माता रानी दर्शन आ पूजा विधान
          </h1>
          <p className="max-w-2xl mx-auto text-amber-100 font-serif text-base sm:text-lg">
            भटसिमर दुर्गा स्थान में विराजित माँ भगवतीक अलौकिक आ भक्तिमय दर्शन।
          </p>
        </div>
      </section>

      {/* Main Mata Rani Photo Showcase Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* REAL Mata Rani Photo Card */}
          <div className="lg:col-span-5">
            <div
              onClick={() => setShowLightbox(true)}
              className="relative rounded-3xl overflow-hidden gold-border-glow p-2 bg-[#6A0909] shadow-2xl cursor-pointer group"
            >
              <img
                src={mataRaniImg}
                alt="श्री श्री १०८ माँ दुर्गा महारानी भटसिमर"
                className="w-full h-[500px] sm:h-[580px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-1">
                  वास्तविक माँ भगवती प्रतिमा (Real Mata Rani Idol Photo)
                </span>
                <h2 className="font-heading text-2xl font-bold text-white">
                  जय माँ दुर्गा भटसिमर
                </h2>
                <p className="text-xs text-amber-200 mt-1">चित्र पर क्लिक क क पूर्ण रूप में देखू</p>
              </div>
            </div>
          </div>

          {/* Details & Traditions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E65100] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>माता रानी दर्शन आ अनुष्ठान</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#6A0909]">
              भटसिमर माता रानीक महिमा आ परंपरा
            </h2>

            <p className="text-gray-700 font-serif leading-relaxed text-base">
              भटसिमर ग्रामक दुर्गा स्थान में माँ दुर्गाक अलौकिक प्रतिमा स्थापित अछि। माता रानीक भव्य मुकुट, सुंदर वस्त्र आ पुष्प माला सँ सुसज्जित रूप देखि सभ श्रद्धालु भावविभोर भ जाइत छथि।
            </p>

            {/* Puja Traditions */}
            <div className="space-y-4 pt-2">
              <div className="bg-white p-5 rounded-xl border-l-4 border-[#E65100] temple-card-shadow flex items-start gap-4">
                <Flower2 className="w-6 h-6 text-[#E65100] shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#6A0909]">नित्य पूजा आ श्रृंगार</h3>
                  <p className="text-gray-600 text-sm font-serif">प्रतिदिन प्रातः आ संध्या काल में माता रानीक विशेष आरती आ नैवेद्य अर्पण कैल जाइत अछि।</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border-l-4 border-[#6A0909] temple-card-shadow flex items-start gap-4">
                <Shield className="w-6 h-6 text-[#6A0909] shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#6A0909]">नवरात्रि महाअनुष्ठान</h3>
                  <p className="text-gray-600 text-sm font-serif">अश्विन शारदीय नवरात्रि में १० दिन धरि अखंड दीप आ चंडी पाठ आयोजित होइत अछि।</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border-l-4 border-[#D4AF37] temple-card-shadow flex items-start gap-4">
                <Eye className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#6A0909]">विशेष मन्नत आ पुष्पांजलि</h3>
                  <p className="text-gray-600 text-sm font-serif">श्रद्धालुगण अपन मनक मन्नत ल क अबैत छथि आ माँ दुर्गाक कृपा सँ सभक मनोरथ पूर्ण होइत अछि।</p>
                </div>
              </div>
            </div>

            {/* Maithili Devotional Stotra snippet */}
            <div className="bg-[#6A0909] p-6 rounded-2xl border border-[#D4AF37] text-white space-y-2 text-center mt-6">
              <h4 className="font-heading text-xl text-[#FFD700]">॥ माँ दुर्गा ध्यान मंत्र ॥</h4>
              <p className="text-amber-100 font-serif italic text-sm leading-relaxed">
                "सर्वमंगलमंगल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥"
              </p>
              <p className="text-xs text-amber-300 font-bold pt-1">जय माता दी! जय माँ दुर्गा भटसिमर!</p>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox for Mata Rani Photo */}
      <LightboxModal
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        image={{
          imageUrl: mataRaniImg,
          title: 'श्री श्री १०८ माँ दुर्गा महारानी, भटसिमर',
          category: 'माता रानी',
          description: 'दुर्गा स्थान भटसिमर में स्थापित माँ भगवतीक वास्तविक आ अलौकिक प्रतिमा।',
        }}
      />
    </div>
  );
};

export default MataRaniPage;
