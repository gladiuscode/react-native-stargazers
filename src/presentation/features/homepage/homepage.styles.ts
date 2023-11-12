import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../providers/theme/useStyles.hook';

const getHomepageStyles = ({palette, spacing}: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
      paddingTop: spacing.xl,
      paddingHorizontal: spacing.xl,
    },
    header: {
      marginBottom: spacing.xxl,
    },
    form: {
      marginBottom: spacing.xxl,
    },
    separator: {
      height: 1,
      backgroundColor: palette.divider,
      marginBottom: spacing.xxl,
    },
  });
};

export default getHomepageStyles;
