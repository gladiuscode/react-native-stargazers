import {StylesDefaults} from '../../../providers/theme/useStyles.hook';
import {StyleSheet} from 'react-native';

const getInputFieldStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      borderRadius: defaults.borderRadius.s,
      paddingVertical: defaults.spacing.s,
      paddingHorizontal: defaults.spacing.m,
    },
    errorInputContainer: {
      borderColor: defaults.palette.error,
    },
    errorPlaceholderTextColor: {
      color: defaults.palette.error,
    },
    errorMessageContainer: {
      marginTop: defaults.spacing.s,
    },
    errorMessage: {
      ...defaults.typography.styles.caption,
      color: defaults.palette.error,
    },
  });
};

export default getInputFieldStyles;
