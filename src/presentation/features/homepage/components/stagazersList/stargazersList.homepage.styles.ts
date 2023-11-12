import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../../../providers/theme/useStyles.hook';

export const STARGAZER_CARD_HEIGHT = 120;

const getHomepageStargazersStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    stargazerCard: {
      height: STARGAZER_CARD_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: defaults.spacing.m,
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
