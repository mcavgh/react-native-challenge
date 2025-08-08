import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../../shared/entities/post';
import { useFavoritesStore } from '../../../shared/stores/favorites-store';

interface PostCardProps {
  post: Post;
  onPress: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isPostFavorite = isFavorite(post.id);

  const handleToggleFavorite = () => {
    toggleFavorite(post);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={styles.body} numberOfLines={3}>
          {post.content}
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            testID="favorite-button"
          >
            <Ionicons
              name={isPostFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isPostFavorite ? '#FF6B6B' : '#999'}
              testID={isPostFavorite ? 'heart-filled' : 'heart-outline'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userId: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 4,
    borderRadius: 20,
  },
});