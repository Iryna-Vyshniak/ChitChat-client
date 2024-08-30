import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { useUserStore } from '../../../store/useUserStore';
import { API } from '../../constants';

export const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUsers = useUserStore((store) => store.setUsers);
  const setFilteredUsers = useUserStore((store) => store.setFilteredUsers);
  const users = useUserStore((store) => store.users);
  const filteredUsers = useUserStore((store) => store.filteredUsers);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/api/users`,
        webFetchExtra: {
          credentials: 'include',
        },
      });
      const { data } = (await res.data) || {};

      if (!data || !data.allUsers || !data.filteredUsers) {
        throw new Error('Invalid response format');
      }
      setUsers(data.allUsers);
      setFilteredUsers(data.filteredUsers);
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    setUsers,
    filteredUsers,
    setFilteredUsers,
    getUsers,
    isLoading,
  };
};
