import { useIonLoading, useIonRouter } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';

import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constants';

export const useLogout = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    await present('Logg out...');

    try {
      const res = await fetch(`${API}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const { data } = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      await Preferences.remove({ key: 'user' });
      setAuthUser(null);
      router.push('/signin', 'root');
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

  return { logout };
};
