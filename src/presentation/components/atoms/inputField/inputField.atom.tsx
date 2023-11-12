import React, {forwardRef, memo, useCallback, useMemo} from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import useStyles from '../../../providers/theme/useStyles.hook';
import getInputFieldStyles from './inputField.styles';

interface Props extends Pick<TextInputProps, 'returnKeyType'> {
  style?: StyleProp<ViewStyle>;
  id?: string;
  initialValue?: string;
  placeholder?: string;
  errorMessage?: string;
  onChangeText: (id: string, value: string) => void;
  onSubmit?: (id: string) => void;
}

const InputField = memo(
  forwardRef<TextInput, Props>(
    (
      {
        style,
        id = 'input',
        initialValue,
        placeholder,
        errorMessage,
        returnKeyType,
        onChangeText,
        onSubmit,
      },
      ref,
    ) => {
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

      const onLocalSubmit = useCallback(() => {
        onSubmit?.(id);
      }, [id, onSubmit]);

      return (
        <View style={style}>
          <View style={inputContainerStyle}>
            <TextInput
              ref={ref}
              value={initialValue}
              placeholder={placeholder}
              placeholderTextColor={
                errorMessage
                  ? styles.errorPlaceholderTextColor.color
                  : undefined
              }
              autoCapitalize={'none'}
              returnKeyType={returnKeyType}
              onChangeText={onLocalChangeText}
              onSubmitEditing={onLocalSubmit}
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
  ),
);

export default InputField;
