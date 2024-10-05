import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { usePostStore } from '../../../store/usePostStore';
import { API } from '../../constants';

export const useGetPosts = () => {
  const posts = usePostStore((store) => store.posts);
  const setPosts = usePostStore((store) => store.setPosts);
  const popularPosts = usePostStore((store) => store.popularPosts);
  const setPopularPosts = usePostStore((store) => store.setPopularPosts);
  const isLoading = usePostStore((store) => store.isLoading);
  const setIsLoading = usePostStore((store) => store.setIsLoading);

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/posts`,
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = (await res.data) || {};

      if (!data || !data.posts) {
        throw new Error('Invalid response format');
      }

      setPosts(data.posts);
      setPopularPosts(data.popularPosts);
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    setPosts,
    popularPosts,
    setPopularPosts,
    getPosts,
    isLoading,
  };
};
