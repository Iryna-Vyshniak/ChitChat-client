import { useIonViewWillEnter } from '@ionic/react';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useState } from 'react';

import { API } from '../../constants';
import { UserItemI } from '../../types';

export const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserItemI[]>([]);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/users`,
        webFetchExtra: {
          credentials: 'include',
        },
      });
      const { data } = res.data;

      return data.users;
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadUsers = async () => {
      const users = await getUsers();
      setUsers(users);
      setIsLoading(false);
    };
    loadUsers();
  });

  return { users, setUsers, getUsers, isLoading };
};
