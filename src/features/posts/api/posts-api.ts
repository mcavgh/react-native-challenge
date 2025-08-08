import { apiClient } from '../../../shared/api/api-client';
import { Post } from '../../../shared/entities/post'; 

const generateImageUrl = (id: number) => `https://picsum.photos/400/200?random=${id}`;

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const posts = await apiClient.get<Post[]>('/posts');
    return posts.map(post => ({
      ...post,
      imageUrl: generateImageUrl(post.id),
    }));
  },
  
  getPost: async (id: number): Promise<Post> => {
    const post = await apiClient.get<Post>(`/posts?id=${id}`);
    return {
      ...post,
      imageUrl: generateImageUrl(post.id),
    };
  },
};