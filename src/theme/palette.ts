export const palette = {
  bg: '#F4EFE7',
  text: '#1F5663',
  primary: '#0F6977',
  sky: '#8ED1DC',
  lime: '#B8CF3A',
  orange: '#F39C34',
  magenta: '#E22C7D'
} as const;

export type PaletteKey = keyof typeof palette;

