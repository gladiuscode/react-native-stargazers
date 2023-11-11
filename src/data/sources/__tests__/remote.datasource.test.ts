import {beforeEach, expect, it, jest} from '@jest/globals';
import RemoteDatasourceImpl from '../remote.datasource';
import {ClientApiCallConfig, IClientApi} from '../../api/client.api';

const mockedResponse = {test: 'test'};
const mockedGetMethod = jest.fn(
  async <T>(_: string, __?: ClientApiCallConfig) => {
    return Promise.resolve<T>(mockedResponse as T);
  },
);
const mockedApiClient: IClientApi = {
  get: mockedGetMethod as IClientApi['get'],
};
const remoteDatasource = new RemoteDatasourceImpl(mockedApiClient);

beforeEach(() => {
  mockedGetMethod.mockClear();
});

it('should have getRepository method', () => {
  const expectedResult = 'getRepository';

  expect(remoteDatasource).toHaveProperty(expectedResult);
});

it('should have getRepository method that calls apiClient.get once', async () => {
  const expectedResult = 1;

  await remoteDatasource.getRepository('test', 'test');

  expect(mockedGetMethod.mock.calls.length).toBe(expectedResult);
});
