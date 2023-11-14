import React, {PropsWithChildren} from 'react';
import {beforeEach, expect, it, jest} from '@jest/globals';
import AppMock from '../../../../../../__mocks__/app';
import {act, renderHook} from '@testing-library/react-native';
import useHomepageFormFacade from './useForm.homepage.facade';

let appMock: AppMock;
let wrapper: React.ComponentType<PropsWithChildren>;

beforeEach(() => {
  appMock = new AppMock();
  wrapper = appMock.render.bind(appMock);
});

it('should store owner input value into form.owner property', function () {
  const input = 'facebook';
  const expectedResult = input;

  const {result} = renderHook(() => useHomepageFormFacade(console.log), {
    wrapper,
  });

  act(() => result.current.onChangeText('owner', input));

  expect(result.current.form.owner).toBe(expectedResult);
});

it('should store repository input value into form.repository property', function () {
  const input = 'react-native';
  const expectedResult = input;

  const {result} = renderHook(() => useHomepageFormFacade(console.log), {
    wrapper,
  });

  act(() => result.current.onChangeText('repository', input));

  expect(result.current.form.repository).toBe(expectedResult);
});

it('should return a proper validation error if user tries to search without owner input', function () {
  const expectedResult = 'string';

  const {result} = renderHook(() => useHomepageFormFacade(console.log), {
    wrapper,
  });

  act(() => result.current.onSearchPress());

  expect(typeof result.current.getErrorMessageOf('owner')).toBe(expectedResult);
});

it('should not return a proper validation error if user tries to search with owner input', function () {
  const expectedResult = 'undefined';

  const {result} = renderHook(() => useHomepageFormFacade(console.log), {
    wrapper,
  });

  act(() => result.current.onChangeText('owner', 'facebook'));
  act(() => result.current.onSearchPress());

  expect(typeof result.current.getErrorMessageOf('owner')).toBe(expectedResult);
});

it('should return a proper validation error if user tries to search without repository input', function () {
  const expectedResult = 'string';

  const {result} = renderHook(() => useHomepageFormFacade(console.log), {
    wrapper,
  });

  act(() => result.current.onSearchPress());

  expect(typeof result.current.getErrorMessageOf('repository')).toBe(
    expectedResult,
  );
});

it('should not return a proper validation error if user tries to search with repository input', function () {
  const expectedResult = 'undefined';

  const {result} = renderHook(() => useHomepageFormFacade(console.log), {
    wrapper,
  });

  act(() => result.current.onChangeText('repository', 'react-native'));
  act(() => result.current.onSearchPress());

  expect(typeof result.current.getErrorMessageOf('repository')).toBe(
    expectedResult,
  );
});

it('should call onSubmit callback if form is valid and user searches a repository', function () {
  const input = jest.fn();
  const expectedResult = 1;

  const {result} = renderHook(() => useHomepageFormFacade(input), {
    wrapper,
  });

  act(() => result.current.onChangeText('owner', 'facebook'));
  act(() => result.current.onChangeText('repository', 'react-native'));
  act(() => result.current.onSearchPress());

  expect(input.mock.calls).toHaveLength(expectedResult);
});
