/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: "#FF003C", // Neon red
          secondary: "#00FFF5", // Cyan
          accent: "#8B00FF", // Purple
          yellow: "#FFD300", // Neon yellow
          dark: "#0A0A0F", // Dark background
          darker: "#050507", // Darker background
          "gray-dark": "#1A1A23", // Dark gray
          "gray-light": "#2A2A35", // Light gray
        },
      },
      boxShadow: {
        neon: "0 0 5px theme(colors.cyber.primary), 0 0 20px theme(colors.cyber.primary)",
        "neon-cyan":
          "0 0 5px theme(colors.cyber.secondary), 0 0 20px theme(colors.cyber.secondary)",
        "neon-purple":
          "0 0 5px theme(colors.cyber.accent), 0 0 20px theme(colors.cyber.accent)",
      },
      fontFamily: {
        cyber: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
