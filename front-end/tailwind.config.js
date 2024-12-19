/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(8, 14, 25)',
      },
      animation:{
        "notificationAnimation":"notificationAnimation 0.1s ease-in-out"
      },
      keyframes:{
        notificationAnimation:{
          "0%":{top:'0'},
          "100%":{top:'5'},
        }
      }
    },
  },
  plugins: [],
}

