import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    compress: true,
    poweredByHeader: false,

    // Pour Cloudinary
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default nextConfig;

