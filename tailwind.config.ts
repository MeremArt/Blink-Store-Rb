import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "btn-gradient": "linear-gradient(90deg, #D29FFF, #5C52FF, #D8C7FF)",
      },
      fontWeight: {
        thin: "100",
        "extra-light": "200",
        light: "300",
        regular: "400",
        medium: "500",
        "semi-bold": "600",
        bold: "700",
        "extra-bold": "800",
        black: "900",
      },
      font: {
        Inter: "Inter",
        satoshi: "satoshi",
      },
      fontSize: {
        // Header element styles
        "h-m": ["3.25rem", { lineHeight: "3.25rem", fontWeight: 600 }],
        "h-1": ["3rem", { lineHeight: "4.05rem", fontWeight: 900 }],
        "h-2": ["2.75rem", { lineHeight: "3rem", fontWeight: 700 }],
        "h-3": ["2.5rem", { lineHeight: " 3.3125rem", fontWeight: 700 }],
        "h-4": [" 2.25rem", { lineHeight: "2.75rem", fontWeight: 700 }],
        "h-5": ["2rem", { lineHeight: " 2.5rem", fontWeight: 700 }],
        "h-6": ["2.75rem", { lineHeight: " 3rem", fontWeight: 500 }],
        // Body variant styles - [Large, Medium, Regular, Small]
        "body-m": ["1.5rem", { lineHeight: "2rem", fontWeight: 700 }],
        "body-d": ["1.125rem", { lineHeight: "1.5rem", fontWeight: 700 }],
        "body-1": ["1rem", { lineHeight: "1.5rem", fontWeight: 600 }],
        "body-2": ["1rem", { lineHeight: "1.5rem", fontWeight: 500 }],
        "body-4": ["1rem", { lineHeight: "1.5rem", fontWeight: 400 }],
        "body-3": ["1rem", { lineHeight: "2.0625rem", fontWeight: 500 }],
        "body-5": ["1.5rem", { lineHeight: "2.1rem", fontWeight: 700 }],
        "body-6": ["1rem", { lineHeight: "1.5rem", fontWeight: 700 }],
        "body-7": ["1rem", { lineHeight: "1.5rem", fontWeight: 700 }],
        "body-8": ["1.75rem", { lineHeight: "2.25rem", fontWeight: 700 }],
        "body-9": ["1.25rem", { lineHeight: "1.75rem", fontWeight: 700 }],
        "caption-s": ["0.875rem", { lineHeight: "1.5rem", fontWeight: 500 }],
        "caption-z": ["0.875rem", { lineHeight: "1.25rem", fontWeight: 700 }],
        "caption-x": ["0.875rem", { lineHeight: "1.25rem", fontWeight: 500 }],
        "footer-m": ["1.125rem", { lineHeight: " 1.75rem", fontWeight: 700 }],
        "footer-s": ["1rem", { lineHeight: "1.4rem", fontWeight: 500 }],
      },
      colors: {
        gray5: "#4B5563",
        gray4: "#374151",
        gray3: "#6B7280",
        blue1: "#1873CC",
        blue2: "#125699",
        blue3: "#0C3A66",
        blue4: "#1F2937",
      },
      screens: {
        mxl: { max: "1279px" },
        // => @media (max-width: 1279px){...}

        mlg: { max: "1023px" },
        // => @media (max-width: 1023px){...}

        mmd: { max: "769px" },
        // => @media (max-width: 767px){...}

        msm: { max: "639px" },
        // => @media (max-width: 639px){...}

        mxs: { max: "480px" },
        // => @media (max-width: 480px){...}

        mxxs: { max: "400px" },
        // => @media (max-width: 400px){...}

        mxxxs: { max: "320px" },
        // => @media (max-width: 320px){...}

        "ms-height": { raw: "(max-height: 700px)" },

        "mxl-height": { raw: "(max-height: 850px)" },
      },
    },
  },
  plugins: [],
};
export default config;
