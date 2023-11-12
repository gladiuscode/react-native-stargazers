import {IRemoteDatasource} from '../sources/remote.datasource';
import RepositoryEntity from '../../domain/entities/repository.entity';
import StargazerEntity from '../../domain/entities/stargazer.entity';
import configEnv from '../../../envs/config.env';

export interface IRepositoryRepository {
  getRepository(owner: string, repository: string): Promise<RepositoryEntity>;
  getRepositoryStargazers(
    repositoryUrl: string,
    page?: number,
    pageSize?: number,
  ): Promise<StargazerEntity[]>;
}

class RepositoryRepositoryImpl implements IRepositoryRepository {
  constructor(private _remoteDatasource: IRemoteDatasource) {}

  async getRepository(
    owner: string,
    repository: string,
  ): Promise<RepositoryEntity> {
    const data = await this._remoteDatasource.getRepository(owner, repository);
    return new RepositoryEntity(data.stargazers_count, data.stargazers_url);
  }

  async getRepositoryStargazers(
    repositoryUrl: string,
    page = 1,
    perPage = 20,
  ): Promise<StargazerEntity[]> {
    const data = await this._remoteDatasource.getRepositoryStargazers(
      repositoryUrl.replace(configEnv.API_BASE_URL!, ''),
      page,
      perPage,
    );
    return data.map(item => new StargazerEntity(item.avatar_url, item.login));
  }
}

export default RepositoryRepositoryImpl;
