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
      borderColor: defaults.palette.border,
    },
    stargazerCardLeftContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: defaults.spacing.xxl,
    },
    stargazerCardAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: defaults.spacing.m,
    },
    stargazerCardName: {
      flex: 1,
      ...defaults.typography.styles.h2,
    },
    stargazerCardRightContent: {
      justifyContent: 'center',
    },
    stargazerCardShareIcon: {
      width: 52,
      height: 48,
      tintColor: defaults.palette.text,
    },
  });
};

export default getStargazerCardStyles;
