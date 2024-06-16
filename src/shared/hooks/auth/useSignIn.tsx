import { useIonLoading, useIonRouter, useIonToast } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constants';
import { SigninI } from '../../types';

export const useSignIn = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [showToast] = useIonToast();
  const { setAuthUser } = useAuthContext();

  const signin = async ({ email, password }: SigninI): Promise<void> => {

    await present('Logg in...');

    try {
      const res = await fetch(`${API}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || res.statusText);
      }

      const { data } = responseData;

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

  return { signin };
};
