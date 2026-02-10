/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#009FB8',
                secondary: '#FEDB39',
                'dark-bg': '#1A1A1A',
                'dark-card': '#2D2D2D',
            },
            animation: {
                'bloom-entry': 'bloomEnter 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards', // Entrada con rebote
                'radiate-pulse': 'radiate 2s ease-out infinite 1s', // Onda expansiva, inicia después de 1s
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                bloomEnter: {
                    '0%': { opacity: '0', transform: 'scale(0.5) translateY(20px)' },
                    '70%': { opacity: '1', transform: 'scale(1.1)' }, // El "overshoot" (crece un poco más)
                    '100%': { opacity: '1', transform: 'scale(1)' }, // Se asienta
                },
                radiate: {
                    '0%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' }, // Usa tu color primario aquí (ej. azul)
                    '70%': { boxShadow: '0 0 0 20px rgba(59, 130, 246, 0)' }, // Se expande y desvanece
                    '100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
