import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper pour upload (utilisé dans les API routes)
export async function uploadImage(fileBuffer: Buffer, folder: string = 'blog/articles') {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto',
                transformation: [
                    { width: 1200, height: 630, crop: 'limit' },
                    { quality: 'auto:good' },
                    { fetch_format: 'auto' },
                ],
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(fileBuffer);
    });
}

// Helper pour supprimer
export async function deleteImage(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
    }
}
