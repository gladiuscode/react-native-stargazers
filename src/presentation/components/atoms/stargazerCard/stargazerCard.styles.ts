import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../../providers/theme/useStyles.hook';

export const STARGAZER_CARD_HEIGHT = 120;

const getStargazerCardStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
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
  });
};

export default getStargazerCardStyles;
