import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../providers/theme/useStyles.hook';

const getHomepageStyles = ({palette, typography, spacing}: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
      paddingTop: spacing.xl,
      paddingHorizontal: spacing.xl,
    },
    title: {
      ...typography.styles.body,
    },
  });
};

export default getHomepageStyles;
