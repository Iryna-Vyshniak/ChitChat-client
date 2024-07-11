import React from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, newspaperOutline } from 'ionicons/icons';

const PostsFab: React.FC = () => {
  return (
    <div className='user-group-fab'>
      <IonFab slot='fixed' vertical='bottom' horizontal='end' edge>
        <IonFabButton color='secondary' size='small'>
          <IonIcon icon={add} color='light' />
        </IonFabButton>
        <IonFabList side='top'>
          <IonFabButton
            routerLink={`/app/Posts/create`}
            routerDirection='forward'
            data-desc='Upload Post'
          >
            <IonIcon icon={newspaperOutline} className='custom-icon'></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default PostsFab;
