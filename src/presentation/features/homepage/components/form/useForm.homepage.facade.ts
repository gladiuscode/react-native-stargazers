import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageFormStyles from './form.styles';
import {useCallback, useMemo, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {useLocalization} from '../../../../providers/localization/localization.container';

interface Form {
  owner?: string;
  repository?: string;
}

const useHomepageFormFacade = (
  onSubmit: (owner: string, repository: string) => void,
) => {
  const {t} = useLocalization();
  const styles = useStyles(getHomepageFormStyles);
  const [form, setForm] = useState<Form>({});
  const [showErrors, setShowErrors] = useState(false);

  const repositoryInputRef = useRef<TextInput>(null);

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
        return !form.owner ? t('owner_is_mandatory') : undefined;
      }

      return !form.repository ? t('repository_is_mandatory') : undefined;
    },
    [form.owner, form.repository, showErrors, t],
  );

  const onChangeText = useCallback(
    (id: string, value: string) =>
      setForm(prevForm => ({
        ...prevForm,
        [id]: value,
      })),
    [],
  );

  const onInputSubmit = useCallback((id: string) => {
    if (id === 'owner') {
      repositoryInputRef.current?.focus();
      return;
    }
  }, []);

  const onSearchPress = useCallback(() => {
    Keyboard.dismiss();

    if (isInvalid) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    onSubmit(form.owner!, form.repository!);
  }, [form.owner, form.repository, isInvalid, onSubmit]);

  return {
    t,
    styles,
    form,
    repositoryInputRef,
    getErrorMessageOf,
    onChangeText,
    onInputSubmit,
    onSearchPress,
  };
};

export default useHomepageFormFacade;
