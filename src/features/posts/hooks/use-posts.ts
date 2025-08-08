import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../api/posts-api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getPosts,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};