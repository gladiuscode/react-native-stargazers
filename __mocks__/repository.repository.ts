import {IRepositoryRepository} from '../src/data/repositories/repository.repository';
import RepositoryEntity from '../src/domain/entities/repository.entity';
import StargazerEntity from '../src/domain/entities/stargazer.entity';
import {jest} from '@jest/globals';

class RepositoryRepositoryMock implements IRepositoryRepository {
  private getRepositoryResponse: RepositoryEntity;
  private getRepositoryStargazersResponse: StargazerEntity[];
  private shouldThrow: boolean;

  constructor() {
    this.getRepositoryResponse = new RepositoryEntity(1, 'test');
    this.getRepositoryStargazersResponse = [
      new StargazerEntity(1, 'avatar_test', 'test', 'test'),
    ];
    this.shouldThrow = false;
  }

  getRepository = jest.fn(
    (_: string, __: string): Promise<RepositoryEntity> => {
      if (this.shouldThrow) {
        return Promise.reject(new Error('TEST'));
      }
      return Promise.resolve(this.getRepositoryResponse);
    },
  );

  getRepositoryStargazers = jest.fn(
    (_: string, __?: number, ___?: number): Promise<StargazerEntity[]> => {
      if (this.shouldThrow) {
        return Promise.reject(new Error('TEST'));
      }
      return Promise.resolve(this.getRepositoryStargazersResponse);
    },
  );

  // ** TESTS HELPERS ** //
  setShouldThrow(value: boolean) {
    this.shouldThrow = value;
  }

  setGetRepositoryResponse(response: RepositoryEntity) {
    this.getRepositoryResponse = response;
  }

  setGetRepositoryStargazersResponse(response: StargazerEntity[]) {
    this.getRepositoryStargazersResponse = response;
  }
}

export default RepositoryRepositoryMock;
