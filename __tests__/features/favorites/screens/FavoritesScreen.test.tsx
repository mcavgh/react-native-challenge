import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FavoritesScreen } from '../../../../src/features/favorites/screens/favorites-screen';
import { useFavoritesStore } from '../../../../src/shared/stores/favorites-store';
import { Post } from '../../../../src/shared/entities/post';

jest.mock('../../../../src/shared/stores/favorites-store');
const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<typeof useFavoritesStore>;

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../../../src/features/posts/components/post-card', () => ({
  PostCard: ({ post, onPress }: { post: Post; onPress: () => void }) => {
    const { Text, TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity testID={`post-card-${post.id}`} onPress={onPress}>
        <Text testID={`post-title-${post.id}`}>{post.title}</Text>
      </TouchableOpacity>
    );
  },
}));

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  content: 'Test content',
  userId: 1,
  category: 'test',
  image: 'test.jpg',
  imageUrl: 'https://test.com/image.jpg',
  thumbnail: 'thumb.jpg',
  url: 'https://test.com',
  slug: 'test-post',
  status: 'published',
  publishedAt: '2024-01-01',
  body: 'Test body',
  isFavorite: true,
  updatedAt: '2024-01-01',
};

describe('FavoritesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when no favorites', () => {
    mockUseFavoritesStore.mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { getByText } = render(<FavoritesScreen />);

    expect(getByText('No tienes noticias favoritas')).toBeTruthy();
    expect(getByText('Marca algunas noticias como favoritas para verlas aquí')).toBeTruthy();
  });

  it('should render favorites list when favorites exist', () => {
    const mockFavorites = [mockPost];
    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { getByTestId } = render(<FavoritesScreen />);

    expect(getByTestId('post-card-1')).toBeTruthy();
    expect(getByTestId('post-title-1')).toBeTruthy();
  });

  it('should navigate to post detail when post is pressed', () => {
    const mockFavorites = [mockPost];
    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { getByTestId } = render(<FavoritesScreen />);
    
    fireEvent.press(getByTestId('post-card-1'));

    expect(mockNavigate).toHaveBeenCalledWith('PostDetail', {
      postId: 1,
      post: mockPost,
    });
  });

  it('should render multiple favorites correctly', () => {
    const mockPost2: Post = {
      ...mockPost,
      id: 2,
      title: 'Second Test Post',
    };
    
    const mockFavorites = [mockPost, mockPost2];
    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { getByTestId } = render(<FavoritesScreen />);

    expect(getByTestId('post-card-1')).toBeTruthy();
    expect(getByTestId('post-card-2')).toBeTruthy();
    expect(getByTestId('post-title-1')).toBeTruthy();
    expect(getByTestId('post-title-2')).toBeTruthy();
  });

  it('should handle navigation for different posts correctly', () => {
    const mockPost2: Post = {
      ...mockPost,
      id: 2,
      title: 'Second Test Post',
    };
    
    const mockFavorites = [mockPost, mockPost2];
    mockUseFavoritesStore.mockReturnValue({
      favorites: mockFavorites,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });

    const { getByTestId } = render(<FavoritesScreen />);
    
    fireEvent.press(getByTestId('post-card-1'));
    expect(mockNavigate).toHaveBeenCalledWith('PostDetail', {
      postId: 1,
      post: mockPost,
    });

    fireEvent.press(getByTestId('post-card-2'));
    expect(mockNavigate).toHaveBeenCalledWith('PostDetail', {
      postId: 2,
      post: mockPost2,
    });

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });
});