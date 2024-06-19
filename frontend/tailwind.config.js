const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include all necessary file types
    "./public/index.html", // Include the public index.html file if applicable
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});