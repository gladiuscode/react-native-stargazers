import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../../../providers/theme/useStyles.hook';

const getHomepageStargazersStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    separator: {
      marginBottom: defaults.spacing.s,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyMessage: {
      ...defaults.typography.styles.body,
    },
    footer: {
      alignItems: 'flex-end',
      padding: defaults.spacing.m,
    },
    footerNote: {
      ...defaults.typography.styles.caption,
      color: defaults.palette.textLight,
    },
  });
};

export default getHomepageStargazersStyles;
