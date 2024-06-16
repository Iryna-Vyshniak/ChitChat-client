import { useIonLoading, useIonRouter } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constants';
import { SignupI } from '../../types';

export const useSignUp = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, email, password, confirmPassword, gender }: SignupI): Promise<void> => {

    await present('Sign up...');

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { data } = await res.json();

      if (data.error || data.message) {
        throw new Error(data.error || data.message);
      }

      await Preferences.set({ key: 'user', value: JSON.stringify(data.user) });
      setAuthUser(data.user);
      router.push('/app', 'root');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Signup Error:', error.message);
          } else {
            console.error('Signup Error:', error);
          }
    } finally {
      dismiss();
    }
  };

  return { signup };
};

