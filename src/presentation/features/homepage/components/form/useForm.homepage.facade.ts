import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageFormStyles from './form.styles';
import {useCallback, useMemo, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';

interface Form {
  owner?: string;
  repository?: string;
}

const useHomepageFormFacade = (
  onSubmit: (owner: string, repository: string) => void,
) => {
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
