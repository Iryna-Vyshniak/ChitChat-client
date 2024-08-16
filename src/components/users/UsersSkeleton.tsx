import React from 'react';

import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from '@ionic/react';

const UsersSkeleton: React.FC = () => {
  return (
    <IonContent className='custom-content ion-padding'>
      {[...Array(16)].map((_, idx) => (
        <IonCard key={idx} className='custom-card'>
          <IonCardContent className='ion-no-padding'>
            <IonItem lines='none'>
              <IonAvatar>
                <IonSkeletonText animated={true} />
              </IonAvatar>
              <IonLabel className='ion-margin-start'>
                <IonSkeletonText animated style={{ width: '150px' }} />
                <IonSkeletonText style={{ width: '300px' }} />
              </IonLabel>
              <IonChip slot='end' color={'secondary'}></IonChip>
            </IonItem>
          </IonCardContent>
        </IonCard>
      ))}
    </IonContent>
  );
};

export default UsersSkeleton;
