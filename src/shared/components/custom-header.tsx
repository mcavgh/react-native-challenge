import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../hooks/use-translation';

interface CustomHeaderProps  {
  title?: string;
  showBackButton?: boolean;
  showFavoriteButton?: boolean;
  showShareButton?: boolean;
  showBookmarkButton?: boolean;
  showLanguageButton?: boolean;
  gradientColors?: string[];
  onFavoritePress?: () => void;
  onSharePress?: () => void;
  onBookmarkPress?: () => void;
  rightActions?: React.ReactNode;
  options?: any
  route?:any
  navigation?:any

}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  options,
  title,
  showBackButton = true,
  showLanguageButton = true,
  gradientColors = ['#667eea', '#764ba2'],
  rightActions,
}) => {
  const { changeLanguage, getCurrentLanguage } = useTranslation();
  const headerTitle = title || options.title || 'Título';
  const canGoBack = navigation.canGoBack();
  
  const handleLanguageToggle = () => {
    try {
      const currentLanguage = getCurrentLanguage();
      const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
      changeLanguage(newLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const renderHeaderButton = (
    iconName: keyof typeof Ionicons.glyphMap,
    onPress?: () => void,
    marginLeft?: number
  ) => (
    <TouchableOpacity
      style={[styles.headerButton, marginLeft ? { marginLeft } : undefined]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.buttonBackground}>
        <Ionicons name={iconName} size={22} color="#fff" />
      </View>
    </TouchableOpacity>
  );

  const renderLanguageButton = () => {
    const currentLanguage = getCurrentLanguage();
    
    return (
      <TouchableOpacity
        style={[styles.headerButton, { marginLeft: 12 }]}
        onPress={handleLanguageToggle}
        activeOpacity={0.7}
      >
        <View style={styles.buttonBackground}>
          <Text style={styles.languageText}>
            {currentLanguage === 'es' ? 'ES' : 'EN'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={gradientColors as any}
      style={styles.headerContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerContent}>
        {/* Left Side - Back Button */}
        <View style={styles.leftSection}>
          {showBackButton && canGoBack && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <View style={styles.buttonBackground}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {headerTitle}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {rightActions || (
            <View style={styles.headerActions}>

              {showLanguageButton && renderLanguageButton()}
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50, // Status bar height
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerButton: {
    padding: 4,
  },
  buttonBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});