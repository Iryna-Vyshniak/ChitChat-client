import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';

export const useGetAllTags = () => {
  const [isTagLoading, setIsTagLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const getTags = async () => {
    setIsTagLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/posts/tags`,
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = (await res.data) || {};

      if (!data || !data.tags) {
        throw new Error('Invalid response format');
      }

      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsTagLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadTags = async () => {
      const { tags } = await getTags();
      setTags(tags);
      setIsTagLoading(false);
    };
    loadTags();
  });

  return { tags, setTags, getTags, isTagLoading };
};
