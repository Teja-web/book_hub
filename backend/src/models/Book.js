import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    genre: { type: String, default: 'General', index: true },
    year: { type: Number },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);


