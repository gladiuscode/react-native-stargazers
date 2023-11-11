import {IClientApi} from '../api/client.api';
import GetRepositoryResponse from './responses/getRepository.response';

export interface IRemoteDatasource {
  /////////////////////////////////
  //          REPOSITORY
  ////////////////////////////////
  getRepository(
    owner: string,
    repository: string,
  ): Promise<GetRepositoryResponse>;
}

class RemoteDatasourceImpl implements IRemoteDatasource {
  constructor(private _apiClient: IClientApi) {}

  async getRepository(
    owner: string,
    repository: string,
  ): Promise<GetRepositoryResponse> {
    return await this._apiClient.get(`/repos/${owner}/${repository}`);
  }
}

export default RemoteDatasourceImpl;
