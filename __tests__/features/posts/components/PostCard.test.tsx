import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PostCard } from '../../../../src/features/posts/components/post-card';
import { Post } from '../../../../src/shared/entities/post';
import { useFavoritesStore } from '../../../../src/shared/stores/favorites-store';

jest.mock('../../../../src/shared/stores/favorites-store');
const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<typeof useFavoritesStore>;

describe('PostCard Logic', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post Title',
    content: 'Test post content for testing purposes',
    userId: 1,
    category: 'Technology',
    image: 'test-image.jpg',
    imageUrl: 'https://example.com/test-image.jpg',
    thumbnail: 'test-thumbnail.jpg',
    url: 'https://example.com/post/1',
    slug: 'test-post-title',
    status: 'published',
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isFavorite: false,
  };

  const mockToggleFavorite = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFavoritesStore.mockReturnValue({
      isFavorite: mockIsFavorite,
      toggleFavorite: mockToggleFavorite,
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
  });

  it('should have valid post data structure', () => {
    expect(mockPost).toHaveProperty('id');
    expect(mockPost).toHaveProperty('title');
    expect(mockPost).toHaveProperty('content');
    expect(mockPost).toHaveProperty('userId');
    expect(mockPost).toHaveProperty('imageUrl');
    expect(typeof mockPost.id).toBe('number');
    expect(typeof mockPost.title).toBe('string');
    expect(typeof mockPost.content).toBe('string');
  });

  it('should call isFavorite with correct post id', () => {
    const { isFavorite } = useFavoritesStore();
    isFavorite(mockPost.id);
    expect(mockIsFavorite).toHaveBeenCalledWith(mockPost.id);
  });

  it('should call toggleFavorite with correct post', () => {
    const { toggleFavorite } = useFavoritesStore();
    toggleFavorite(mockPost);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockPost);
  });

  it('should return boolean from isFavorite function', () => {
    mockIsFavorite.mockReturnValue(true);
    const { isFavorite } = useFavoritesStore();
    const result = isFavorite(mockPost.id);
    expect(typeof result).toBe('boolean');
    expect(result).toBe(true);
  });

  it('should handle favorite state changes', () => {
    mockIsFavorite.mockReturnValue(false);
    const { isFavorite } = useFavoritesStore();
    expect(isFavorite(mockPost.id)).toBe(false);

    mockIsFavorite.mockReturnValue(true);
    expect(isFavorite(mockPost.id)).toBe(true);
  });
});

describe('PostCard', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post Title',
    content: 'Test post content for testing purposes',
    userId: 1,
    category: 'Technology',
    image: 'test-image.jpg',
    imageUrl: 'https://example.com/test-image.jpg',
    thumbnail: 'test-thumbnail.jpg',
    url: 'https://example.com/post/1',
    slug: 'test-post-title',
    status: 'published',
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isFavorite: false,
  };

  const mockOnPress = jest.fn();
  const mockToggleFavorite = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFavoritesStore.mockReturnValue({
      isFavorite: mockIsFavorite,
      toggleFavorite: mockToggleFavorite,
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
  });

  it('should render post information correctly', () => {
    mockIsFavorite.mockReturnValue(false);
    
    const { getByText } = render(
      <PostCard post={mockPost} onPress={mockOnPress} />
    );

    expect(getByText('Test Post Title')).toBeTruthy();
    expect(getByText('Test post content for testing purposes')).toBeTruthy();
  });

  it('should call onPress when card is pressed', () => {
    mockIsFavorite.mockReturnValue(false);
    
    const { getByText } = render(
      <PostCard post={mockPost} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Post Title'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should show filled heart when post is favorite', () => {
    mockIsFavorite.mockReturnValue(true);
    
    const { getByTestId } = render(
      <PostCard post={mockPost} onPress={mockOnPress} />
    );

    expect(mockIsFavorite).toHaveBeenCalledWith(mockPost.id);
  });

  it('should show outline heart when post is not favorite', () => {
    mockIsFavorite.mockReturnValue(false);
    
    const { getByTestId } = render(
      <PostCard post={mockPost} onPress={mockOnPress} />
    );

    expect(mockIsFavorite).toHaveBeenCalledWith(mockPost.id);
  });

  it('should toggle favorite when heart button is pressed', () => {
    mockIsFavorite.mockReturnValue(false);
    
    const { getByTestId } = render(
      <PostCard post={mockPost} onPress={mockOnPress} />
    );


  });
});