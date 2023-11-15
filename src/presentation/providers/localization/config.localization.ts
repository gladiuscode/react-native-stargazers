import i18nResources from '../../../assets/i18n/i18n.asset';

export const languages = ['it', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

export const resources = i18nResources;
