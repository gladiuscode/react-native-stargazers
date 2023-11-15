import React, {PropsWithChildren} from 'react';
import {beforeEach, expect, it, jest} from '@jest/globals';
import AppMock from '../../../../../../__mocks__/app';
import {render, userEvent} from '@testing-library/react-native';
import HomepageForm from './form.homepage';

let appMock: AppMock;
let wrapper: React.ComponentType<PropsWithChildren>;

beforeEach(() => {
  appMock = new AppMock();
  wrapper = appMock.render.bind(appMock);
  jest.useFakeTimers();
});

it('should render owner input field and handle user input', async () => {
  const user = userEvent.setup();

  const input = 'test';
  const expectedResult = input;

  const {getByPlaceholderText} = render(
    <HomepageForm onSubmit={console.log} />,
    {
      wrapper,
    },
  );

  const ownerInput = getByPlaceholderText('Owner*');

  await user.type(ownerInput, input);

  expect(ownerInput.props.value).toBe(expectedResult);
});

it('should render repository input field and handle user input', async () => {
  const user = userEvent.setup();

  const input = 'test';
  const expectedResult = input;

  const {getByPlaceholderText} = render(
    <HomepageForm onSubmit={console.log} />,
    {
      wrapper,
    },
  );

  const repositoryInput = getByPlaceholderText('Repository*');

  await user.type(repositoryInput, input);

  expect(repositoryInput.props.value).toBe(expectedResult);
});

it('should render search button and display errors under inputs if invalid inputs are provided', async () => {
  const user = userEvent.setup();

  const {getByTestId, getByText} = render(
    <HomepageForm onSubmit={console.log} />,
    {
      wrapper,
    },
  );

  const searchButton = getByTestId('search-button');

  await user.press(searchButton);

  getByText('Owner is mandatory');
  getByText('Repository is mandatory');
});

it('should render search button and call onSubmit if valid inputs are provided', async () => {
  const user = userEvent.setup();

  const input = 'text';
  const expectedResult = 1;
  const onSubmitMock = jest.fn();

  const {getByPlaceholderText, getByTestId} = render(
    <HomepageForm onSubmit={onSubmitMock} />,
    {
      wrapper,
    },
  );

  const ownerInput = getByPlaceholderText('Owner*');
  const repositoryInput = getByPlaceholderText('Repository*');
  const searchButton = getByTestId('search-button');

  await user.type(ownerInput, input);
  await user.type(repositoryInput, input);
  await user.press(searchButton);

  expect(onSubmitMock.mock.calls.length).toBe(expectedResult);
});
