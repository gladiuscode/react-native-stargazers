import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../../../providers/theme/useStyles.hook';

const getHomepageHeaderStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      ...defaults.typography.styles.h1,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    languageButton: {
      borderBottomWidth: 1,
      borderColor: defaults.palette.border,
      marginRight: defaults.spacing.xl,
    },
    language: {
      ...defaults.typography.styles.h2,
      textTransform: 'uppercase',
    },
    themeIcon: {
      resizeMode: 'contain',
      height: 32,
      tintColor: defaults.palette.text,
    },
  });
};

export default getHomepageHeaderStyles;
