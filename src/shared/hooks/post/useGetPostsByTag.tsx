import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { useEffect, useState } from 'react';

import { API } from '../../constants';
import { PostCardI } from '../../types';

export const useGetPostsByTag = (tag: string) => {
  const [isTagsPostLoading, setIsTagsPostLoading] = useState<boolean>(false);
  const [tagsPosts, setTagsPosts] = useState<PostCardI[]>([]);
  const [totalTagsPages, setTotalTagsPages] = useState<number>(0);
  const [currentTagsPage, setCurrentTagsPage] = useState<number>(1);

  const getPostsByTag = async (tag: string, page: number = 1, limit: number = 10) => {
    setIsTagsPostLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/posts/tags/${tag}`,
        params: { page: page.toString(), limit: limit.toString() },
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = (await res.data) || {};

      if (!data) {
        throw new Error('Invalid response format');
      }

      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsTagsPostLoading(false);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      const { posts, totalPages, currentPage } = await getPostsByTag(tag);
      setTagsPosts(posts);
      setTotalTagsPages(totalPages);
      setCurrentTagsPage(currentPage);

      setIsTagsPostLoading(false);
    };
    if (tag) {
      loadPosts();
    }
  }, [tag]);

  return {
    tagsPosts,
    setTagsPosts,
    getPostsByTag,
    isTagsPostLoading,
    totalTagsPages,
    currentTagsPage,
  };
};
