import React from 'react';

import { IonPage } from '@ionic/react';

import ProfileContent from '../../components/profile/ProfileContent';
import { useAuthContext } from '../../shared/context/AuthContext';

const ProfilePage: React.FC<{ id?: string }> = ({ id }) => {
  const { authUser } = useAuthContext();
  return (
    <IonPage className='ion-padding' style={{ marginTop: '24px' }}>
      <ProfileContent userId={id || (authUser?._id as string)} />
    </IonPage>
  );
};

export default ProfilePage;
