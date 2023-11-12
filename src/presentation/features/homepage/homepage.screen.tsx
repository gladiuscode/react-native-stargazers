import React from 'react';
import {Text, View} from 'react-native';
import useStyles from '../../providers/theme/useStyles.hook';
import getHomepageStyles from './homepage.styles';

const HomepageScreen = () => {
  const styles = useStyles(getHomepageStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StarGazers</Text>
    </View>
  );
};

export default HomepageScreen;
