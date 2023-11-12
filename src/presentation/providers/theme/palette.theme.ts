const light = {
  background: '#ffffff',
  text: '#191818',
  error: '#f43838',
  divider: '#a4a4a4',
};

const dark: typeof light = {
  background: '#ffffff',
  text: '#191818',
  error: '#f43838',
  divider: '#a4a4a4',
};

const palette = {
  light,
  dark,
};

export type Palette = typeof light;

export type PaletteVariant = keyof typeof palette;

export default palette;
