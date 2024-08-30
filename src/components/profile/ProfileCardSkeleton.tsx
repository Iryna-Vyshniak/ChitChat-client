import { IonSkeletonText } from '@ionic/react';

import './ProfileSkeleton.css';

const ProfileCardSkeleton = () => {
  return (
    <div className='profile-skeleton-container'>
      <div className='profile-card-skeleton'>
        <div className='action-wrapper'>
          <IonSkeletonText
            animated={true}
            className='action-skeleton'
          ></IonSkeletonText>
        </div>
        <IonSkeletonText
          animated={true}
          className='name-skeleton'
        ></IonSkeletonText>
        <IonSkeletonText
          animated={true}
          className='bio-skeleton'
        ></IonSkeletonText>
        <IonSkeletonText
          animated={true}
          className='bio-skeleton'
        ></IonSkeletonText>
        <IonSkeletonText
          animated={true}
          className='text-skeleton'
        ></IonSkeletonText>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
