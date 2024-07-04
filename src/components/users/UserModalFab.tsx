import React from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, callSharp, chatbubbleEllipsesOutline } from 'ionicons/icons';

import { UserFabProps } from '../../shared/types';

const UserModalFab: React.FC<UserFabProps> = ({ user }) => {
  const handleCallNumber = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!user?.phone) {
      e.preventDefault();
    }
  };

  return (
    <div className='user-modal-fab'>
      <IonFab slot='fixed' vertical='bottom' horizontal='end' edge>
        <IonFabButton color='secondary' size='small'>
          <IonIcon icon={add} color='light' />
        </IonFabButton>
        <IonFabList side='top'>
          <a
            href={`tel:${user?.phone}`}
            data-desc={user?.phone ? 'Call' : 'No phone'}
            className={
              user?.phone
                ? `custom-fab-button ios fab-button-in-list ion-activatable ion-focusable fab-button-show`
                : 'custom-fab-button disabled'
            }
            onClick={handleCallNumber}
          >
            <IonIcon icon={callSharp} className='custom-icon'></IonIcon>
          </a>
          <IonFabButton
            routerLink={`/messages/send/${user?._id}`}
            routerDirection='forward'
            data-desc='Write message'
          >
            <IonIcon icon={chatbubbleEllipsesOutline} className='custom-icon'></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default UserModalFab;
