import React from 'react';

import { IonRow, IonSkeletonText } from '@ionic/react';

import './Sort.css';

const SortSkeleton: React.FC = () => {
  return (
    <IonRow className='sorts'>
      <div className='sorts-container'>
        {[...Array(16)].map((_, idx) => (
          <div key={idx}>
            <IonSkeletonText animated={true} className='sort-skeleton' />
          </div>
        ))}
      </div>
    </IonRow>
  );
};

export default SortSkeleton;
