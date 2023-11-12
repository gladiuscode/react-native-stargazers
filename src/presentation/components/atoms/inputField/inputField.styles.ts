import {StylesDefaults} from '../../../providers/theme/useStyles.hook';
import {StyleSheet} from 'react-native';

const getInputFieldStyles = (defaults: StylesDefaults) => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: defaults.borderRadius.s,
      paddingVertical: defaults.spacing.s,
      paddingHorizontal: defaults.spacing.m,
    },
  });
};

export default getInputFieldStyles;
