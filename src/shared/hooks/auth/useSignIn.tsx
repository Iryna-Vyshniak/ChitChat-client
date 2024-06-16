import { useIonLoading, useIonRouter } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constants';
import { SigninI } from '../../types';

export const useSignIn = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const { setAuthUser } = useAuthContext();

  const signin = async ({ email, password }: SigninI): Promise<void> => {
    
    await present('Logg in...');

    try {
      const res = await fetch(`${API}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { data } = await res.json();
      console.log('data: ', data);

      if (data.error || data.message) {
        throw new Error(data.error || data.message);
      }

      await Preferences.set({ key: 'user', value: JSON.stringify(data.user) });
      setAuthUser(data.user);
      router.push('/app', 'root');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signin Error:', error.message);
      } else {
        console.error('Signin Error:', error);
      }
    } finally {
      dismiss();
    }
  };

  return { signin };
};
