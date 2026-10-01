import mongoose from 'mongoose';

const historyTimelineSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, 'Year/Era is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    section: {
      type: String,
      enum: ['स्थापना', 'मंदिरक इतिहास', 'संस्थापक', 'पुरान परंपरा', 'पूजा-पाठ', 'महत्वपूर्ण घटना', 'वर्तमान स्वरूप', 'भविष्य लेल संरक्षण', 'अन्य'],
      default: 'मंदिरक इतिहास',
    },
    order: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('HistoryTimeline', historyTimelineSchema);
