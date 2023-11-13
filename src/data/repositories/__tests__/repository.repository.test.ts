import {beforeEach, describe, expect, it} from '@jest/globals';
import RepositoryRepositoryImpl from '../repository.repository';
import RepositoryEntity from '../../../domain/entities/repository.entity';
import StargazerEntity from '../../../domain/entities/stargazer.entity';
import RemoteDatasourceMock from '../../../../__mocks__/remote.datasource';

const remoteDatasourceMock = new RemoteDatasourceMock();
const repositoryRepository = new RepositoryRepositoryImpl(remoteDatasourceMock);

beforeEach(() => {
  remoteDatasourceMock.getRepository.mockClear();
  remoteDatasourceMock.getRepositoryStargazers.mockClear();
});

describe('repositoryRepository.getRepository method', () => {
  it('should have getRepository method', () => {
    const expectedResult = 'getRepository';

    expect(repositoryRepository).toHaveProperty(expectedResult);
  });

  it('should have getRepository method that calls remoteDatasource.getRepository once', async () => {
    const expectedResult = 1;

    await repositoryRepository.getRepository('test', 'test');

    expect(remoteDatasourceMock.getRepository.mock.calls.length).toBe(
      expectedResult,
    );
  });

  it('should have getRepository method that calls remoteDatasource.getRepository once with provided arguments', async () => {
    const firstInput = 'test1';
    const lastInput = 'test2';
    const expectedResult = [firstInput, lastInput];

    await repositoryRepository.getRepository(firstInput, lastInput);

    expect(remoteDatasourceMock.getRepository.mock.calls.at(0)).toStrictEqual(
      expectedResult,
    );
  });

  it('should have getRepository method that calls remoteDatasource.getRepository once with provided arguments and returns a RepositoryEntity', async () => {
    const expectedResult = new RepositoryEntity(1, 'test');

    remoteDatasourceMock.setGetRepositoryResponse({
      stargazers_url: expectedResult.stargazers_url,
    });

    const result = await repositoryRepository.getRepository('', '');

    expect(result).toBeInstanceOf(RepositoryEntity);
    expect(result.stargazers_url).toBe(expectedResult.stargazers_url);
  });
});

describe('repositoryRepository.getRepositoryStargazers method', () => {
  it('should have getRepositoryStargazers method', () => {
    const expectedResult = 'getRepositoryStargazers';

    expect(repositoryRepository).toHaveProperty(expectedResult);
  });

  it('should have getRepositoryStargazers method that calls remoteDatasource.getRepositoryStargazers once', async () => {
    const expectedResult = 1;

    await repositoryRepository.getRepositoryStargazers('test');

    expect(remoteDatasourceMock.getRepositoryStargazers.mock.calls.length).toBe(
      expectedResult,
    );
  });

  it('should have getRepositoryStargazers method that calls remoteDatasource.getRepositoryStargazers once with provided arguments', async () => {
    const firstInput = 'test1';
    const secondInput = 1;
    const thirdInput = 20;
    const expectedResult = [firstInput, secondInput, thirdInput];

    await repositoryRepository.getRepositoryStargazers(firstInput);

    expect(
      remoteDatasourceMock.getRepositoryStargazers.mock.calls.at(0),
    ).toStrictEqual(expectedResult);
  });

  it('should have getRepositoryStargazers method that calls remoteDatasource.getRepositoryStargazers once with provided arguments and returns an array with StargazerEntity elements type', async () => {
    const expectedResult = [
      new StargazerEntity(1, 'avatarTest', 'test', 'homepageTest'),
    ];

    remoteDatasourceMock.setGetRepositoryStargazersResponse([
      {
        id: 1,
        avatar_url: 'avatarTest',
        login: 'test',
        html_url: 'homepageTest',
      },
    ]);

    const result = await repositoryRepository.getRepositoryStargazers('');

    expect(result).toStrictEqual(expectedResult);
  });
});
