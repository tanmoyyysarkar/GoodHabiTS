// Single source of truth for all colors (for both Tailwind config and runtime tokens)

const colorPalette = {
  // ══════════════════════════════════════════════════════════════════════════
  // DARK MODE
  // ══════════════════════════════════════════════════════════════════════════

  // ── Page backgrounds
  'page-start': '#12100e',
  'page-mid': '#1a1118',
  'page-end': '#100e14',

  // ── Glass surfaces
  'glass-surface': 'rgba(255,255,255,0.05)',
  'glass-card': 'rgba(255,255,255,0.04)',
  'glass-nested': 'rgba(255,255,255,0.025)',
  'glass-tabbar': 'rgba(255,255,255,0.07)',

  // ── Borders
  'glass-border': 'rgba(232,133,106,0.12)',

  // ── Accent
  'accent': '#e8856a',
  'accent-tint': 'rgba(232,133,106,0.14)',
  'accent-glow': 'rgba(232,133,106,0.08)',

  // ── Semantic
  'success': '#3ecf8e',
  'danger': '#e05050',

  // ── Text
  'text-primary': '#f0dde4',
  'text-secondary': '#c09080',
  'text-tertiary': '#7a5848',

  // ══════════════════════════════════════════════════════════════════════════
  // LIGHT MODE
  // ══════════════════════════════════════════════════════════════════════════

  // ── Page backgrounds
  'page-start-light': '#fdf8f4',
  'page-mid-light': '#faf3ef',
  'page-end-light': '#fdf6f8',

  // ── Glass surfaces
  'glass-surface-light': 'rgba(255,255,255,0.72)',
  'glass-card-light': 'rgba(255,240,236,0.60)',
  'glass-nested-light': 'rgba(255,235,230,0.45)',
  'glass-tabbar-light': 'rgba(255,255,255,0.80)',

  // ── Borders
  'glass-border-light': 'rgba(232,133,106,0.16)',

  // ── Accent
  'accent-light': '#c96448',
  'accent-tint-light': 'rgba(201,100,72,0.10)',
  'accent-glow-light': 'rgba(201,100,72,0.06)',

  // ── Surface rose (inputs, search bars)
  'surface-rose': 'rgba(232,220,215,0.60)',

  // ── Semantic
  'success-light': '#14a064',
  'danger-light': '#c0422a',

  // ── Text
  'text-primary-light': '#1a1210',
  'text-secondary-light': '#6a4038',
  'text-tertiary-light': '#b08070',
} as const;

export const inkRoseDark = {
  pageBg: [colorPalette['page-start'], colorPalette['page-mid'], colorPalette['page-end']] as const,
  glassSurface: colorPalette['glass-surface'],
  glassCard: colorPalette['glass-card'],
  glassNested: colorPalette['glass-nested'],
  glassBorder: colorPalette['glass-border'],
  glassTabbar: colorPalette['glass-tabbar'],
  accent: colorPalette['accent'],
  accentTint: colorPalette['accent-tint'],
  accentGlow: colorPalette['accent-glow'],
  surfaceRose: undefined,
  success: colorPalette['success'],
  danger: colorPalette['danger'],
  textPrimary: colorPalette['text-primary'],
  textSecondary: colorPalette['text-secondary'],
  textTertiary: colorPalette['text-tertiary'],
} as const;

export const inkRoseLight = {
  pageBg: [colorPalette['page-start-light'], colorPalette['page-mid-light'], colorPalette['page-end-light']] as const,
  glassSurface: colorPalette['glass-surface-light'],
  glassCard: colorPalette['glass-card-light'],
  glassNested: colorPalette['glass-nested-light'],
  glassBorder: colorPalette['glass-border-light'],
  glassTabbar: colorPalette['glass-tabbar-light'],
  accent: colorPalette['accent-light'],
  accentTint: colorPalette['accent-tint-light'],
  accentGlow: colorPalette['accent-glow-light'],
  surfaceRose: colorPalette['surface-rose'],
  success: colorPalette['success-light'],
  danger: colorPalette['danger-light'],
  textPrimary: colorPalette['text-primary-light'],
  textSecondary: colorPalette['text-secondary-light'],
  textTertiary: colorPalette['text-tertiary-light'],
} as const;

export type ThemeTokens = typeof inkRoseDark;

// Export for Tailwind config — single source of truth
export const tailwindColors = colorPalette;
