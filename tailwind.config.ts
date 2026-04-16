import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        background: {
          DEFAULT: "#ffffff",
          secondary: "#f8f8f8",
          tertiary: "#f4f4f4",
          muted: "#f2f2f2",
        },
        grey: {
          900: "#000000",
          800: "#262626",
          700: "#4c4a45",
          600: "#696969",
          500: "#878787",
          400: "#bdbcbc",
          300: "#e3e3e3",
          200: "#f2f2f2",
          100: "#f4f4f4",
          50: "#f8f8f8",
        },
        success: {
          DEFAULT: "#32cda3",
          light: "#e6f9f3",
        },
        info: {
          DEFAULT: "#001aff",
          light: "#e6e9ff",
        },
        warning: {
          DEFAULT: "#ffb038",
          light: "#fff5e6",
        },
        danger: {
          DEFAULT: "#eb5757",
          dark: "#e20303",
          light: "#fde8e8",
        },
        border: {
          DEFAULT: "#e3e3e3",
          light: "#f2f2f2",
          medium: "#bdbcbc",
        },
        foreground: {
          DEFAULT: "#000000",
          secondary: "#4c4a45",
          muted: "#878787",
          disabled: "#bdbcbc",
        },
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "6px",
        lg: "12px",
        xl: "16px",
        pill: "25px",
      },
      fontSize: {
        "2xs": ["9px", { lineHeight: "12px" }],
        xs: ["10px", { lineHeight: "14px" }],
        sm: ["11px", { lineHeight: "18px" }],
        base: ["13px", { lineHeight: "20px" }],
        md: ["15px", { lineHeight: "22px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["22px", { lineHeight: "30px" }],
        "2xl": ["28px", { lineHeight: "36px" }],
        "3xl": ["36px", { lineHeight: "44px" }],
        "4xl": ["48px", { lineHeight: "56px" }],
        "5xl": ["56px", { lineHeight: "64px" }],
      },
      boxShadow: {
        card: "0px 1px 10px rgba(0, 0, 0, 0.08)",
        "card-hover": "0px 4px 20px rgba(0, 0, 0, 0.12)",
        button: "0px 1px 10px rgba(0, 0, 0, 0.2)",
        dropdown: "0px 4px 16px rgba(0, 0, 0, 0.12)",
        modal: "0px 8px 32px rgba(0, 0, 0, 0.16)",
      },
      maxWidth: {
        container: "1440px",
      },
      spacing: {
        sidebar: "240px",
        "sidebar-collapsed": "64px",
        topbar: "64px",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "slide-in": "slide-in-right 0.3s ease-out",
        "slide-out": "slide-out-right 0.3s ease-in",
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
