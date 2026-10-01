import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import EventCard from '../components/EventCard';
import API from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('सभटा');

  const categories = ['सभटा', 'दुर्गा पूजा', 'नवरात्रि', 'विशेष पूजा', 'वार्षिक कार्यक्रम'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = selectedCat === 'सभटा'
    ? events
    : events.filter(e => e.category === selectedCat);

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      {/* Banner */}
      <section className="bg-[#6A0909] text-white py-14 border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E65100] text-amber-100 text-xs font-bold border border-[#D4AF37]">
            <Calendar className="w-4 h-4 text-[#FFD700]" />
            <span>पावन पूजा आ उत्सव अनुष्ठान</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#FFD700]">
            पूजा आ वार्षिक कार्यक्रम
          </h1>
          <p className="max-w-2xl mx-auto text-amber-100 font-serif text-base sm:text-lg">
            भटसिमर दुर्गा स्थान में आयोजित होइ वाला मुख्य धार्मिक आ सांस्कृतिक उत्सव।
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                selectedCat === cat
                  ? 'bg-[#E65100] text-white border-[#D4AF37] shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-100/60 border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards */}
        {loading ? (
          <div className="text-center py-16 text-[#6A0909] font-bold text-lg">
            कार्यक्रम लोड भ रहल अछि...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-amber-200 text-gray-600 font-serif">
            एहि श्रेणी में एखनि कोणहु कार्यक्रम सूचीकृत नहि अछि।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((ev) => (
              <EventCard key={ev._id} event={ev} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
