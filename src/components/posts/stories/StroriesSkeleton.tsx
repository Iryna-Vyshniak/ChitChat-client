import { IonAvatar, IonCol, IonRow, IonSkeletonText } from '@ionic/react';
import React from 'react';

const StoriesSkeleton: React.FC = () => {
  return (
    <IonRow className='stories'>
      <div className='stories-container'>
        {[...Array(16)].map((_, idx) => (
          <IonCol key={idx} className='story'>
            <IonAvatar>
              <IonSkeletonText animated={true} />
            </IonAvatar>
            <IonSkeletonText animated={true} style={{ width: '60px' }} />
          </IonCol>
        ))}
      </div>
    </IonRow>
  );
};

export default StoriesSkeleton;
