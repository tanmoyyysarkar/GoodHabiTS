import { hexToRBG } from './hexToRBG';

type RGB = { r: number; g: number; b: number };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const mixChannel = (from: number, to: number, ratio: number) =>
  Math.round(from + (to - from) * ratio);

const mixRgb = (from: RGB, to: RGB, ratio: number): RGB => ({
  r: mixChannel(from.r, to.r, ratio),
  g: mixChannel(from.g, to.g, ratio),
  b: mixChannel(from.b, to.b, ratio),
});

const rgbToCss = ({ r, g, b }: RGB) => `rgb(${r}, ${g}, ${b})`;

export const getHeatMapColor = (
  value: number,
  maxValue: number,
  baseHex: string,
  isDark: boolean,
) => {
  const target = hexToRBG(baseHex);
  const start = isDark ? { r: 255, g: 255, b: 255 } : { r: 70, g: 70, b: 70 };

  if (value <= 0 || maxValue <= 0) {
    return rgbToCss(start);
  }

  const ratio = clamp01(value / maxValue);
  const mixed = mixRgb(start, target, ratio);

  return rgbToCss(mixed);
};
