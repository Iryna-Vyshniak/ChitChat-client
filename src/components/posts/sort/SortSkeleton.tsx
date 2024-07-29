import { IonRow, IonSkeletonText } from '@ionic/react';
import React from 'react';

import './Sort.css';

const SortSkeleton: React.FC = () => {
  return (
    <IonRow className='sorts'>
      <div className='sorts-container'>
        {[...Array(16)].map((_, idx) => (
          <div>
            <IonSkeletonText key={idx} animated={true} className='sort-skeleton' />
          </div>
        ))}
      </div>
    </IonRow>
  );
};

export default SortSkeleton;
