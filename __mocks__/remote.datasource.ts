import {IRemoteDatasource} from '../src/data/sources/remote.datasource';
import GetRepositoryResponse from '../src/data/sources/responses/getRepository.response';
import GetRepositoryStargazersResponse from '../src/data/sources/responses/getRepositoryStargazers.response';
import {jest} from '@jest/globals';

class RemoteDatasourceMock implements IRemoteDatasource {
  private getRepositoryResponse: GetRepositoryResponse;
  private getRepositoryStargazersResponse: GetRepositoryStargazersResponse[];

  constructor() {
    this.getRepositoryResponse = {
      test: 'test',
    } as unknown as GetRepositoryResponse;
    this.getRepositoryStargazersResponse = [
      {test: 'test'},
    ] as unknown as GetRepositoryStargazersResponse[];
  }

  getRepository = jest.fn(
    (_: string, __: string): Promise<GetRepositoryResponse> => {
      return Promise.resolve(this.getRepositoryResponse);
    },
  );

  getRepositoryStargazers = jest.fn(
    (
      _: string,
      __: number,
      ___: number,
    ): Promise<GetRepositoryStargazersResponse[]> => {
      return Promise.resolve(this.getRepositoryStargazersResponse);
    },
  );

  // ** TEST HELPERS ** //
  setGetRepositoryResponse(response: Partial<GetRepositoryResponse>) {
    this.getRepositoryResponse = response as GetRepositoryResponse;
  }

  setGetRepositoryStargazersResponse(
    response: Array<Partial<GetRepositoryStargazersResponse>>,
  ) {
    this.getRepositoryStargazersResponse =
      response as GetRepositoryStargazersResponse[];
  }
}

export default RemoteDatasourceMock;
