import {IRemoteDatasource} from '../sources/remote.datasource';

interface IRepositoryRepository {
  getRepository(owner: string, repository: string): Promise<any>;
}

class RepositoryRepositoryImpl implements IRepositoryRepository {
  constructor(private _remoteDatasource: IRemoteDatasource) {}

  async getRepository(owner: string, repository: string): Promise<any> {
    return await this._remoteDatasource.getRepository(owner, repository);
  }
}

export default RepositoryRepositoryImpl;
