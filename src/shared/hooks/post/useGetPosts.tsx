import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { usePostStore } from '../../../store/usePostStore';
import { API } from '../../constants';

export const useGetPosts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const posts = usePostStore((store) => store.posts);
  const setPosts = usePostStore((store) => store.setPosts);
  const popularPosts = usePostStore((store) => store.popularPosts);
  const setPopularPosts = usePostStore((store) => store.setPopularPosts);
  //  test because in future we use socket
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  const getPosts = async () => {
    // If the posts are already loaded and the time for re-request has not passed, we do not make a new request
    if (
      posts.length > 0 &&
      lastFetchTime &&
      Date.now() - lastFetchTime < 5 * 60 * 1000 // less than 5 minutes
    ) {
      return;
    }
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
      // Store the time of the last download
      setLastFetchTime(Date.now());
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
