import {useCallback, useEffect, useState} from 'react';
import {useRepositories} from '../../providers/repositories/repositories.provider';
import StargazerEntity from '../../../domain/entities/stargazer.entity';

export const STARGAZERS_PER_PAGE = 50;

const useGetRepositoryStargazerApi = (repositoryUrl: string) => {
  const repositoryRepository = useRepositories().repository;
  const [data, setData] = useState<StargazerEntity[]>([]);
  const [error, setError] = useState<string>();

  const enabled = !!repositoryUrl;

  const getStargazers = useCallback(
    async (url: string, page = 1) => {
      console.log('[useGetRepositoryApi] - getStargazers', page);

      try {
        const nextStargazers =
          await repositoryRepository.getRepositoryStargazers(
            url,
            page,
            STARGAZERS_PER_PAGE,
          );

        setData(prevData => [...prevData, ...nextStargazers]);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        setError('Something went wrong');
      }
    },
    [repositoryRepository],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    getStargazers(repositoryUrl).then();
  }, [enabled, getStargazers, repositoryUrl]);

  const fetchNextPage = useCallback(() => {
    if (!enabled) {
      return;
    }

    if (!data || !data.length) {
      return;
    }

    const currentPage = data.length / STARGAZERS_PER_PAGE;

    getStargazers(repositoryUrl, currentPage + 1).then();
  }, [data, enabled, getStargazers, repositoryUrl]);

  return {
    data,
    loading: !data && !error && enabled,
    error,
    fetchNextPage,
  };
};

export default useGetRepositoryStargazerApi;
