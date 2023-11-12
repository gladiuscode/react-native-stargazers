import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {StylesDefaults} from '../theme/useStyles.hook';

const getErrorBannerProviderStyles = (defaults: StylesDefaults) => {
  const container: ViewStyle = {
    top: 60,
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
    marginHorizontal: defaults.spacing.xl,
    padding: defaults.spacing.l,
    zIndex: 2,
    borderWidth: 1,
    borderRadius: defaults.borderRadius.s,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  };

  const message: TextStyle = {
    ...defaults.typography.styles.body,
  };

  return StyleSheet.create({
    errorContainer: {
      ...container,
      backgroundColor: defaults.palette.errorSurface,
      borderColor: defaults.palette.error,
    },
    errorMessage: {
      ...message,
      color: defaults.palette.error,
    },
    successContainer: {
      ...container,
      backgroundColor: defaults.palette.successSurface,
      borderColor: defaults.palette.success,
    },
    successMessage: {
      ...message,
      color: defaults.palette.success,
    },
  });
};

export default getErrorBannerProviderStyles;
