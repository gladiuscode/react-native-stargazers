import {it, expect} from '@jest/globals';
import getTypographyBy from '../typography.theme';
import {Palette} from '../palette.theme';

const palette = {
  background: '#ffffff',
  text: '#000000',
} as Palette;

it('should return an object that has a family property', () => {
  const expectedResult = 'family';

  const result = getTypographyBy(palette);

  expect(result).toHaveProperty(expectedResult);
});

it('should return an object that has a styles property', () => {
  const expectedResult = 'styles';

  const result = getTypographyBy(palette);

  expect(result).toHaveProperty(expectedResult);
});

it('should return an object that has a styles property with body inner property', () => {
  const expectedResult = 'styles.body';

  const result = getTypographyBy(palette);

  expect(result).toHaveProperty(expectedResult);
});

it('should return an object that has a styles property with body inner property and color set to palette.text', () => {
  const expectedResult = palette.text;

  const result = getTypographyBy(palette);

  expect(result.styles.body.color).toBe(expectedResult);
});
