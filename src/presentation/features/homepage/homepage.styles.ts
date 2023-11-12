import {StyleSheet} from 'react-native';
import {StylesDefaults} from '../../providers/theme/useStyles.hook';

const getHomepageStyles = ({palette, spacing, typography}: StylesDefaults) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    container: {
      flex: 1,
      paddingTop: spacing.xl,
    },
    header: {
      marginBottom: spacing.xxl,
      paddingHorizontal: spacing.xl,
    },
    form: {
      marginBottom: spacing.xxl,
      paddingHorizontal: spacing.xl,
    },
    separatorContainer: {
      paddingHorizontal: spacing.xl,
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
    listContainer: {
      paddingHorizontal: spacing.xl,
    },
  });
};

export default getHomepageStyles;
