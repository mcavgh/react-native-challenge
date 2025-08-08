import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavoritesStore } from '../../../shared/stores/favorites-store';
import { PostCard } from '../../posts/components/post-card';
import { Post } from '../../../shared/entities/post';
import { RootStackParamList } from '../../../shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { favorites } = useFavoritesStore();

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { postId: post.id, post });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onPress={() => handlePostPress(item)}
    />
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes noticias favoritas</Text>
        <Text style={styles.emptySubtext}>Marca algunas noticias como favoritas para verlas aquí</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});