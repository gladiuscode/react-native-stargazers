import useStyles from '../../providers/theme/useStyles.hook';
import getHomepageStyles from './homepage.styles';
import {useCallback, useState} from 'react';
import useGetRepositoryApi from '../../hooks/useGetRepositoryApi/useGetRepositoryApi.hook';

interface SearchPayload {
  owner?: string;
  repository?: string;
}

const useHomepageFacade = () => {
  const styles = useStyles(getHomepageStyles);
  const [searchPayload, setSearchPayload] = useState<SearchPayload>({
    owner: undefined,
    repository: undefined,
  });

  const {
    data: repositoryEntity,
    loading,
    error,
  } = useGetRepositoryApi(searchPayload);

  const onSubmit = useCallback((owner: string, repository: string) => {
    setSearchPayload({
      owner,
      repository,
    });
  }, []);

  return {
    styles,
    repositoryEntity,
    loading,
    error,
    onSubmit,
  };
};

export default useHomepageFacade;
