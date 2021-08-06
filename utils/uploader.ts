const cloudinary = require('cloudinary').v2;

export default async function uploader(file, options) {
  try {
    const upload = await cloudinary.uploader.upload(file, options);
    return upload;
  } catch (error) {
    console.log(error, 'upload error');
    return null;
  }
}