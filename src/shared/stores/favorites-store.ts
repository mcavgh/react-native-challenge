import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../entities/Post';

interface FavoritesState {
  favorites: Post[];
  addFavorite: (post: Post) => void;
  removeFavorite: (postId: number) => void;
  isFavorite: (postId: number) => boolean;
  toggleFavorite: (post: Post) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (post: Post) => {
        const { favorites } = get();
        if (!favorites.find(fav => fav.id === post.id)) {
          set({ favorites: [...favorites, { ...post, isFavorite: true }] });
        }
      },
      
      removeFavorite: (postId: number) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.id !== postId) });
      },
      
      isFavorite: (postId: number) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === postId);
      },
      
      toggleFavorite: (post: Post) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(post.id)) {
          removeFavorite(post.id);
        } else {
          addFavorite(post);
        }
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);