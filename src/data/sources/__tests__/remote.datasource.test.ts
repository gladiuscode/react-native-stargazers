import {beforeEach, describe, expect, it} from '@jest/globals';
import RemoteDatasourceImpl from '../remote.datasource';
import ClientApiMock from '../../../../__mocks__/client.api';
import {IClientApi} from 'data/api/client.api';

const clientApiMock = new ClientApiMock('test');
const remoteDatasource = new RemoteDatasourceImpl(clientApiMock as IClientApi);

beforeEach(() => {
  clientApiMock.get.mockClear();
});

describe('remoteDatasource.getRepository method', () => {
  it('should have getRepository method', () => {
    const expectedResult = 'getRepository';

    expect(remoteDatasource).toHaveProperty(expectedResult);
  });

  it('should have getRepository method that calls apiClient.get once', async () => {
    const expectedResult = 1;

    await remoteDatasource.getRepository('test', 'test');

    expect(clientApiMock.get.mock.calls.length).toBe(expectedResult);
  });
});

describe('remoteDatasource.getRepositoryStargazers method', () => {
  it('should have getRepositoryStargazers method', () => {
    const expectedResult = 'getRepositoryStargazers';

    expect(remoteDatasource).toHaveProperty(expectedResult);
  });

  it('should have getRepositoryStargazers method that calls apiClient.get once', async () => {
    const expectedResult = 1;

    await remoteDatasource.getRepositoryStargazers('test');

    expect(clientApiMock.get.mock.calls.length).toBe(expectedResult);
  });
});
