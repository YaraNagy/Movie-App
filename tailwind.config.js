/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        contactBgImg: "url('/images/cinema.jpg')"
      },
      
      colors: {
        "darkBlack": '#0A0A0A', // Custom color
         'custom-gray' :'#040711'
      },
    },
    keyframes: {
      slideInFromLeft: {
        "0%": {
          transform: "translateX(-100%)",
          opacity: "0"
        },
        "100%": {
          transform: "translateX(0)",
          opacity: "1"
        }
      },
      dropFromTop: {
        "0%": {
          transform: "translateY(-100%)",
          opacity: "0"
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1"
        }
      }
    },
    animation: {
      slidingFromLeft: "slideInFromLeft 1s ease-out forwards",
      droppingFromTop: "dropFromTop 1s ease-out forwards"
    }

  },
  plugins: [],
};
