/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        tsconfigPath: "tsconfig.server.json",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.youtube.com",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
        ],
    },
};

export default nextConfig;
