import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';
import { UserItemI } from '../../types';

export const useUserInfo = (userId: string) => {
  const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserItemI>();

  const getUserInfo = async (): Promise<UserItemI> => {
    setIsUserInfoLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/users/${userId}`,
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = (await res.data) || {};

      if (!data || !data.user) {
        throw new Error('Invalid response format');
      }

      return data.user;
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    } finally {
      setIsUserInfoLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadUserInfo = async () => {
      const user = await getUserInfo();
      setUserInfo(user);
      setIsUserInfoLoading(false);
    };
    loadUserInfo();
  });

  return { userInfo, setUserInfo, getUserInfo, isUserInfoLoading };
};
