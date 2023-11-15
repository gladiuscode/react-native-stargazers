import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {findBestLanguageTag} from 'react-native-localize';
import {
  defaultLanguage,
  Language,
  languages,
  resources,
} from './config.localization';
import contextFactory from '@utils/contextFactory/contextFactory.util';

export interface LocalizationContext {
  readonly language: Language;
  readonly t: (key: keyof (typeof resources)['it']) => string;
  readonly onLanguageChange: (language: Language) => void;
}

const [useLocalization, LocalizationProvider] =
  contextFactory<LocalizationContext>('LocalizationContext');
export {useLocalization, LocalizationProvider};

const LocalizationContainer: React.FC<PropsWithChildren> = ({children}) => {
  const [language, setLanguage] = useState<Language>(
    findBestLanguageTag(languages)?.languageTag ?? defaultLanguage,
  );

  const t = useCallback(
    (key: keyof (typeof resources)['it']) => resources[language][key],
    [language],
  );

  const onLanguageChange = useCallback<LocalizationContext['onLanguageChange']>(
    newLanguage => setLanguage(newLanguage),
    [],
  );

  const value = useMemo<LocalizationContext>(() => {
    return {
      language,
      t,
      onLanguageChange,
    };
  }, [language, onLanguageChange, t]);

  return <LocalizationProvider value={value}>{children}</LocalizationProvider>;
};

export default LocalizationContainer;
