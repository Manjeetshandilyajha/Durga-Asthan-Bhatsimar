import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle, AlertCircle, User } from 'lucide-react';
import { SITE_DETAILS } from '../utils/constants';
import API from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.message) {
      setStatusMessage({ type: 'error', text: 'कृपया सभटा फ़ील्ड भरू।' });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await API.post('/contact', formData);
      setStatusMessage({
        type: 'success',
        text: res.data.message || 'अहाँक संदेश सफलता पूर्वक प्राप्त भेल। धन्यवाद!',
      });
      setFormData({ name: '', mobile: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      setStatusMessage({
        type: 'error',
        text: error.response?.data?.message || 'संदेश भेजै में समस्या आएल।',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      {/* Banner */}
      <section className="bg-[#6A0909] text-white py-14 border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E65100] text-amber-100 text-xs font-bold border border-[#D4AF37]">
            <Phone className="w-4 h-4 text-[#FFD700]" />
            <span>संपर्क आ सहायता</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FFD700]">
            दुर्गा स्थान संपर्क करू
          </h1>
          <p className="max-w-2xl mx-auto text-amber-100 font-serif text-base sm:text-lg">
            मंदिर संबंधी कोणहु जानकारी, पूजा परामर्श या सुझाव हेतु सीधा संपर्क करू।
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Contact Person Box */}
            <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] temple-card-shadow space-y-5">
              <div className="flex items-center gap-3 border-b border-amber-200 pb-4">
                <div className="w-12 h-12 bg-[#6A0909] text-[#FFD700] rounded-2xl flex items-center justify-center font-bold text-xl border border-[#D4AF37]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">मुख्य संपर्ककर्ता</span>
                  <h2 className="font-heading text-2xl font-bold text-[#6A0909]">
                    {SITE_DETAILS.contactPerson}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FAF5EF] rounded-xl flex items-center justify-center text-[#E65100]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">मोबाइल नंबर</span>
                    <a href={`tel:${SITE_DETAILS.contactMobile}`} className="text-lg font-extrabold text-[#E65100] hover:underline">
                      {SITE_DETAILS.contactMobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#FAF5EF] rounded-xl flex items-center justify-center text-[#6A0909] shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">मंदिर स्थान (Address)</span>
                    <p className="text-sm text-gray-800 font-serif leading-relaxed">
                      {SITE_DETAILS.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Chat Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_DETAILS.whatsappNumber}?text=${encodeURIComponent('जय माता दी! दुर्गा स्थान भटसिमर मंदिर संबंध में संदेश:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp पर सीधा गपशप करू</span>
                </a>
              </div>
            </div>

            {/* Location & Direction Card */}
            <div className="bg-[#4A0505] p-6 rounded-3xl border border-[#D4AF37] text-white text-center space-y-3">
              <MapPin className="w-8 h-8 text-[#FFD700] mx-auto animate-bounce" />
              <h3 className="font-heading text-xl font-bold text-[#FFD700]">
                भटसिमर दुर्गा स्थान मार्ग
              </h3>
              <p className="text-xs text-amber-100 font-serif">
                मधुबनी जिला सँ सुगम सड़क मार्ग द्वारा भटसिमर दुर्गा स्थान पहुँचल जा सकैत अछि।
              </p>
              <a
                href="https://maps.google.com/?q=Bhatsimar+Durga+Sthan"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#E65100] hover:bg-[#D9531E] text-white px-5 py-2.5 rounded-xl text-xs font-bold border border-[#D4AF37]"
              >
                गूगल मैप्स नेविगेशन चालू करू 📍
              </a>
            </div>

          </div>

          {/* Column 2: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/50 temple-card-shadow">
              <h2 className="font-heading text-2xl font-bold text-[#6A0909] mb-2">
                संदेश भेजू (Send Message)
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-serif mb-6">
                दुर्गा स्थान मंदिर समिति के अपन संदेश, प्रश्न या सुझाव लिखू:
              </p>

              {statusMessage && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm font-medium ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-red-50 text-red-800 border border-red-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>{statusMessage.text}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    अपन नाम *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="उदा. मंजीत कुमार झा"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] outline-none font-serif text-sm bg-[#FAF5EF]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="उदा. 9905697921"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] outline-none font-serif text-sm bg-[#FAF5EF]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    संदेश / प्रश्न *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="अपन संदेश लिखू..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] outline-none font-serif text-sm bg-[#FAF5EF]/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#E65100] hover:bg-[#D9531E] text-white font-bold rounded-xl border-2 border-[#D4AF37] shadow-xl text-base transition-all hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 text-[#FFD700]" />
                  <span>{submitting ? 'संदेश भेजल जा रहल अछि...' : 'संदेश भेजू (Send Message)'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
