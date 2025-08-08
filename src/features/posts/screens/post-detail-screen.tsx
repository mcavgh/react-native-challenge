import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '../../../shared/stores/favorites-store';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useTranslation } from '../../../shared/hooks/use-translation';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;


export const PostDetailScreen: React.FC = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { post } = route.params;
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { t } = useTranslation();

  const isPostFavorite = isFavorite(post.id);

  const handleToggleFavorite = () => {
    toggleFavorite(post);
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.imageContainer}>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isPostFavorite ? 'heart' : 'heart-outline'}
              size={32}
              color={isPostFavorite ? '#FF6B6B' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>

        <View style={styles.statsSection}>

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.statText}>{post.publishedAt} </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name={isPostFavorite ? 'heart' : 'heart-outline'} size={16} color={isPostFavorite ? '#FF6B6B' : '#666'} />
            <Text style={[styles.statText, isPostFavorite && styles.favoriteText]}>{t('common.favorite')}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.bodySection}>
          <Text style={styles.body}>{post.imageUrl}</Text>
        </View>

      
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]}
            activeOpacity={0.8}
          >
            <Ionicons name="share-outline" size={20} color="#007AFF" />
            <Text style={styles.shareButtonText}>{t('common.share')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.favoriteActionButton, isPostFavorite && styles.favoriteActiveButton]}
            onPress={handleToggleFavorite}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={isPostFavorite ? 'heart' : 'heart-outline'} 
              size={20} 
              color={isPostFavorite ? '#fff' : '#FF6B6B'} 
            />
            <Text style={[styles.favoriteActionText, isPostFavorite && styles.favoriteActiveText]}>
              {isPostFavorite ? t('common.removeFavorite') : t('common.addFavorite')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    padding: 12,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 36,
    marginBottom: 20,
  },
  authorSection: {
    marginBottom: 20,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  authorUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  publishDate: {
    fontSize: 12,
    color: '#999',
  },
  authorLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  authorInfoPlaceholder: {
    flex: 1,
  },
  namePlaceholder: {
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 6,
    width: '60%',
  },
  datePlaceholder: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    width: '40%',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  favoriteText: {
    color: '#FF6B6B',
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginBottom: 20,
  },
  bodySection: {
    marginBottom: 30,
  },
  bodyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    textAlign: 'justify',
  },
  authorDetailsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  authorCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  authorCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarTextLarge: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  authorCardInfo: {
    flex: 1,
  },
  authorCardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  authorCardUsername: {
    fontSize: 14,
    color: '#666',
  },
  authorContactInfo: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionsSection: {
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  shareButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  shareButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  favoriteActionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  favoriteActiveButton: {
    backgroundColor: '#FF6B6B',
  },
  favoriteActionText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '500',
  },
  favoriteActiveText: {
    color: '#fff',
  },
});