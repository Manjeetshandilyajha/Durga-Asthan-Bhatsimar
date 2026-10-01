import mongoose from 'mongoose';

const panditSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'नाम आवश्यक अछि'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    photo: {
      type: String,
      required: [true, 'फोटो अनिवार्य अछि'],
    },
    role: {
      type: String,
      required: [true, 'भूमिका आवश्यक अछि'],
    },
    description: {
      type: String,
      required: [true, 'विवरण आवश्यक अछि'],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pandit', panditSchema);
