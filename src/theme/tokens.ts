// Single source of truth for all colors (for both Tailwind config and runtime tokens)

const colorPalette = {
  // ══════════════════════════════════════════════════════════════════════════
  // DARK MODE
  // ══════════════════════════════════════════════════════════════════════════

  // ── Page Background
  'page-bg': '#1b1b1b',

  // ── Surfaces
  'card-bg': '#151515',
  'card-bg-elevated': '#2d2d2d',
  'tabbar-bg': '#292929',

  // ── Borders
  'border': '#6b6b6b',

  // ── Buttons & Accents
  'button-primary': '#b80000',

  // ── Text
  'text-primary': '#ffffff',
  'text-secondary': '#b4bed3',
  'text-tertiary': '#8aa0cf',

  // ══════════════════════════════════════════════════════════════════════════
  // LIGHT MODE
  // ══════════════════════════════════════════════════════════════════════════

  // ── Page Background
  'page-bg-light': '#eff4ff',   // Clean cloud background for bento layout

  // ── Surfaces
  'card-bg-light': '#e8f0fa',         // Crisp white for standard cards
  'card-bg-elevated-light': '#cdd5eb',// Slightly tinted for floating menus
  'tabbar-bg-light': '#eef2fb',       // Special floating tab bar at bottom

  // ── Borders
  'border-light': '#000',          // Soft grid divider for card separation

  // ── Buttons & Accents
  'button-primary-light': '#b80000',       // Energetic coral CTA on light mode

  // ── Text
  'text-primary-light': '#000000',  // Deep slate for primary reading
  'text-secondary-light': '#1c1c1c',// Muted slate for supporting text
  'text-tertiary-light': '#242c40', // Soft tertiary metadata tone
} as const;

export const inkRoseDark = {
  pageBg: colorPalette['page-bg'],
  cardBg: colorPalette['card-bg'],
  cardBgElevated: colorPalette['card-bg-elevated'],
  tabbarBg: colorPalette['tabbar-bg'],
  border: colorPalette['border'],
  buttonPrimary: colorPalette['button-primary'],
  textPrimary: colorPalette['text-primary'],
  textSecondary: colorPalette['text-secondary'],
  textTertiary: colorPalette['text-tertiary'],
} as const;

export const inkRoseLight = {
  pageBg: colorPalette['page-bg-light'],
  cardBg: colorPalette['card-bg-light'],
  cardBgElevated: colorPalette['card-bg-elevated-light'],
  tabbarBg: colorPalette['tabbar-bg-light'],
  border: colorPalette['border-light'],
  buttonPrimary: colorPalette['button-primary-light'],
  textPrimary: colorPalette['text-primary-light'],
  textSecondary: colorPalette['text-secondary-light'],
  textTertiary: colorPalette['text-tertiary-light'],
} as const;

export type ThemeTokens = typeof inkRoseDark | typeof inkRoseLight;

// Export for Tailwind config — single source of truth
export const tailwindColors = colorPalette;
