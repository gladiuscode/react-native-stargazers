import {beforeEach, expect, it, jest} from '@jest/globals';
import ClientApi, {ClientApiCallConfig} from '../client.api';

const mockBrokenURL = 'brokenURL';

const mockFetch = jest.fn((firstArg: unknown) => {
  if (firstArg === mockBrokenURL) {
    return Promise.resolve<Response>({
      status: 404,
      statusText: 'Error',
      ok: false,
    } as Response);
  }

  return Promise.resolve<Response>({
    ok: true,
    status: 200,
    statusText: 'Success',
    json(): Promise<any> {
      return Promise.resolve({
        test: 'test',
      });
    },
  } as Response);
});

global.fetch = mockFetch;

const clientApi = new ClientApi('');

beforeEach(() => {
  mockFetch.mockClear();
});

it('should call fetch once', async () => {
  const input = '';
  const expectedResult = 1;

  await clientApi.get(input);

  return expect(mockFetch.mock.calls).toHaveLength(expectedResult);
});

it('should call fetch once with provided url', async () => {
  const input = '/test';
  const expectedResult = input;

  await clientApi.get(input);

  return expect(mockFetch.mock.calls[0].at(0)).toBe(expectedResult);
});

it('should call fetch once with provided config', async () => {
  const input: ClientApiCallConfig = {
    method: 'get',
  };
  const expectedResult = input;

  await clientApi.get('', input);

  return expect(mockFetch.mock.calls[0].at(1)).toBe(expectedResult);
});

it('should call fetch once and throw error when provided with broken url', async () => {
  const input = mockBrokenURL;
  const expectedResult = Error;

  const resultFn = async () => {
    await clientApi.get(input);
  };

  return expect(resultFn).rejects.toBeInstanceOf(expectedResult);
});
