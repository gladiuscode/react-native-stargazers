import {it, expect} from '@jest/globals';
import contextFactory from '../contextFactory/contextFactory.util';

it('should return an array with two elements', () => {
  const input = 'ContextName';
  const expectedResult = 2;

  const result = contextFactory(input);

  expect(result.length).toBe(expectedResult);
});

it('should return an array with a function first', () => {
  const input = 'ContextName';
  const expectedResult = 'function';

  const result = contextFactory(input);
  const typeOfFirstElementInResult = typeof result.at(0);

  expect(typeOfFirstElementInResult).toBe(expectedResult);
});

it('should return an array with an object last', () => {
  const input = 'ContextName';
  const expectedResult = 'object';

  const result = contextFactory(input);
  const typeOfFirstElementInResult = typeof result.at(1);

  expect(typeOfFirstElementInResult).toBe(expectedResult);
});
