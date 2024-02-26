module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                react: {
                    DEFAULT: '#61dafb',
                },
            },
            animation: {
                'spin-slow': 'slow-spin .5s linear infinite',
            },
        },
    },
    variants: {
        extend: {
            animation: ['motion-safe'],
        },
    },
    plugins: [],
}
