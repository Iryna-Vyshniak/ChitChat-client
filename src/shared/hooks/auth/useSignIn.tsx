import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { useIonLoading, useIonRouter, useIonToast } from '@ionic/react';

import { API } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';
import { SigninI } from '../../types';

export const useSignIn = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [showToast] = useIonToast();
  const { setAuthUser } = useAuthContext();

  const signin = async ({ email, password }: SigninI): Promise<void> => {
    await present('Logg in...');

    try {
      const res: HttpResponse = await CapacitorHttp.post({
        url: `${API}/api/auth/signin`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ email, password }),
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = res.data;

      await Preferences.set({ key: 'user', value: JSON.stringify(data.user) });
      setAuthUser(data.user);
      router.push('/app', 'root');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signin Error:', error.message);
        showToast({
          message: error.message,
          duration: 2000,
          color: 'danger',
        });
      } else {
        console.error('Signin Error:', 'An unexpected error occurred');
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

  return { signin };
};
