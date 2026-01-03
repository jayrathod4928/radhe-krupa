import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,

    // FIXED: Enable Static Export
    output: 'export',

    // Essential for cPanel: transforms /product/1 into /product/1/index.html
    // This matches the folder structure I saw in your cPanel screenshot.
    trailingSlash: true,

    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: 'https', hostname: 'img.freepik.com' },
            { protocol: 'https', hostname: 'm.media-amazon.com' },
            { protocol: 'https', hostname: 'earthmintgold.com' },
            { protocol: 'https', hostname: 'cdn.shopify.com' },
        ],
    },
};

export default nextConfig;