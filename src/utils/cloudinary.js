import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localFilePath) => {
    try {
        console.log('Uploading image to Cloudinary...', localFilePath);

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        console.log('Image uploaded successfully:', result.secure_url);
        return result;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

export { uploadImage };
