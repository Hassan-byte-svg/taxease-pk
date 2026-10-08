import type { Config } from "tailwindcss";

/**
 * Design tokens. Runtime values are the CSS variables in app/globals.css.
 * Keep the hex values in both files aligned when the theme changes.
 * Spacing stays on Tailwind's 4px scale; use multiples of 2 (8px) in layout.
 */
export const tokens = {
  light: {
    background: "#F8FAFC",
    foreground: "#0F172A",
    card: "#FFFFFF",
    muted: "#F1F5F9",
    mutedForeground: "#475569",
    border: "#E2E8F0",
    primary: "#0F766E",
    primaryForeground: "#F0FDFA",
    accent: "#F59E0B",
    accentForeground: "#1C1917",
    success: "#047857",
    warning: "#B45309",
    danger: "#B91C1C",
  },
  dark: {
    background: "#0B1220",
    foreground: "#E2E8F0",
    card: "#111827",
    muted: "#1E293B",
    mutedForeground: "#94A3B8",
    border: "#334155",
    primary: "#14B8A6",
    primaryForeground: "#042F2E",
    accent: "#F59E0B",
    accentForeground: "#1C1917",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
  },
  radiusCard: "1rem",
} as const;

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        muted: "var(--muted)",
        border: "var(--border)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
    },
  },
};

export default config;
