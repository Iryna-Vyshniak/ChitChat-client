import { IonCol, IonRow, IonSkeletonText, IonThumbnail } from '@ionic/react';
import React from 'react';

const StoriesSkeleton: React.FC = () => {
  return (
    <IonRow className='stories stories-skeleton'>
      <div className='stories-container'>
        {[...Array(16)].map((_, idx) => (
          <IonCol key={idx} className='story'>
            <IonThumbnail>
              <IonSkeletonText animated={true} />
            </IonThumbnail>
            <IonSkeletonText animated={true} style={{ width: '60px' }} />
          </IonCol>
        ))}
      </div>
    </IonRow>
  );
};

export default StoriesSkeleton;
