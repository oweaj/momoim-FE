import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "460px",
        blg: "1100px",
      },
      colors: {
        main: {
          DEFAULT: "#5A25E9", // Normal
          selected: "#440DD9", // Selected/Pressed
        },
        gray: {
          100: "#F8F8FA",
          200: "#F0F1F6",
          250: "#ECEAF5",
          300: "#E1E2E8",
          400: "#C7CAD0",
          500: "#AAABB3",
          600: "#777780",
          700: "#636267",
          800: "#29292D",
          900: "#1A1A1C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        chipfc: {
          open: "#FFFFFF", // 모집 중
          full: "#FFFFFF", // 정원 초과
          closed: "#777780", // 접수 마감
          canceled: "#C73465", // 모임  취소
          finishied: "#777780", // 모임 종료
          online: "#FF6C00", // 온라인
          regular: "#00CB00", // 정기
        },
        chipbg: {
          open: "#5A25E9",
          full: "#C73465",
          closed: "#F0F1F6",
          canceled: "#FFE9F2",
          finishied: "#F0F1F6",
          online: "#FFFDC3",
          regular: "#E6F8E7",
        },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      dropShadow: {
        base: "0px 0px 10px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide"), require("@tailwindcss/typography")],
} satisfies Config;
