const light = {
  background: '#ffffff',
  text: '#191818',
};

const dark: typeof light = {
  background: '#ffffff',
  text: '#191818',
};

const palette = {
  light,
  dark,
};

export type Palette = typeof light;

export type PaletteVariant = keyof typeof palette;

export default palette;
