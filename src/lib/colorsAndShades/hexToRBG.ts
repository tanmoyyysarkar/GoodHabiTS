type RGB = { r: number; g: number; b: number };

export const hexToRBG = (hex: string): RGB => {
  const clean = hex.replace('#', '');

  //supports #RGB, #RRGGBB, #RRGGBBAA
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }

  const full = clean.length === 8 ? clean.slice(0, 6) : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  return { r, g, b };
};
