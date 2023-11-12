import {IClientApi} from '../api/client.api';
import GetRepositoryResponse from './responses/getRepository.response';
import GetRepositoryStargazersResponse from './responses/getRepositoryStargazers.response';

export interface IRemoteDatasource {
  /////////////////////////////////
  //          REPOSITORY
  ////////////////////////////////
  getRepository(
    owner: string,
    repository: string,
  ): Promise<GetRepositoryResponse>;

  getRepositoryStargazers(
    repositoryURL: string,
  ): Promise<GetRepositoryStargazersResponse[]>;
}

class RemoteDatasourceImpl implements IRemoteDatasource {
  constructor(private _apiClient: IClientApi) {}

  async getRepository(
    owner: string,
    repository: string,
  ): Promise<GetRepositoryResponse> {
    return await this._apiClient.get(`/repos/${owner}/${repository}`);
  }

  async getRepositoryStargazers(
    url: string,
  ): Promise<GetRepositoryStargazersResponse[]> {
    return await this._apiClient.get(url);
  }
}

export default RemoteDatasourceImpl;
