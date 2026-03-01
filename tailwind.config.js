/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050506",
        "bg-base": "#050506",
        "bg-surface": "#111114",
        accent: "#e5e5e5",
        "accent-deep": "#d4d4d4",
        "text-primary": "#f5f5f5",
        "text-secondary": "#a3a3a3",
      },
      borderRadius: {
        panel: "12px",
        card: "8px",
      },
    },
  },
  plugins: [],
};

