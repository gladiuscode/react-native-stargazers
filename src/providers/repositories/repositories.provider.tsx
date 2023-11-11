import React, {PropsWithChildren, useMemo, useRef} from 'react';
import contextFactory from '../../utils/contextFactory/contextFactory.util';
import RepositoryRepositoryImpl, {
  IRepositoryRepository,
} from '../../data/repositories/repository.repository';
import RemoteDatasourceImpl from '../../data/sources/remote.datasource';
import ClientApi from '../../data/api/client.api';
import configEnv from '../../../envs/config.env';

export interface RepositoriesContext {
  repository: IRepositoryRepository;
}

const [useRepositories, Provider] = contextFactory<RepositoriesContext>(
  'RepositoriesContext',
);
export {useRepositories};

const RepositoriesProvider: React.FC<PropsWithChildren> = ({children}) => {
  const clientApi = useRef(new ClientApi(configEnv.API_BASE_URL!));
  const remoteDatasource = useRef(new RemoteDatasourceImpl(clientApi.current));
  const repository = useRef(
    new RepositoryRepositoryImpl(remoteDatasource.current),
  );

  const value = useMemo<RepositoriesContext>(
    () => ({
      repository: repository.current,
    }),
    [],
  );

  return <Provider value={value}>{children}</Provider>;
};

export default RepositoriesProvider;
