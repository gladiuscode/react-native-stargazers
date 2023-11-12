import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import HomepageForm from './components/form/form.homepage';
import HomepageHeader from './components/header/header.homepage';
import useHomepageFacade from './useHomepage.facade';
import HomepageStargazers from './components/stagazersList/stargazersList.homepage';

const HomepageScreen = () => {
  const {styles, repositoryEntity, loading, error, onSubmit} =
    useHomepageFacade();

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
      {!repositoryEntity && error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}
      {repositoryEntity ? (
        <HomepageStargazers
          key={repositoryEntity.stargazers_url}
          url={repositoryEntity.stargazers_url}
          size={repositoryEntity.stargazers_count}
        />
      ) : null}
    </View>
  );
};

export default HomepageScreen;
