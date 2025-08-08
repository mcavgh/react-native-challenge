import { useTranslation as useI18nextTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';

export const useTranslation = () => {
  const { t, i18n: i18nInstance } = useI18nextTranslation();

  const changeLanguage = async (language: string) => {
    try {
      await i18nInstance.changeLanguage(language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const getCurrentLanguage = (): string => {
    return i18nInstance.language || 'es';
  };

  const getAvailableLanguages = (): string[] => {
    return Object.keys(i18nInstance.options.resources || {});
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    i18n: i18nInstance,
  };
};

