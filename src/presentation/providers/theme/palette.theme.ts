const light = {
  background: '#ffffff',
  text: '#191818',
  textLight: 'rgba(25,24,24,0.37)',
  error: '#f43838',
  errorSurface: 'rgb(255,185,185)',
  success: '#4ca742',
  successSurface: 'rgb(213,255,213)',
  divider: '#a4a4a4',
  border: '#191818',
};

const dark: typeof light = {
  background: '#1a1a1a',
  text: '#f1f1f1',
  textLight: 'rgba(255,255,255,0.82)',
  error: '#f43838',
  errorSurface: 'rgb(255,185,185)',
  success: '#4ca742',
  successSurface: 'rgb(213,255,213)',
  divider: '#a4a4a4',
  border: '#f1f1f1',
};

const palette = {
  light,
  dark,
};

export type Palette = typeof light;

export type PaletteVariant = keyof typeof palette;

export default palette;
