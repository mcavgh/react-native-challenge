import { Post } from '../../../src/shared/entities/post';

describe('Post Entity', () => {
  it('should create a post with all properties', () => {
    const post: Post = {
      id: 1,
      title: 'Test title',
      userId: 1,
      isFavorite: false,
      content: 'Test content',
      category: 'Test category',
      image: 'Test image',
      imageUrl: 'Test imageUrl',
      thumbnail: 'Test thumbnail',
      url: 'Test url',
      slug: 'Test slug',
      status: 'Test status',
      publishedAt: 'Test publishedAt',
      updatedAt: 'Test updatedAt',
    };

    expect(post.id).toBe(1);
    expect(post.title).toBe('Test title');
    expect(post.userId).toBe(1);
    expect(post.content).toBe('Test content');
    expect(post.category).toBe('Test category');
    expect(post.image).toBe('Test image');
    expect(post.imageUrl).toBe('Test imageUrl');
    expect(post.thumbnail).toBe('Test thumbnail');
    expect(post.url).toBe('Test url');
    expect(post.slug).toBe('Test slug');
    expect(post.status).toBe('Test status');
    expect(post.publishedAt).toBe('Test publishedAt');
    expect(post.updatedAt).toBe('Test updatedAt');
  });

  it('should have required properties', () => {
    const post: Post = {
      id: 2,
      title: 'Test title 2',
      userId: 2,
      content: 'Test content',
      category: 'Test category',
      image: 'Test image',
      imageUrl: 'Test imageUrl',
      thumbnail: 'Test thumbnail',
      url: 'Test url',
      slug: 'Test slug',
      status: 'Test status',
      publishedAt: 'Test publishedAt',
      updatedAt: 'Test updatedAt',
      isFavorite: true,
    };

    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('category');
    expect(post).toHaveProperty('image');
    expect(post).toHaveProperty('imageUrl');
    expect(post).toHaveProperty('thumbnail');
    expect(post).toHaveProperty('url');
    expect(post).toHaveProperty('slug');
    expect(post).toHaveProperty('status');
    expect(post).toHaveProperty('publishedAt');
    expect(post).toHaveProperty('updatedAt');
    expect(post).toHaveProperty('isFavorite');
  });
});