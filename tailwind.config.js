// /** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                'persian-blue': {
                    '50': '#ebf6ff',
                    '100': '#dbedff',
                    '200': '#bfdcff',
                    '300': '#98c4ff',
                    '400': '#6fa0ff',
                    '500': '#4d7cff',
                    '600': '#2d53fe',
                    '700': '#1d3bd3',
                    '800': '#1e39b5',
                    '900': '#21378e',
                    '950': '#141f52',
                },
            }
        },
    },
    plugins: [],
}