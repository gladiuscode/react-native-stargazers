import {useCallback, useEffect, useRef, useState} from 'react';
import {useRepositories} from '../../providers/repositories/repositories.provider';
import StargazerEntity from '../../../domain/entities/stargazer.entity';
import {useBanner} from '../../providers/banner/banner.provider';

export const STARGAZERS_PER_PAGE = 50;

const useGetRepositoryStargazerApi = (repositoryUrl: string) => {
  const {showBanner} = useBanner();
  const repositoryRepository = useRepositories().repository;
  const [data, setData] = useState<StargazerEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const isInitialFetchDone = useRef<boolean>(false);

  const enabled = !!repositoryUrl;
  const currentPage = Math.ceil(data.length / STARGAZERS_PER_PAGE);

  const handleError = useCallback(
    (message: string) => {
      if (isInitialFetchDone) {
        showBanner(message);
        return;
      }

      setError(message);
    },
    [showBanner],
  );

  const getStargazers = useCallback(
    async (url: string, page = 1) => {
      setError(undefined);

      try {
        setLoading(true);
        const nextStargazers =
          await repositoryRepository.getRepositoryStargazers(
            url,
            page,
            STARGAZERS_PER_PAGE,
          );

        setData(prevData => [...prevData, ...nextStargazers]);
        if (!isInitialFetchDone.current) {
          isInitialFetchDone.current = !!nextStargazers.length;
        }
      } catch (e) {
        handleError('Stargazers not found. Something went wrong.');
      } finally {
        setLoading(false);
      }
    },
    [handleError, repositoryRepository],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    getStargazers(repositoryUrl).then();
  }, [enabled, getStargazers, repositoryUrl]);

  const fetchNextPage = useCallback(() => {
    if (loading) {
      return;
    }

    if (!enabled) {
      return;
    }

    if (!data || !data.length) {
      return;
    }

    getStargazers(repositoryUrl, currentPage + 1).then();
  }, [currentPage, data, enabled, getStargazers, loading, repositoryUrl]);

  const retry = useCallback(async () => {
    await getStargazers(repositoryUrl, currentPage);
  }, [currentPage, getStargazers, repositoryUrl]);

  return {
    data,
    loading,
    error,
    fetchNextPage,
    retry,
  };
};

export default useGetRepositoryStargazerApi;
