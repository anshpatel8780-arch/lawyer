/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                'xs': '320px',   // Extra small - Mobile phones
                'sm': '640px',   // Small - Tablets
                'md': '768px',   // Medium - Tablets / Small laptops
                'lg': '1024px',  // Large - Laptops
                'xl': '1280px',  // Extra Large - Desktop
                '2xl': '1536px', // 2XL - Large Desktop
            },
            colors: {
                "primary": "#196ee6",
                "primary-dark": "#0d4ba0",
                "secondary": "#0e131b",
                "danger": "#ef4444",
                "success": "#22c55e",
                "background-light": "#f6f7f8",
                "background-dark": "#111821",
                "surface-dark": "#1a2432",
                "border-dark": "#243347",
                "text-main": "#1c180d",
                "text-muted": "#9c8749",
                "border-color": "#e8e2ce",
            },
            fontFamily: {
                "display": ["Public Sans", "sans-serif"]
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
            }
        },
    },
    plugins: [],
}
