/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
        // domains: ['img.otruyenapi.com', 'sv1.otruyencdn.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.otruyenapi.com',
            },
            {
                protocol: 'https',
                hostname: 'sv1.otruyencdn.com',
            },
        ],
    },
};

export default nextConfig;
