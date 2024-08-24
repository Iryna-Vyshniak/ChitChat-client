import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { useIonLoading, useIonRouter, useIonToast } from '@ionic/react';

import { API } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';
import { SignupI } from '../../types';

export const useSignUp = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const { setAuthUser } = useAuthContext();
  const [showToast] = useIonToast();

  const signup = async ({
    fullName,
    username,
    email,
    password,
    confirmPassword,
    gender,
  }: SignupI): Promise<void> => {
    await present('Sign up...');

    try {
      const res: HttpResponse = await CapacitorHttp.post({
        url: `${API}/api/auth/signup`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword,
          gender,
        }),
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = res.data;
      console.log('data: ', data);

      await Preferences.set({ key: 'user', value: JSON.stringify(data.user) });
      setAuthUser(data.user);

      router.push('/app', 'root');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup Error:', error.message);
        showToast({
          message: error.message,
          duration: 2000,
          color: 'danger',
        });
      } else {
        console.error('Signup Error:', 'An unexpected error occurred');
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

  return { signup };
};
