import { createContext, useContext, useEffect, useState } from 'react';

import { Preferences } from '@capacitor/preferences';

import { AuthContextType, UserI } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<UserI | null>(null);

  useEffect(() => {
    const loadUserFromPreferences = async () => {
      try {
        const storedUser = await Preferences.get({ key: 'user' });
        if (storedUser?.value) {
          setAuthUser(JSON.parse(storedUser.value));
        }
      } catch (error) {
        console.error('Error loading user from preferences:', error);
      }
    };

    loadUserFromPreferences();

    // Clean up
    return () => setAuthUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
