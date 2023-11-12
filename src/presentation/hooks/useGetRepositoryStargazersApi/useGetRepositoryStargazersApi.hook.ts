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
          setError(e.message);
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

    const currentPage = Math.ceil(data.length / STARGAZERS_PER_PAGE);

    getStargazers(repositoryUrl, currentPage + 1).then();
  }, [data, enabled, getStargazers, loading, repositoryUrl]);

  return {
    data,
    loading,
    error,
    fetchNextPage,
  };
};

export default useGetRepositoryStargazerApi;
