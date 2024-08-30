import React from 'react';

import { IonContent } from '@ionic/react';

import { useAuthContext } from '../../shared/context/AuthContext';
import ProfileCard from './ProfileCard';
import ProfileFab from './ProfileFab';
import ProfileHero from './ProfileHero';

const ProfileContent: React.FC<{ userId: string }> = ({ userId }) => {
  const { authUser } = useAuthContext();
  return (
    <IonContent>
      <ProfileHero userId={userId} />
      <ProfileCard userId={userId} />
      {authUser?._id === userId && <ProfileFab user={authUser} />}
    </IonContent>
  );
};

export default ProfileContent;
