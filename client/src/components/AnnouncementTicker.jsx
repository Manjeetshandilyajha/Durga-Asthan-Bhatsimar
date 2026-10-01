import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import API from '../services/api';

const AnnouncementTicker = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get('/announcements');
        setAnnouncements(res.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="bg-[#6A0909] text-white border-y border-[#D4AF37] py-2.5 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#E65100] text-amber-100 px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37] shrink-0">
          <Bell className="w-3.5 h-3.5 text-[#FFD700] animate-bounce" />
          <span>सूचना / समाचार:</span>
        </div>

        <div className="overflow-hidden relative flex-1">
          <div className="whitespace-nowrap animate-marquee flex items-center space-x-8 text-sm font-medium text-amber-100">
            {announcements.map((item, index) => (
              <span key={item._id || index} className="inline-flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#FFD700]" />
                <span className="font-bold text-[#FFD700]">{item.title}:</span>
                <span>{item.content}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
