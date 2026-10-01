import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    publicId: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['मंदिर फोटो', 'माता रानी', 'दुर्गा पूजा', 'नवरात्रि', 'ऐतिहासिक फोटो', 'गांवक आयोजन'],
      default: 'मंदिर फोटो',
    },
    description: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
