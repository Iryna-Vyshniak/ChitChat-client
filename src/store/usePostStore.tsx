import { create } from 'zustand';

import { PostCardI } from '../shared/types';

interface PostState {
  posts: PostCardI[] | [];
  setPosts: (posts: PostCardI[]) => void;
  popularPosts: PostCardI[] | [];
  setPopularPosts: (posts: PostCardI[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts: PostCardI[]) => set((state) => ({ ...state, posts })),
  popularPosts: [],
  setPopularPosts: (popularPosts: PostCardI[]) =>
    set((state) => ({ ...state, popularPosts })),
  isLoading: false,
  setIsLoading: (loading: boolean) =>
    set((state) => ({ ...state, isLoading: loading })),
}));
