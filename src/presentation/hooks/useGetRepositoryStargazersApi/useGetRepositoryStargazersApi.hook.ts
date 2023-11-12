import {useCallback, useEffect, useState} from 'react';
import {useRepositories} from '../../providers/repositories/repositories.provider';
import StargazerEntity from '../../../domain/entities/stargazer.entity';

export const STARGAZERS_PER_PAGE = 50;

const useGetRepositoryStargazerApi = (repositoryUrl: string) => {
  const repositoryRepository = useRepositories().repository;
  const [data, setData] = useState<StargazerEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const enabled = !!repositoryUrl;
  const currentPage = Math.ceil(data.length / STARGAZERS_PER_PAGE);

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
      } catch (e) {
        if (e instanceof Error) {
          setError('Stargazers not found. Something went wrong.');
          return;
        }
        setError('Something went wrong');
      } finally {
        setLoading(false);
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
