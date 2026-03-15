// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A',
            },
            spacing: {
                '128': '32rem',
            },
        },
    },
    plugins: [],
};

export default config;