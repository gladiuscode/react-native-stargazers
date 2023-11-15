import {useCallback, useEffect, useRef, useState} from 'react';
import RepositoryEntity from '../../../domain/entities/repository.entity';
import {useRepositories} from '../../providers/repositories/repositories.container';
import {useBanner} from '../../providers/banner/banner.container';
import {useLocalization} from '../../providers/localization/localization.container';

interface UseGetRepositoryApiParams {
  owner?: string;
  repository?: string;
}

const useGetRepositoryApi = ({
  owner,
  repository,
}: UseGetRepositoryApiParams) => {
  const {t} = useLocalization();
  const {showBanner} = useBanner();
  const repositoryRepository = useRepositories().repository;
  const [data, setData] = useState<RepositoryEntity>();
  const isInitialFetchDone = useRef<boolean>(false);
  const [error, setError] = useState<string>();

  const enabled = owner && repository;

  const handleError = useCallback(
    (message: string) => {
      if (isInitialFetchDone.current) {
        showBanner(message);
        return;
      }

      setError(message);
    },
    [showBanner],
  );

  const getRepository = useCallback(async () => {
    setError(undefined);

    try {
      setData(await repositoryRepository.getRepository(owner!, repository!));
      if (!isInitialFetchDone.current) {
        isInitialFetchDone.current = true;
      }
    } catch (e) {
      handleError(t('no_repository_found'));
    }
  }, [handleError, owner, repository, repositoryRepository, t]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    getRepository().then();
  }, [enabled, getRepository]);

  return {data, loading: !data && !error && enabled, error};
};

export default useGetRepositoryApi;
