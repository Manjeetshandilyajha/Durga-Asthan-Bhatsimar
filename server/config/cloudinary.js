import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath, folder = 'durga-sthan-bhatsimar') => {
  try {
    // Check if real cloudinary credentials exist
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'demo_cloud' &&
      process.env.CLOUDINARY_API_KEY !== '1234567890'
    ) {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        use_filename: true,
      });
      // Remove temporary local file after upload
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } else {
      // Local static upload fallback
      const filename = filePath.split(/[/\\]/).pop();
      return {
        url: `/uploads/${filename}`,
        publicId: `local_${filename}`,
      };
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const filename = filePath.split(/[/\\]/).pop();
    return {
      url: `/uploads/${filename}`,
      publicId: `local_${filename}`,
    };
  }
};

export default cloudinary;
