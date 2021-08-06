import mongoose from 'mongoose';
import slugify from '../utils/slugify';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  likeCount: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  category: [
    {
      type: String
    }
  ],
  prepTime: {
    type: Number,
    default: 0
  },
  servingCount: {
    type: Number,
    default: 0
  }
});
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export default Recipe;