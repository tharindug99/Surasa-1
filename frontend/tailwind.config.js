// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include files where Tailwind should look for classes
    './public/index.html', // Include your main HTML file
  ],
  theme: {
    extend: {}, // Optional: Extend Tailwind's default theme
  },
  plugins: [], // Optional: Add any additional Tailwind plugins
};
