import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../../../providers/theme/useStyles.hook';

const getHomepageStargazersStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    stargazerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: defaults.spacing.m,
      borderWidth: 1,
      borderRadius: defaults.borderRadius.s,
    },
    stargazerCardLeftContent: {
      marginRight: defaults.spacing.xxl,
    },
    stargazerCardAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: defaults.spacing.m,
    },
    stargazerCardName: {
      ...defaults.typography.styles.body,
    },
    stargazerCardRightContent: {
      justifyContent: 'center',
    },
    stargazerCardShareIcon: {
      width: 52,
      height: 48,
    },
    separator: {
      marginBottom: defaults.spacing.s,
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
