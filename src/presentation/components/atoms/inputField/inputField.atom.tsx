import React, {memo, useCallback, useMemo} from 'react';
import {StyleProp, Text, TextInput, View, ViewStyle} from 'react-native';
import useStyles from '../../../providers/theme/useStyles.hook';
import getInputFieldStyles from './inputField.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  id?: string;
  initialValue?: string;
  placeholder?: string;
  errorMessage?: string;
  onChangeText: (id: string, value: string) => void;
}

const InputField = memo<Props>(
  ({
    style,
    id = 'input',
    initialValue,
    placeholder,
    errorMessage,
    onChangeText,
  }) => {
    const styles = useStyles(getInputFieldStyles);

    const inputContainerStyle = useMemo(() => {
      if (!errorMessage) {
        return styles.inputContainer;
      }

      return [styles.inputContainer, styles.errorInputContainer];
    }, [errorMessage, styles.errorInputContainer, styles.inputContainer]);

    const onLocalChangeText = useCallback(
      (value: string) => {
        onChangeText(id, value);
      },
      [id, onChangeText],
    );

    return (
      <View style={style}>
        <View style={inputContainerStyle}>
          <TextInput
            value={initialValue}
            placeholder={placeholder}
            placeholderTextColor={
              errorMessage ? styles.errorPlaceholderTextColor.color : undefined
            }
            autoCapitalize={'none'}
            onChangeText={onLocalChangeText}
          />
        </View>
        {errorMessage ? (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  },
);

export default InputField;
