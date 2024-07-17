import React from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, document } from 'ionicons/icons';

const UserGroupFab: React.FC = () => {
  return (
    <div className='user-group-fab'>
      <IonFab slot='fixed' vertical='bottom' horizontal='end' edge>
        <IonFabButton color='secondary' size='small' title='add'>
          <IonIcon icon={add} color='light' />
        </IonFabButton>
        <IonFabList side='top'>
          <IonFabButton
            routerLink='/groups/create'
            routerDirection='forward'
            data-desc='Create Group'
            title='Create Group'
          >
            <IonIcon icon={document} className='custom-icon'></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default UserGroupFab;
