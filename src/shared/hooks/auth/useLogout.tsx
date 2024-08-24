import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { useIonLoading, useIonRouter } from '@ionic/react';

import { API } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';

export const useLogout = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    await present('Logging out...');

    try {
      const res: HttpResponse = await CapacitorHttp.post({
        url: `${API}/api/auth/logout`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const { data } = await res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      await Preferences.remove({ key: 'user' });
      setAuthUser(null);

      router.push('/signin', 'root');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Logout Error:', error.message);
      } else {
        console.error('Logout Error:', error);
      }
    } finally {
      dismiss();
    }
  };

  return { logout };
};
