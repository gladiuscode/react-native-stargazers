import {Palette} from './palette.theme';
import {TextStyle} from 'react-native';

const fontFamily = {};

const typographyStyle = {
  h1: {
    fontSize: 32,
  } as TextStyle,
  h2: {
    fontSize: 24,
  } as TextStyle,
  body: {
    fontSize: 16,
  } as TextStyle,
  caption: {
    fontSize: 12,
  },
};

/**
 * This function takes care of initializing typography common styles.
 * It injects the current default palette's text property as the
 * color property value of each typography style.
 * This should take care of properly handle a common color and
 * avoid theming issues related to dark system variant.
 * @param palette
 */
const getTypographyBy = (palette: Palette) => {
  const keys = Object.keys(typographyStyle) as Array<
    keyof typeof typographyStyle
  >;

  const styles = keys.reduce((acc, key) => {
    const updatedTypography = {
      ...typographyStyle[key],
      color: palette.text,
    };
    return {
      ...acc,
      [key]: updatedTypography,
    };
  }, typographyStyle);

  return {
    family: fontFamily,
    styles,
  };
};

export type Typography = ReturnType<typeof getTypographyBy>;

export default getTypographyBy;
