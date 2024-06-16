import {  useIonViewWillEnter } from '@ionic/react';
import {  useState } from 'react';

import { API } from '../../constants';
import { UserItemI } from '../../types';

export const useGetUsers = () => {
  const [ isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserItemI[]>([]);

  const getUsers = async () => {
    setIsLoading(true);

      const res = await fetch(`${API}/api/users`,{
        method: 'GET', 
        credentials: 'include',
    }
);
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }

      const { data } = await res.json();
      console.log('data: ', data);
      return data.users;
  };

  useIonViewWillEnter(() => {
    const loadUsers = async () => {
      const users = await getUsers();
      console.log("users VIEW: ", users);
      setUsers(users);
      setIsLoading(false);
    };
    loadUsers();
  });


  return { users, setUsers, getUsers, isLoading };
};
