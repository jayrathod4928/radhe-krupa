import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1rem",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"), // 👈 This is the most important part for WP content
    ],
};
export default config;