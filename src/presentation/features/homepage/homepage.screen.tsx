import React from 'react';
import {View} from 'react-native';
import HomepageForm from './components/form/form.homepage';
import HomepageHeader from './components/header/header.homepage';
import useHomepageFacade from './useHomepage.facade';

const HomepageScreen = () => {
  const {styles, onSubmit} = useHomepageFacade();

  return (
    <View style={styles.container}>
      <HomepageHeader style={styles.header} />
      <HomepageForm style={styles.form} onSubmit={onSubmit} />
      <View style={styles.separator} />
    </View>
  );
};

export default HomepageScreen;
