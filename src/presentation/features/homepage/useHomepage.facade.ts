import useStyles from '../../providers/theme/useStyles.hook';
import getHomepageStyles from './homepage.styles';
import {useCallback, useState} from 'react';

interface SearchPayload {
  owner?: string;
  repository?: string;
}

const useHomepageFacade = () => {
  const styles = useStyles(getHomepageStyles);
  const [, setSearchPayload] = useState<SearchPayload>({
    owner: undefined,
    repository: undefined,
  });

  const onSubmit = useCallback((owner: string, repository: string) => {
    setSearchPayload({
      owner,
      repository,
    });
  }, []);

  return {
    styles,
    onSubmit,
  };
};

export default useHomepageFacade;
