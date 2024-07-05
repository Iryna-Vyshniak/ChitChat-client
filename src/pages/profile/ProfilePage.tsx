import React from 'react';
import { IonPage } from '@ionic/react';

import ProfileContent from '../../components/profile/ProfileContent';

const ProfilePage: React.FC<{ name: string }> = ({ name }) => {
  return (
    <IonPage className='ion-padding' style={{ marginTop: '24px' }}>
      <ProfileContent />
    </IonPage>
  );
};

export default ProfilePage;
