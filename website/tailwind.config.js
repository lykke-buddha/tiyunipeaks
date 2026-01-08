/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#000000',
                    800: '#111111',
                    700: '#1A1A1A',
                },
                primary: {
                    500: '#10B981', // Emerald
                    600: '#059669',
                },
                accent: {
                    gold: '#C5A572', // Placeholder gold
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
