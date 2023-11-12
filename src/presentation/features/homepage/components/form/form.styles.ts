import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../../../providers/theme/useStyles.hook';

const getHomepageFormStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputsContainer: {
      flex: 2,
    },
    ownerInput: {
      marginBottom: defaults.spacing.l,
    },
    searchContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchButton: {
      padding: 12,
      borderWidth: 1,
      borderRadius: 12,
    },
    searchImage: {
      width: 24,
      height: 24,
    },
  });
};

export default getHomepageFormStyles;
