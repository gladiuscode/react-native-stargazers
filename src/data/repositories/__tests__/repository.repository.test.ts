import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import RepositoryRepositoryImpl from '../repository.repository';
import {IRemoteDatasource} from '../../sources/remote.datasource';
import GetRepositoryResponse from '../../sources/responses/getRepository.response';
import RepositoryEntity from '../../../domain/entities/repository.entity';
import GetRepositoryStargazersResponse from '../../sources/responses/getRepositoryStargazers.response';
import StargazerEntity from '../../../domain/entities/stargazer.entity';

const mockedRepositoryEntity = new RepositoryEntity(1, 'test');
const mockedStargazerEntity = new StargazerEntity(1, 'test_url', 'test');

const mockedGetRepositoryMethod = jest.fn(
  (_: string, __: string): Promise<GetRepositoryResponse> => {
    return Promise.resolve({
      stargazers_url: mockedRepositoryEntity.stargazers_url,
    } as GetRepositoryResponse);
  },
);

const mockedGetRepositoryStargazersMethod = jest.fn(
  (
    _: string,
    __: number,
    ___: number,
  ): Promise<GetRepositoryStargazersResponse[]> => {
    return Promise.resolve([
      {
        id: mockedStargazerEntity.id,
        login: mockedStargazerEntity.name,
        avatar_url: mockedStargazerEntity.avatarUrl,
      },
    ] as GetRepositoryStargazersResponse[]);
  },
);

const mockedRemoteDatasource: IRemoteDatasource = {
  getRepository: mockedGetRepositoryMethod,
  getRepositoryStargazers: mockedGetRepositoryStargazersMethod,
};
const repositoryRepository = new RepositoryRepositoryImpl(
  mockedRemoteDatasource,
);

beforeEach(() => {
  mockedGetRepositoryMethod.mockClear();
  mockedGetRepositoryStargazersMethod.mockClear();
});

describe('repositoryRepository.getRepository method', () => {
  it('should have getRepository method', () => {
    const expectedResult = 'getRepository';

    expect(repositoryRepository).toHaveProperty(expectedResult);
  });

  it('should have getRepository method that calls remoteDatasource.getRepository once', async () => {
    const expectedResult = 1;

    await repositoryRepository.getRepository('test', 'test');

    expect(mockedGetRepositoryMethod.mock.calls.length).toBe(expectedResult);
  });

  it('should have getRepository method that calls remoteDatasource.getRepository once with provided arguments', async () => {
    const firstInput = 'test1';
    const lastInput = 'test2';
    const expectedResult = [firstInput, lastInput];

    await repositoryRepository.getRepository(firstInput, lastInput);

    expect(mockedGetRepositoryMethod.mock.calls.at(0)?.at(0)).toBe(
      expectedResult.at(0),
    );
    expect(mockedGetRepositoryMethod.mock.calls.at(0)?.at(1)).toBe(
      expectedResult.at(1),
    );
  });

  it('should have getRepository method that calls remoteDatasource.getRepository once with provided arguments and returns a RepositoryEntity', async () => {
    const expectedResult = new RepositoryEntity(
      mockedRepositoryEntity.stargazers_count,
      mockedRepositoryEntity.stargazers_url,
    );

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

    expect(mockedGetRepositoryStargazersMethod.mock.calls.length).toBe(
      expectedResult,
    );
  });

  it('should have getRepositoryStargazers method that calls remoteDatasource.getRepositoryStargazers once with provided arguments', async () => {
    const firstInput = 'test1';
    const secondInput = 1;
    const thirdInput = 20;
    const expectedResult = [firstInput, secondInput, thirdInput];

    await repositoryRepository.getRepositoryStargazers(firstInput);

    expect(mockedGetRepositoryStargazersMethod.mock.calls.at(0)).toStrictEqual(
      expectedResult,
    );
  });

  it('should have getRepositoryStargazers method that calls remoteDatasource.getRepositoryStargazers once with provided arguments and returns an array with StargazerEntity elements type', async () => {
    const expectedResult = [
      new StargazerEntity(
        mockedStargazerEntity.id,
        mockedStargazerEntity.avatarUrl,
        mockedStargazerEntity.name,
      ),
    ];

    const result = await repositoryRepository.getRepositoryStargazers('');

    expect(result).toStrictEqual(expectedResult);
  });
});
