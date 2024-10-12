import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderColor: {
        "c-light": "#eef2ff",
        "c-mid": "#e0e7ff",
        "c-mist": "#c7d2fe",
        "c-dark": "#a5b4fc",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        exd: "120rem",
      },
      minWidth: {
        input: "12rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        white: "#fff",
        transparent: "#00000000",
        pageBg: "#fcfefe", //ecf0f5 f9f9fa
        modal: "#00000080",
        cLight: "#eef2ff",
        cMid: "#e0e7ff",
        cMist: "#c7d2fe",
        cDark: "#a5b4fc",
        blue: {
          25: "#FEFBF6",
          50: "#eff6ff",
          100: "#e0f2fe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2c70dd",
          700: "#1d66d7",
          800: "#0f5cd2",
          900: "#0052cc",
          950: "#002266",
        },
        gray: {
          25: "#ffffff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#eaecf0",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#1A2E44",
          backdrop: "#10182850",
        },
        warning: {
          25: "#fffcf5",
          50: "#fffaeb",
          100: "#fef0c7",
          200: "#fedf89",
          300: "#fec84b",
          400: "#fdb022",
          500: "#f79009",
          600: "#dc6803",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          25: "#FEFBF6",
          50: "#eef4ff",
          100: "#e0f2fe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2c70dd",
          700: "#1d66d7",
          800: "#0f5cd2",
          900: "#0052cc",
          910: "#3F52E3",
          920: "#2876F9",
        },
        brand: {
          black: "#100C08", //Smoky Black
          grayBlue: "#2C3B4D", // Blue Fantastic
          blueAnchorFish: "#1B2632", // Abyssal AnchorFish
          arcticPowder: "#F1F6F4",
          mysticMint: "#D9E8E3",
          oceanicNoir: "#172B36",
          whiteLuster: "#F4F1EC",
          blueFlower: "#9BACD8",
          blueRoyal: "#223382",
          tan: "#DAD1C8",
          blueDeep: "#111144",
          orangeHabanero: "#F98513",
          kiriMist: "#C5C5D3",
          festiveFerret: "#DFDFE5",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
