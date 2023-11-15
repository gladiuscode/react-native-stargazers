import {expect, it} from '@jest/globals';
import {act, renderHook} from '@testing-library/react-native';
import LocalizationContainer, {
  useLocalization,
} from '../localization.container';
import React, {PropsWithChildren} from 'react';

const wrapper: React.ComponentType<PropsWithChildren> = ({children}) => (
  <LocalizationContainer>{children}</LocalizationContainer>
);

it('should change language to it', () => {
  const input = 'it';
  const expectedResult = input;

  const {result} = renderHook(() => useLocalization(), {wrapper});

  act(() => {
    result.current.onLanguageChange(input);
  });

  expect(result.current.language).toBe(expectedResult);
});
