import { IonContent } from '@ionic/react';
import React from 'react';

import ProfileFab from './ProfileFab';
import ProfileCard from './ProfileCard';

import { useAuthContext } from '../../shared/context/AuthContext';

const ProfileContent: React.FC = () => {
  const { authUser } = useAuthContext();
  return (
    <IonContent>
      <ProfileCard />
      <ProfileFab user={authUser} />
    </IonContent>
  );
};

export default ProfileContent;
