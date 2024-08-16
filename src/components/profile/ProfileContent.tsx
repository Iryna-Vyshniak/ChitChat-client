import React from 'react';

import { IonContent } from '@ionic/react';

import { useAuthContext } from '../../shared/context/AuthContext';
import ProfileCard from './ProfileCard';
import ProfileFab from './ProfileFab';

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
