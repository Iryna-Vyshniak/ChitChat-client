import React from 'react';

import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, person } from 'ionicons/icons';

import { UserI } from '../../shared/types';

const ProfileFab: React.FC<{ user: UserI | null }> = ({ user }) => {
  return (
    <div className='user-group-fab'>
      <IonFab slot='fixed' vertical='bottom' horizontal='end' edge>
        <IonFabButton color='secondary' size='small' title='add'>
          <IonIcon icon={add} color='light' />
        </IonFabButton>
        <IonFabList side='top'>
          <IonFabButton
            routerLink={`/auth/update/${user?._id}`}
            routerDirection='forward'
            data-desc='Update Profile'
            title='Update Profile'
          >
            <IonIcon icon={person} className='custom-icon'></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default ProfileFab;
