import React from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/50 temple-card-shadow flex flex-col h-full group"
    >
      {/* Event Header Image / Badge */}
      <div className="relative h-48 sm:h-56 bg-[#6A0909] overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-mithila-pattern flex items-center justify-center p-6 text-center">
            <span className="font-heading text-2xl text-[#FFD700]">{event.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-[#E65100] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#D4AF37] shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FFD700]" />
          <span>{event.category || 'दुर्गा पूजा'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#FAF5EF] to-white">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#6A0909] mb-3 group-hover:text-[#E65100] transition-colors leading-snug">
            {event.title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-6 font-serif">
            {event.description}
          </p>
        </div>

        {/* Date, Time & Location Metadata */}
        <div className="space-y-2 pt-4 border-t border-amber-200/80 text-xs font-medium text-gray-800">
          <div className="flex items-center gap-2 text-[#E65100]">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{event.dateText}</span>
          </div>
          {event.timeText && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{event.timeText}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-[#6A0909] shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
