// Single source of truth for all colors (for both Tailwind config and runtime tokens)

const colorPalette = {
  // ══════════════════════════════════════════════════════════════════════════
  // DARK MODE ("Deep Forest & Campfire")
  // ══════════════════════════════════════════════════════════════════════════

  // ── Page Background Gradient
  'page-start': '#1c1f1b',      // Deep muted forest green/grey
  'page-mid': '#242722',        // Slightly lighter, earthy tone
  'page-end': '#21261f',        // Grounding dark base

  // ── Surfaces
  'card-bg': '#2b2f29',         // Flat, elevated surface off the background
  'card-bg-elevated': '#343831',// Floating elements (dropdowns, modals)
  'tabbar-bg': '#2a2d2a',       // Special floating tab bar at bottom

  // ── Borders
  'border': '#40473c',          // Subtle structural lines

  // ── Buttons & Accents
  'button-primary': '#e05330',       // Energetic terracotta/coral (The "Campfire")
  'button-primary-hover': '#fa9171', // Brighter for interactions
  'button-secondary': '#3f4f41',     // Muted sage for less important actions
  'button-primary-tint': '#3d2920',  // Subtle background tint for accent elements

  // ── Semantic
  'success': '#4db879',         // Fresh mint green for completed habits
  'danger': '#e65c5c',          // Softened red for deletions/missed streaks

  // ── Text
  'text-primary': '#f5f7f2',    // Off-white with a tiny hint of green
  'text-secondary': '#a9b0a4',  // Muted mossy grey for descriptions
  'text-tertiary': '#787d74',   // Deep muted grey for placeholders/timestamps

  // ══════════════════════════════════════════════════════════════════════════
  // LIGHT MODE ("Morning Dew & Clay")
  // ══════════════════════════════════════════════════════════════════════════

  // ── Page Background Gradient
  'page-start-light': '#fcfbf7',// Warm, fresh morning cream
  'page-mid-light': '#f7f6f0',  // Slightly deeper parchment
  'page-end-light': '#f0efe9',  // Grounding base

  // ── Surfaces
  'card-bg-light': '#ffffff',        // Crisp white for standard cards
  'card-bg-elevated-light': '#f5f4ed',// Slightly tinted for floating menus
  'tabbar-bg-light': '#faf9f3',      // Special floating tab bar at bottom

  // ── Borders
  'border-light': '#e2e6db',         // Soft sage-tinted divider

  // ── Buttons & Accents
  'button-primary-light': '#f3592b',       // Bold terracotta for main actions
  'button-primary-hover-light': '#d4562f', // Darker/richer on hover
  'button-secondary-light': '#e1e8db',     // Soft mint/sage for secondary pills
  'button-primary-tint-light': '#f4e6db',  // Subtle background tint for accent elements

  // ── Semantic
  'success-light': '#2d9c5d',   // Strong, legible green for checked-off hobbies
  'danger-light': '#d94242',    // Punchy red for destructive actions

  // ── Text
  'text-primary-light': '#2a2e28',  // Deep espresso-green for high contrast reading
  'text-secondary-light': '#636b5e',// Muted natural grey for subtitles
  'text-tertiary-light': '#98a192', // Light grey for metadata/hints
} as const;

export const inkRoseDark = {
  pageBg: [colorPalette['page-start'], colorPalette['page-mid'], colorPalette['page-end']] as const,
  cardBg: colorPalette['card-bg'],
  cardBgElevated: colorPalette['card-bg-elevated'],
  tabbarBg: colorPalette['tabbar-bg'],
  border: colorPalette['border'],
  buttonPrimary: colorPalette['button-primary'],
  buttonPrimaryHover: colorPalette['button-primary-hover'],
  buttonPrimaryTint: colorPalette['button-primary-tint'],
  buttonSecondary: colorPalette['button-secondary'],
  success: colorPalette['success'],
  danger: colorPalette['danger'],
  textPrimary: colorPalette['text-primary'],
  textSecondary: colorPalette['text-secondary'],
  textTertiary: colorPalette['text-tertiary'],
} as const;

export const inkRoseLight = {
  pageBg: [colorPalette['page-start-light'], colorPalette['page-mid-light'], colorPalette['page-end-light']] as const,
  cardBg: colorPalette['card-bg-light'],
  cardBgElevated: colorPalette['card-bg-elevated-light'],
  tabbarBg: colorPalette['tabbar-bg-light'],
  border: colorPalette['border-light'],
  buttonPrimary: colorPalette['button-primary-light'],
  buttonPrimaryHover: colorPalette['button-primary-hover-light'],
  buttonPrimaryTint: colorPalette['button-primary-tint-light'],
  buttonSecondary: colorPalette['button-secondary-light'],
  success: colorPalette['success-light'],
  danger: colorPalette['danger-light'],
  textPrimary: colorPalette['text-primary-light'],
  textSecondary: colorPalette['text-secondary-light'],
  textTertiary: colorPalette['text-tertiary-light'],
} as const;

export type ThemeTokens = typeof inkRoseDark | typeof inkRoseLight;

// Export for Tailwind config — single source of truth
export const tailwindColors = colorPalette;
