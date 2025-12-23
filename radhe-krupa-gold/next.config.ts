import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* existing config options */
    reactCompiler: true,

    // ✅ Add external domains for next/image
    images: {
        domains: ["earthmintgold.com",
            "cdn.shopify.com",
        ],

    },
};

export default nextConfig;
