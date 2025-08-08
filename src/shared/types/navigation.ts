import { Post } from "../entities/post";

export type RootStackParamList = {
  Main: undefined;
  PostDetail: { postId: number,post:Post };
};

export type TabParamList = {
  Posts: undefined;
  Users: undefined;
  Favorites: undefined;
};