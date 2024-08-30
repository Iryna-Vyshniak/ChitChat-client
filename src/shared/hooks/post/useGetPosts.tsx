import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { API } from '../../constants';
import { PostCardI } from '../../types';

export const useGetPosts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostCardI[]>([]);
  const [popularPosts, setPopularPosts] = useState<PostCardI[]>([]);

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
