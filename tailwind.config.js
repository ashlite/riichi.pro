/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,css}'],
  theme: {
    extend: { },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme:{             
        "primary": "#ed4909",
        "secondary": "#84cc16",
        "accent": "#22d3ee",
        "neutral": "#1b1d23",
        "base-100": "#2b2a41",
        "info": "#879be3",
        "success": "#1fb76b",
        "warning": "#fcd34d",
        "error": "#f16a6a",
        },
      },
    ],
    logs: true,
  },
}

