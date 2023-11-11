import {beforeEach, expect, it, jest} from '@jest/globals';
import RepositoryRepositoryImpl from '../repository.repository';
import {IRemoteDatasource} from '../../sources/remote.datasource';
import GetRepositoryResponse from '../../sources/responses/getRepository.response';
import RepositoryEntity from '../../../domain/entities/repository.entity';

const mockedRepositoryEntity = new RepositoryEntity('test');

const mockedGetRepositoryMethod = jest.fn(
  (_: string, __: string): Promise<GetRepositoryResponse> => {
    return Promise.resolve({
      stargazers_url: mockedRepositoryEntity.stargazers_url,
    } as GetRepositoryResponse);
  },
);
const mockedRemoteDatasource: IRemoteDatasource = {
  getRepository: mockedGetRepositoryMethod,
};
const repositoryRepository = new RepositoryRepositoryImpl(
  mockedRemoteDatasource,
);

beforeEach(() => {
  mockedGetRepositoryMethod.mockClear();
});

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
    mockedRepositoryEntity.stargazers_url,
  );

  const result = await repositoryRepository.getRepository('', '');

  expect(result).toBeInstanceOf(RepositoryEntity);
  expect(result.stargazers_url).toBe(expectedResult.stargazers_url);
});
