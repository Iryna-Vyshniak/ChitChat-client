import { CapacitorHttp } from '@capacitor/core';
import { useIonLoading, useIonRouter, useIonToast } from '@ionic/react';

import { API } from '../../constants';
import { PostI } from '../../types';

export const useCreatePost = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

  const [showToast] = useIonToast();

  const createPost = async ({
    title,
    text,
    tags,
    imageUrl,
  }: PostI): Promise<void> => {
    await present('Upload post...');

    try {
      await CapacitorHttp.post({
        url: `${API}/api/posts/create`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ title, text, tags, imageUrl }),
        webFetchExtra: {
          credentials: 'include',
        },
      });

      router.push('/app/Posts', 'root');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Post Error:', error.message);
        showToast({
          message: error.message,
          duration: 2000,
          color: 'danger',
        });
      } else {
        console.error('Post Error:', 'An unexpected error occurred');
        showToast({
          message: 'An unexpected error occurred',
          duration: 2000,
          color: 'danger',
        });
      }
    } finally {
      dismiss();
    }
  };

  return { createPost };
};
