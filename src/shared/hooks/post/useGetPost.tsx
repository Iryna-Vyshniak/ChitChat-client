import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { API } from '../../constants';
import { PostCardI } from '../../types';

export const useGetPost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<PostCardI | null>(null);

  const getPost = async (id: string) => {
    setIsLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/posts/${id}`,
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = (await res.data) || {};

      if (!data || !data.post) {
        throw new Error('Invalid response format');
      }
      setPost(data.post);
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    post,
    setPost,
    getPost,
    isLoading,
  };
};
