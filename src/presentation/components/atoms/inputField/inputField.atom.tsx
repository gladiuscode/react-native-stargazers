import React, {memo, useCallback} from 'react';
import {StyleProp, TextInput, View, ViewStyle} from 'react-native';
import useStyles from '../../../providers/theme/useStyles.hook';
import getInputFieldStyles from './inputField.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  id?: string;
  initialValue?: string;
  placeholder?: string;
  onChangeText: (id: string, value: string) => void;
}

const InputField = memo<Props>(
  ({style, id = 'input', initialValue, placeholder, onChangeText}) => {
    const styles = useStyles(getInputFieldStyles);

    const onLocalChangeText = useCallback(
      (value: string) => {
        onChangeText(id, value);
      },
      [id, onChangeText],
    );

    return (
      <View style={[style, styles.container]}>
        <TextInput
          value={initialValue}
          placeholder={placeholder}
          autoCapitalize={'none'}
          onChangeText={onLocalChangeText}
        />
      </View>
    );
  },
);

export default InputField;
