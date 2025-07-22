import { v2 as cloudinary } from "cloudinary";

import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadImage = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        // file has been uploaded successfully
        console.info(`Image uploaded successfully: ${result.secure_url}`);
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Clean up the local file
        // Log the error for debugging purposes 
        console.error('Error uploading image to Cloudinary:', error.message);
        console.log('Error uploading image to Cloudinary:', error);
        return null;
    }
}


export { uploadImage };

