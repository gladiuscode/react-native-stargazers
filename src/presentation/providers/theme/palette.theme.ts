const light = {
  background: '#ffffff',
  text: '#191818',
  error: '#f43838',
};

const dark: typeof light = {
  background: '#ffffff',
  text: '#191818',
  error: '#f43838',
};

const palette = {
  light,
  dark,
};

export type Palette = typeof light;

export type PaletteVariant = keyof typeof palette;

export default palette;
