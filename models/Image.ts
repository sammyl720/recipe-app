import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  secure_url: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})

const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
