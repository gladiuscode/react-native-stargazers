import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import InputField from '../../../../components/atoms/inputField/inputField.atom';
import Images from '../../../../../assets/images/images.asset';
import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageFormStyles from './form.styles';

interface Form {
  owner?: string;
  repository?: string;
}

interface Props {
  style?: StyleProp<ViewStyle>;
  onSubmit: (owner: string, repository: string) => void;
}

const HomepageForm = memo<Props>(({style, onSubmit}) => {
  const styles = useStyles(getHomepageFormStyles);
  const [form, setForm] = useState<Form>({});
  const [showErrors, setShowErrors] = useState(false);

  const isInvalid = useMemo(
    () => !form.owner || !form.repository,
    [form.owner, form.repository],
  );

  const getErrorMessageOf = useCallback(
    (id: string) => {
      if (!showErrors) {
        return;
      }

      if (id === 'owner') {
        return !form.owner ? 'Owner is mandatory' : undefined;
      }

      return !form.repository ? 'Repository is mandatory' : undefined;
    },
    [form.owner, form.repository, showErrors],
  );

  const onChangeText = useCallback(
    (id: string, value: string) =>
      setForm(prevForm => ({
        ...prevForm,
        [id]: value,
      })),
    [],
  );

  const onSearchPress = useCallback(() => {
    Keyboard.dismiss();

    if (isInvalid) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    onSubmit(form.owner!, form.repository!);
  }, [form.owner, form.repository, isInvalid, onSubmit]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputsContainer}>
        <InputField
          style={styles.ownerInput}
          id={'owner'}
          initialValue={form.owner}
          placeholder={'Owner*'}
          errorMessage={getErrorMessageOf('owner')}
          onChangeText={onChangeText}
        />
        <InputField
          id={'repository'}
          initialValue={form.repository}
          placeholder={'Repository*'}
          errorMessage={getErrorMessageOf('repository')}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
          <Image source={Images.search} style={styles.searchImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default HomepageForm;
