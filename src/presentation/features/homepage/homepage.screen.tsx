import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import HomepageForm from './components/form/form.homepage';
import HomepageHeader from './components/header/header.homepage';
import useHomepageFacade from './useHomepage.facade';
import HomepageStargazers from './components/stagazersList/stargazersList.homepage';

const HomepageScreen = () => {
  const {styles, repositoryEntity, loading, onSubmit} = useHomepageFacade();

  return (
    <View style={styles.container}>
      <HomepageHeader style={styles.header} />
      <HomepageForm style={styles.form} onSubmit={onSubmit} />
      <View style={styles.separator} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : null}
      {repositoryEntity ? (
        <HomepageStargazers
          url={repositoryEntity.stargazers_url}
          size={repositoryEntity.stargazers_count}
        />
      ) : null}
    </View>
  );
};

export default HomepageScreen;
