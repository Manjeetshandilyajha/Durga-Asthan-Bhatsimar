import mongoose from 'mongoose';

const committeeMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'नाम अनिवार्य अछि'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'पद/पदनाम अनिवार्य अछि'],
      trim: true,
    },
    photo: {
      type: String,
      required: [true, 'फोटो अनिवार्य अछि'],
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

export default mongoose.model('CommitteeMember', committeeMemberSchema);
