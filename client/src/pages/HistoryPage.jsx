import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';
import TimelineItem from '../components/TimelineItem';
import API from '../services/api';

const HistoryPage = () => {
  const [timelineItems, setTimelineItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/history');
        setTimelineItems(res.data);
      } catch (error) {
        console.error('Error fetching history timeline:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const historySections = [
    {
      title: 'स्थापना',
      desc: 'दुर्गा स्थान, भटसिमर में दुर्गा पूजा के शुरुआत वर्ष 1971 में भेल।'
    },
    {
      title: 'दुर्गा पूजा के शुरुआत',
      desc: 'वर्ष 1971 में भूतपूर्व मुखिया स्वर्गीय रमेश्वर ठाकुर, श्री इन्द्रनाथ झा आ समस्त ग्रामवासी के सहयोग सँ दुर्गा पूजा के शुरुआत भेल।'
    },
    {
      title: 'संस्थापक आ ग्रामवासी सभक योगदान',
      desc: 'दुर्गा पूजा के शुरुआत में भूतपूर्व मुखिया स्वर्गीय रमेश्वर ठाकुर, श्री इन्द्रनाथ झा आ समस्त ग्रामवासी सभक महत्वपूर्ण योगदान रहल।'
    },
    {
      title: 'पूजा के परंपरा',
      desc: 'दुर्गा स्थान, भटसिमर में प्रत्येक वर्ष अश्विन मास में माँ दुर्गाक पूजा श्रद्धा आ भक्तिभाव सँ आयोजित होइत अछि।'
    },
    {
      title: 'पूजा-पाठ',
      desc: 'वैदिक चंडी पाठ, बली/पुष्पांजलि विधान आ संध्या महाआरती।'
    },
    {
      title: 'महत्वपूर्ण तथ्य',
      desc: 'भटसिमर में दुर्गा पूजा के परंपरा वर्ष 1971 सँ निरंतर चलि रहल अछि आ ई ग्रामवासी सभक आस्था के महत्वपूर्ण केंद्र अछि।'
    },
    {
      title: 'वर्तमान स्वरूप',
      desc: 'दुर्गा स्थान, भटसिमर आजो ग्रामवासी सभक श्रद्धा, आस्था आ धार्मिक परंपरा के केंद्र बनल अछि।'
    },
    {
      title: 'भविष्य लेल संरक्षण',
      desc: 'सांस्कृतिक धरोहर के भावी पीढ़ी लेल सुरक्षित रखबाक संकल्प।'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      {/* Header Banner */}
      <section className="bg-[#6A0909] text-white py-14 border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E65100] text-amber-100 text-xs font-bold border border-[#D4AF37]">
            <BookOpen className="w-4 h-4 text-[#FFD700]" />
            <span>सत्यापित इतिहास आ परंपरा</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FFD700]">
            दुर्गा स्थान भटसिमरक इतिहास
          </h1>
          <p className="max-w-2xl mx-auto text-amber-100 font-serif text-base sm:text-lg">
            पावन भटसिमर ग्राम में माँ दुर्गा स्थानक ऐतिहासिक कालक्रम, प्राचीन परंपरा आ सांस्कृतिक संरक्षणक संस्मरण।
          </p>
        </div>
      </section>

      {/* Verified Notice Alert Box */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-amber-50 border-2 border-[#D4AF37] p-4 rounded-xl flex items-start gap-3 shadow-md text-sm text-[#6A0909]">
          <AlertCircle className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">विशेष सूचना:</span> मंदिरक आधिकारिक इतिहास के पूर्णतः सत्यापित आ प्रामाणिक रखल गेल अछि। भविष्य में मंदिर समिति आ बुजुर्ग समाज द्वारा प्राप्त नबीन तथ्य एडमिन पैनल सँ अद्यतन कैल जायत।
          </div>
        </div>
      </div>

      {/* 8 History Core Sections Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#6A0909] mb-2">
            ऐतिहासिक पहलू (History Aspects)
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {historySections.map((sec, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#D4AF37]/40 temple-card-shadow hover:border-[#D4AF37] transition-all">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#E65100] mb-2">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>अध्याय {idx + 1}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#6A0909] mb-2">{sec.title}</h3>
              <p className="text-gray-600 text-xs font-serif leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vertical Historical Timeline Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-[#6A0909] mb-2 flex items-center justify-center gap-2">
            <Clock className="w-7 h-7 text-[#E65100]" />
            ऐतिहासिक कालक्रम (Historical Timeline)
          </h2>
          <p className="text-gray-600 text-sm font-serif">दुर्गा स्थान भटसिमरक मुख्य ऐतिहासिक पड़ाव</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#6A0909] font-bold">इतिहास लोड भ रहल अछि...</div>
        ) : (
          <div className="relative">
            {/* Center Vertical Line */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E65100] via-[#D4AF37] to-[#6A0909]"></div>

            {/* Timeline Items */}
            {timelineItems.map((item, index) => (
              <TimelineItem key={item._id || index} item={item} isEven={index % 2 === 0} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HistoryPage;
