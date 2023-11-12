import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../providers/theme/useStyles.hook';

const getHomepageStyles = ({palette, spacing, typography}: StylesDefaults) => {
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorMessage: {
      ...typography.styles.body,
      color: palette.error,
    },
  });
};

export default getHomepageStyles;
