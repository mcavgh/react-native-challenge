import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../hooks/use-translation';

interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const { changeLanguage, getCurrentLanguage, getAvailableLanguages } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const availableLanguages = getAvailableLanguages();

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    onLanguageChange?.(language);
  };

  const getLanguageLabel = (lang: string) => {
    const labels: { [key: string]: string } = {
      'es': 'Español',
      'en': 'English',
    };
    return labels[lang] || lang;
  };

  return (
    <View style={styles.container}>
      {availableLanguages.map((language) => (
        <TouchableOpacity
          key={language}
          style={[
            styles.languageButton,
            currentLanguage.startsWith(language) && styles.activeLanguage,
          ]}
          onPress={() => handleLanguageChange(language)}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage.startsWith(language) && styles.activeLanguageText,
            ]}
          >
            {getLanguageLabel(language)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeLanguage: {
    backgroundColor: '#007AFF',
  },
  languageText: {
    fontSize: 14,
    color: '#333',
  },
  activeLanguageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});