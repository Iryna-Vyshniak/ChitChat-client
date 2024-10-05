import React from 'react';

import { IonCol, IonGrid, IonRow, IonSkeletonText } from '@ionic/react';

const ProfilePostsSkeleton: React.FC = () => {
  return (
    <IonGrid fixed>
      <IonRow>
        {[...Array(16)].map((_, idx) => (
          <IonCol key={idx} size='12' sizeXs='4'>
            <IonSkeletonText animated={true} className='post-skeleton' />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ProfilePostsSkeleton;
