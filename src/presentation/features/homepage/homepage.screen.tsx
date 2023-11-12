import React from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import HomepageForm from './components/form/form.homepage';
import HomepageHeader from './components/header/header.homepage';
import useHomepageFacade from './useHomepage.facade';
import HomepageStargazers from './components/stagazersList/stargazersList.homepage';

const HomepageScreen = () => {
  const {styles, repositoryEntity, loading, error, onSubmit} =
    useHomepageFacade();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomepageHeader style={styles.header} />
        <HomepageForm style={styles.form} onSubmit={onSubmit} />
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={styles.loading.color} />
          </View>
        ) : null}
        {!repositoryEntity && error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        ) : null}
        {repositoryEntity ? (
          <HomepageStargazers
            style={styles.listContainer}
            key={repositoryEntity.stargazers_url}
            url={repositoryEntity.stargazers_url}
            size={repositoryEntity.stargazers_count}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default HomepageScreen;
