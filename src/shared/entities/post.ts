export interface Post {
  id: number;
  title: string;
  content: string;
  body?: string; 
  userId: number;
  category: string;
  image: string;
  imageUrl: string;
  thumbnail: string;
  url: string;
  slug: string;
  status: string;
  publishedAt: string;
  updatedAt: string;
  isFavorite?: boolean; 
}