import React, { useState } from 'react';
import { Send, Upload, CheckCircle, AlertCircle, FileText, User, Phone } from 'lucide-react';
import API from '../services/api';

const ShareHistoryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    historyInfo: '',
    story: '',
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.historyInfo) {
      setStatusMessage({ type: 'error', text: 'कृपया नाम, मोबाइल नंबर आ इतिहासिक जानकारी अनिवार्य रूप सँ भरू।' });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('mobile', formData.mobile);
      data.append('historyInfo', formData.historyInfo);
      data.append('story', formData.story);
      if (file) {
        data.append('image', file);
      }

      const res = await API.post('/history-submissions', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatusMessage({
        type: 'success',
        text: res.data.message || 'अहाँक इतिहासिक जानकारी सफलता पूर्वक प्राप्त भेल। धन्यवाद!',
      });

      // Reset Form
      setFormData({ name: '', mobile: '', historyInfo: '', story: '' });
      setFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      setStatusMessage({
        type: 'error',
        text: error.response?.data?.message || 'सबमिशन में त्रुटि आएल। कृपया पुनः प्रयास करू।',
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
            <Send className="w-4 h-4 text-[#FFD700]" />
            <span>जन योगदान आ संस्मरण</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FFD700]">
            दुर्गा स्थानक इतिहास साझा करू
          </h1>
          <p className="max-w-2xl mx-auto text-amber-100 font-serif text-base sm:text-lg">
            यदि अहाँक लग दुर्गा स्थान भटसिमरक कोणहु पुरान फोटो, कथा, या ऐतिहासिक तथ्य अछि तऽ एहि फॉर्म द्वारा जरूर भेजू।
          </p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/50 temple-card-shadow">
          <h2 className="font-heading text-2xl font-bold text-[#6A0909] mb-2 text-center">
            ऐतिहासिक योगदान फॉर्म
          </h2>
          <p className="text-center text-gray-600 text-xs sm:text-sm font-serif mb-8">
            अहाँ द्वारा भेजल गेल जानकारी मंदिर समिति द्वारा सत्यापन के बाद प्रकाशित कैल जायत।
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
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#E65100]" />
                अपन नाम *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="उदा. मंजीत कुमार झा"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] focus:border-transparent outline-none font-serif text-sm bg-[#FAF5EF]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#E65100]" />
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="उदा. 9905697921"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] focus:border-transparent outline-none font-serif text-sm bg-[#FAF5EF]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#E65100]" />
                ऐतिहासिक जानकारी / तथ्य *
              </label>
              <textarea
                name="historyInfo"
                value={formData.historyInfo}
                onChange={handleChange}
                rows={4}
                placeholder="दुर्गा स्थानक स्थापना, पुरान परंपरा या कोणहु मुख्य घटनाक विवरण..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] focus:border-transparent outline-none font-serif text-sm bg-[#FAF5EF]/50"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                अपन संस्मरण या व्यक्तिगत कथा (ऐच्छिक)
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                rows={3}
                placeholder="दुर्गा स्थान सँ जुड़ल अहाँक कोणहु व्यक्तिगत अनुभव या संस्मरण..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] focus:border-transparent outline-none font-serif text-sm bg-[#FAF5EF]/50"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-[#E65100]" />
                पुरान फोटो या दस्तावेज (इमेज)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#6A0909] file:text-white hover:file:bg-[#4A0505] cursor-pointer"
              />
              {file && (
                <p className="text-xs text-emerald-700 font-semibold mt-1">
                  चयनित फ़ाइल: {file.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#E65100] hover:bg-[#D9531E] text-white font-bold rounded-xl border-2 border-[#D4AF37] shadow-xl text-base transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {submitting ? 'सबमिट भ रहल अछि...' : 'जानकारी सबमिट करू (Submit History)'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ShareHistoryPage;
