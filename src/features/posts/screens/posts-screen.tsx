import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePosts } from '../hooks/use-posts';
import { useSearch } from '../../../shared/hooks/use-search';
import { PostCard } from '../components/post-card';
import { SearchBar } from '../../../shared/components/search-bar';
import { LoadingSpinner } from '../../../shared/components/loading-spinner';
import { ErrorMessage } from '../../../shared/components/error-message';
import { Post } from '../../../shared/entities/post';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useTranslation } from '../../../shared/hooks/use-translation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PostsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { data: posts, isLoading, error, refetch } = usePosts();
  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    posts || [],
    ['title', 'body']
  );

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { postId: post.id, post });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={t('posts.errorLoading')} onRetry={refetch} />;

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onPress={() => handlePostPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={t('common.search')}
      />
      <FlatList
        data={filteredData}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
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
});