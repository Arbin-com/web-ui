export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        sm: "2px",
        md: "4px",
        lg: "8px",
      },
      // modal,
      // screen,
      colors: {
        background: "red",
        foreground: "blue",
        text: "black",
        title: "black",
      },
    },
  },
};
