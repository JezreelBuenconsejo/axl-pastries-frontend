import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
    extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			},
      colors: {
        main: {
          purple: "#9C68F6",
          lightPurple: "#ECD9FF",
          lightBlue: "#829FFF",
          skyBlue: "#BCF7FF",
        },
        neutral: {
          100: "#F6F8FF",
        },
        fontColor: {
          gray: "#878787",
        },
      },
      borderRadius: {
				landingPage: "25% 60% 70% 25% / 61% 38% 55% 25%"
      },

      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        signika: ["Signika"],
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
