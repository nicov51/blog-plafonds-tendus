import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Autorise toutes les images Cloudinary
            },
        ],
    },
};

export default nextConfig;

