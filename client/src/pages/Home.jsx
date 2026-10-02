import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, History, Eye, Calendar, Image as ImageIcon, Send, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react';

import { templeFacadeImg, mataRaniImg, SITE_DETAILS, DEFAULT_PANDITS, DEFAULT_COMMITTEE_MEMBERS } from '../utils/constants';
import API from '../services/api';
import AnnouncementTicker from '../components/AnnouncementTicker';
import EventCard from '../components/EventCard';
import LightboxModal from '../components/LightboxModal';
import PanditCard from '../components/PanditCard';
import CommitteeCard from '../components/CommitteeCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [pandits, setPandits] = useState(DEFAULT_PANDITS);
  const [committee, setCommittee] = useState(DEFAULT_COMMITTEE_MEMBERS);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, galleryRes, panditRes, committeeRes] = await Promise.all([
          API.get('/events').catch(() => ({ data: [] })),
          API.get('/gallery').catch(() => ({ data: [] })),
          API.get('/pandits').catch(() => ({ data: DEFAULT_PANDITS })),
          API.get('/committee').catch(() => ({ data: DEFAULT_COMMITTEE_MEMBERS })),
        ]);
        if (Array.isArray(eventRes.data)) {
          setEvents(eventRes.data.slice(0, 3));
        }
        if (Array.isArray(galleryRes.data)) {
          setGallery(galleryRes.data.slice(0, 4));
        }
        if (Array.isArray(panditRes.data) && panditRes.data.length > 0) {
          setPandits(panditRes.data);
        }
        if (Array.isArray(committeeRes.data) && committeeRes.data.length > 0) {
          setCommittee(committeeRes.data);
        }
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      {/* Announcement Marquee Ticker */}
      <AnnouncementTicker />

      {/* HERO SECTION - Featuring REAL Temple Photograph */}
      <section className="relative bg-[#6A0909] text-white overflow-hidden pt-12 pb-20 lg:py-24 border-b-4 border-[#D4AF37]">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={templeFacadeImg}
            alt="दुर्गा स्थान मंदिर भटसिमर"
            className="w-full h-full object-cover scale-105 filter blur-[2px]"
          />
        </div>
        <div className="absolute inset-0 temple-hero-overlay z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E65100]/90 border border-[#D4AF37] text-amber-200 text-sm font-semibold shadow-lg">
                <Flame className="w-4 h-4 text-[#FFD700] animate-pulse" />
                <span>जय माता दी!</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFD700] tracking-tight leading-tight">
                {SITE_DETAILS.name}
              </h1>

              <p className="text-xl sm:text-2xl text-amber-100 font-serif leading-relaxed">
                "{SITE_DETAILS.heroSubtitle}"
              </p>

              <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed font-serif max-w-2xl">
                भटसिमरक पावन धरती पर स्थित दुर्गा स्थान ग्रामीण निष्ठा, अखंड भक्ति आ समृद्ध मैथिल संस्कृतिक पावन प्रतीक अछि। माँ दुर्गाक अलौकिक कृपा सँ निरंतर पूजा-अर्चना आ उल्लासमय वातावरण बनल रहैत अछि।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/history"
                  className="flex items-center gap-2 bg-[#E65100] hover:bg-[#D9531E] text-white px-6 py-3.5 rounded-xl font-bold border-2 border-[#D4AF37] shadow-xl hover:scale-105 transition-all text-base"
                >
                  <History className="w-5 h-5 text-[#FFD700]" />
                  <span>मंदिरक इतिहास जानू</span>
                </Link>

                <Link
                  to="/gallery"
                  className="flex items-center gap-2 bg-[#4A0505] hover:bg-[#6A0909] text-amber-200 px-6 py-3.5 rounded-xl font-bold border border-amber-400/40 shadow-xl hover:scale-105 transition-all text-base"
                >
                  <ImageIcon className="w-5 h-5 text-[#FFD700]" />
                  <span>फोटो गैलरी देखू</span>
                </Link>
              </div>
            </motion.div>

            {/* REAL Temple Photograph Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden gold-border-glow p-2 bg-[#4A0505] shadow-2xl group cursor-pointer"
                   onClick={() => setSelectedImage({ imageUrl: templeFacadeImg, title: 'दुर्गा स्थान भटसिमर मुख्य मंदिर', category: 'मंदिर फोटो' })}>
                <img
                  src={templeFacadeImg}
                  alt="दुर्गा स्थान भटसिमर मुख्य मंदिर"
                  className="w-full h-[320px] sm:h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 rounded-2xl flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-1">
                    वास्तविक मंदिर चित्र (Real Temple Photo)
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    दुर्गा स्थान मुख्य भवन, भटसिमर
                  </h3>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT DURGA STHAN */}
      <section className="py-16 bg-white border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#6A0909] mb-4">
              दुर्गा स्थान भटसिमर के बारे में
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-4"></div>
            <p className="text-gray-700 font-serif leading-relaxed text-base sm:text-lg">
              भटसिमरक दुर्गा स्थान केवल एक पूजा स्थल नहि, बल्कि सम्पूर्ण ग्रामवासीक अटूट विश्वास, सांस्कृतिक धरोहर आ धार्मिक आस्थाक प्राणकेंद्र अछि।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF5EF] p-8 rounded-2xl border border-[#D4AF37]/40 temple-card-shadow text-center hover:border-[#D4AF37] transition-all">
              <div className="w-14 h-14 bg-[#E65100] text-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D4AF37] shadow">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#6A0909] mb-2">पावन पूजा परंपरा</h3>
              <p className="text-gray-700 text-sm leading-relaxed font-serif">
                अश्विन नवरात्रि में यहाँ माता रानीक वैदिक रीति-रिवाज सँ भव्य महापूजा आ आरती आयोजित कैल जाइत अछि।
              </p>
            </div>

            <div className="bg-[#FAF5EF] p-8 rounded-2xl border border-[#D4AF37]/40 temple-card-shadow text-center hover:border-[#D4AF37] transition-all">
              <div className="w-14 h-14 bg-[#6A0909] text-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D4AF37] shadow">
                <History className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#6A0909] mb-2">ऐतिहासिक धरोहर</h3>
              <p className="text-gray-700 text-sm leading-relaxed font-serif">
                पूर्वज सभक समय सँ चलि आबि रहल अटूट परंपरा आ इतिहास के संजोय क राखब आ भावी पीढ़ी लेल संरक्षित करब मुख्य ध्येय अछि।
              </p>
            </div>

            <div className="bg-[#FAF5EF] p-8 rounded-2xl border border-[#D4AF37]/40 temple-card-shadow text-center hover:border-[#D4AF37] transition-all">
              <div className="w-14 h-14 bg-[#E65100] text-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D4AF37] shadow">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#6A0909] mb-2">ग्राम एकता आ उल्लास</h3>
              <p className="text-gray-700 text-sm leading-relaxed font-serif">
                दुर्गा स्थान परिसर में प्रत्येक अवसर पर ग्रामवासी आ दूर-दराज सँ अबै वाला श्रद्धालुगण एक संग मिलि क उल्लास मनाबैत छथि।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: REAL MATA RANI DARSHAN SHOWCASE */}
      <section className="py-16 bg-gradient-to-br from-[#4A0505] via-[#6A0909] to-[#300303] text-white border-y-4 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Real Mata Rani Photo Card */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div
                onClick={() => setSelectedImage({ imageUrl: mataRaniImg, title: 'श्री श्री १०८ माँ दुर्गा महारानी दिव्य दर्शन', category: 'माता रानी' })}
                className="relative rounded-3xl overflow-hidden gold-border-glow p-2 bg-[#6A0909] shadow-2xl cursor-pointer group"
              >
                <img
                  src={mataRaniImg}
                  alt="श्री श्री १०८ माँ दुर्गा महारानी भटसिमर"
                  className="w-full h-[420px] sm:h-[500px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest mb-1">
                    वास्तविक माता रानी प्रतिमा (Real Idol Photo)
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    श्री श्री १०८ माँ दुर्गा महारानी
                  </h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E65100] text-amber-100 text-xs font-bold border border-[#D4AF37]">
                <Eye className="w-4 h-4 text-[#FFD700]" />
                <span>दिव्य दर्शन आ आशीर्वाद</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFD700] leading-tight">
                माँ दुर्गा महारानीक अलौकिक स्वरूप
              </h2>

              <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed font-serif">
                भटसिमर दुर्गा स्थान में विराजित माँ दुर्गाक दिव्य आ ओजस्वी रूप देखैते श्रद्धालुगण भावविभोर भ जाइत छथि। माता रानीक भव्य श्रृंगार आ पुष्पांजलि सँ प्रांगण निरंतर भक्तिमय बना रहैत अछि।
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/mata-rani"
                  className="flex items-center gap-2 bg-[#E65100] hover:bg-[#D9531E] text-white px-6 py-3 rounded-xl font-bold border border-[#D4AF37] shadow-lg transition-all"
                >
                  <Eye className="w-5 h-5 text-[#FFD700]" />
                  <span>माता रानी दर्शन पेज पर जाउ</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW SECTION: PANDIT JI PREVIEW */}
      <section className="py-16 bg-[#FAF5EF] border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#6A0909] mb-2 flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-[#E65100]" />
                हमर पंडित जी
              </h2>
              <p className="text-gray-700 text-sm sm:text-base font-serif">
                दुर्गा स्थान, भटसिमरक पूजा-पाठ सँ जुड़ल पंडित जी
              </p>
            </div>

            <Link
              to="/pandit"
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D9531E] text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-[#D4AF37] shadow hover:scale-105 transition-all"
            >
              <span>सभ पंडित जी देखू →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pandits.slice(0, 3).map((pandit, idx) => (
              <div key={pandit._id || idx} className="h-full">
                <PanditCard
                  pandit={pandit}
                  index={idx}
                  onSelect={() => window.location.href = '/pandit'}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: COMMITTEE PREVIEW */}
      <section className="py-16 bg-white border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#6A0909] mb-2 flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-[#E65100]" />
                हमर दुर्गा पूजा समिति
              </h2>
              <p className="text-gray-700 text-sm sm:text-base font-serif">
                दुर्गा स्थान, भटसिमर के पूजा आयोजन सँ जुड़ल समिति
              </p>
            </div>

            <Link
              to="/samiti"
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D9531E] text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-[#D4AF37] shadow hover:scale-105 transition-all"
            >
              <span>समिति के बारे में देखू</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {committee.slice(0, 3).map((member, idx) => (
              <div key={member._id || idx} className="h-full">
                <CommitteeCard
                  member={member}
                  index={idx}
                  onSelectPhoto={() => window.location.href = '/samiti'}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PUJA & FESTIVALS PREVIEW */}
      <section className="py-16 bg-white border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#6A0909] mb-2 flex items-center gap-2">
                <Calendar className="w-7 h-7 text-[#E65100]" />
                पूजा आ उत्सव (Puja & Festivals)
              </h2>
              <p className="text-gray-600 text-sm font-serif">
                दुर्गा स्थान भटसिमर में वर्ष भर आयोजित होइ वाला मुख्य धार्मिक कार्यक्रम
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-[#E65100] hover:text-[#6A0909] font-bold text-sm underline underline-offset-4"
            >
              <span>सभटा कार्यक्रम देखू</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev) => (
              <EventCard key={ev._id} event={ev} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PHOTO GALLERY PREVIEW */}
      <section className="py-16 bg-[#FAF5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#6A0909] mb-2 flex items-center gap-2">
                <ImageIcon className="w-7 h-7 text-[#E65100]" />
                फोटो गैलरी (Photo Gallery)
              </h2>
              <p className="text-gray-600 text-sm font-serif">
                दुर्गा स्थान मंदिर आ माँ भगवतीक भक्तिमय चित्र
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-[#E65100] hover:text-[#6A0909] font-bold text-sm underline underline-offset-4"
            >
              <span>संपूर्ण गैलरी देखू</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((img, idx) => (
              <div
                key={img._id || idx}
                onClick={() => setSelectedImage(img)}
                className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 temple-card-shadow cursor-pointer group h-64 bg-[#6A0909]"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-[#FFD700] font-bold">{img.category}</span>
                  <h4 className="text-white text-sm font-bold truncate">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: COMMUNITY HISTORY CONTRIBUTION BANNER */}
      <section className="py-14 bg-gradient-to-r from-[#E65100] via-[#D9531E] to-[#6A0909] text-white border-y-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-[#FFD700]">
            <Send className="w-7 h-7 text-[#FFD700]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FFD700]">
            दुर्गा स्थानक इतिहास आ संस्मरण साझा करू
          </h2>
          <p className="max-w-2xl mx-auto text-amber-100 text-sm sm:text-base font-serif leading-relaxed">
            यदि अहाँक लग दुर्गा स्थान भटसिमरक कोणहु पुरान फोटो, कथा, या ऐतिहासिक जानकारी अछि, तऽ कृपया मंदिर समिति के ज़रूर भेजल जाउ।
          </p>
          <div>
            <Link
              to="/share-history"
              className="inline-flex items-center gap-2 bg-[#6A0909] hover:bg-[#4A0505] text-[#FFD700] px-8 py-3.5 rounded-xl font-bold border-2 border-[#D4AF37] shadow-2xl transition-all hover:scale-105 text-base"
            >
              <span>इतिहास साझा करू (Form Submit)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT & MAP PREVIEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-[#6A0909] flex items-center gap-2">
                <Phone className="w-7 h-7 text-[#E65100]" />
                संपर्क आ स्थान जानकारी
              </h2>
              <p className="text-gray-700 font-serif leading-relaxed">
                दुर्गा स्थान भटसिमर संबंध में कोणहु प्रश्न, सुझाव या विशेष पूजन हेतु मुख्य संपर्ककर्ता सँ संपर्क करी सकैत छी:
              </p>

              <div className="bg-[#FAF5EF] p-6 rounded-2xl border border-[#D4AF37]/50 space-y-3">
                <div className="flex items-center justify-between text-sm border-b border-amber-200 pb-2">
                  <span className="font-bold text-gray-700">मुख्य संपर्ककर्ता:</span>
                  <span className="font-bold text-[#6A0909] text-base">{SITE_DETAILS.contactPerson}</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-amber-200 pb-2">
                  <span className="font-bold text-gray-700">मोबाइल नंबर:</span>
                  <a href={`tel:${SITE_DETAILS.contactMobile}`} className="font-bold text-[#E65100] text-base hover:underline">
                    {SITE_DETAILS.contactMobile}
                  </a>
                </div>
                <div className="flex items-start justify-between text-sm pt-1">
                  <span className="font-bold text-gray-700 shrink-0">स्थान:</span>
                  <span className="text-right text-gray-800">{SITE_DETAILS.location}</span>
                </div>
              </div>

              <div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#E65100] text-white px-6 py-3 rounded-xl font-bold border border-[#D4AF37] shadow hover:bg-[#D9531E] transition-all"
                >
                  <MapPin className="w-5 h-5 text-[#FFD700]" />
                  <span>संपर्क पेज पर जाउ</span>
                </Link>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="bg-[#4A0505] p-6 rounded-3xl border-2 border-[#D4AF37] text-white space-y-4 shadow-xl text-center">
              <div className="w-16 h-16 bg-[#E65100] rounded-full flex items-center justify-center mx-auto border border-[#FFD700]">
                <MapPin className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#FFD700]">
                दुर्गा स्थान, भटसिमर
              </h3>
              <p className="text-amber-100 text-sm font-serif">
                ग्राम - भटसिमर, प्रखंड - राजनगर/मधुबनी, जिला - मधुबनी, बिहार
              </p>
              <a
                href="https://maps.google.com/?q=Bhatsimar+Durga+Sthan"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#E65100] hover:bg-[#D9531E] text-white px-6 py-2.5 rounded-lg text-sm font-bold border border-[#D4AF37] shadow transition-all"
              >
                गूगल मैप्स पर रास्ता देखू 📍
              </a>
            </div>

          </div>
        </div>
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

export default Home;
