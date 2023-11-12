import {useCallback, useEffect, useState} from 'react';
import RepositoryEntity from '../../../domain/entities/repository.entity';
import {useRepositories} from '../../providers/repositories/repositories.provider';

interface UseGetRepositoryApiParams {
  owner?: string;
  repository?: string;
}

const useGetRepositoryApi = ({
  owner,
  repository,
}: UseGetRepositoryApiParams) => {
  const repositoryRepository = useRepositories().repository;
  const [data, setData] = useState<RepositoryEntity>();
  const [error, setError] = useState<string>();

  const enabled = owner && repository;

  const getRepository = useCallback(async () => {
    try {
      setData(await repositoryRepository.getRepository(owner!, repository!));
    } catch (e) {
      if (e instanceof Error) {
        setError(
          'Repository not found. Are you sure that both owner and repository exist?',
        );
        return;
      }
      setError('Something went wrong');
    }
  }, [owner, repository, repositoryRepository]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    getRepository().then();
  }, [enabled, getRepository]);

  return {data, loading: !data && !error && enabled, error};
};

export default useGetRepositoryApi;
