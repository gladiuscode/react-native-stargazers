import {it, expect, jest, beforeEach} from '@jest/globals';
import React, {ComponentType, PropsWithChildren} from 'react';
import {renderHook} from '@testing-library/react-native';
import {Mock, UnknownFunction} from 'jest-mock';
import useStyles from '../useStyles.hook';
import ThemeContainer from '../theme.container';

let getStyles: Mock<UnknownFunction>;

beforeEach(() => {
  getStyles = jest.fn(args => args);
});

const wrapper: ComponentType<PropsWithChildren> = ({children}) => (
  <ThemeContainer>{children}</ThemeContainer>
);

it('should call the callback passed as argument', () => {
  renderHook(() => useStyles(getStyles), {wrapper});

  expect(getStyles).toBeCalled();
});

it('should return an object with a palette property', () => {
  const expectedResult = 'palette';

  const {result} = renderHook(() => useStyles(getStyles), {wrapper});

  expect(result.current).toHaveProperty(expectedResult);
});

it('should return an object with a spacing property', () => {
  const expectedResult = 'spacing';

  const {result} = renderHook(() => useStyles(getStyles), {wrapper});

  expect(result.current).toHaveProperty(expectedResult);
});

it('should return an object with a borderRadius property', () => {
  const expectedResult = 'borderRadius';

  const {result} = renderHook(() => useStyles(getStyles), {wrapper});

  expect(result.current).toHaveProperty(expectedResult);
});

it('should return an object with a typography property', () => {
  const expectedResult = 'typography';

  const {result} = renderHook(() => useStyles(getStyles), {wrapper});

  expect(result.current).toHaveProperty(expectedResult);
});
