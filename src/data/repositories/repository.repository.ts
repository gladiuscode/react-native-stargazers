import {IRemoteDatasource} from '../sources/remote.datasource';
import RepositoryEntity from '../../domain/entities/repository.entity';

interface IRepositoryRepository {
  getRepository(owner: string, repository: string): Promise<RepositoryEntity>;
}

class RepositoryRepositoryImpl implements IRepositoryRepository {
  constructor(private _remoteDatasource: IRemoteDatasource) {}

  async getRepository(
    owner: string,
    repository: string,
  ): Promise<RepositoryEntity> {
    const data = await this._remoteDatasource.getRepository(owner, repository);
    return new RepositoryEntity(data.stargazers_url);
  }
}

export default RepositoryRepositoryImpl;
