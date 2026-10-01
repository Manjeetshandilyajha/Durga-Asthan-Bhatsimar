import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    dateText: {
      type: String,
      required: [true, 'Date display text is required'],
    },
    eventDate: {
      type: Date,
    },
    timeText: {
      type: String,
      default: 'प्रातः ०६:०० बजे सँ',
    },
    location: {
      type: String,
      default: 'दुर्गा स्थान परिसर, भटसिमर',
    },
    category: {
      type: String,
      enum: ['दुर्गा पूजा', 'नवरात्रि', 'विशेष पूजा', 'वार्षिक कार्यक्रम'],
      default: 'दुर्गा पूजा',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
