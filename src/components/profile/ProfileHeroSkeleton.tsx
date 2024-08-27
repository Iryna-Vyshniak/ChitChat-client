import { IonSkeletonText } from '@ionic/react';

import './ProfileSkeleton.css';

const ProfileHeroSkeleton = () => {
  return (
    <div className='profile-skeleton-container profile-hero-skeleton-container'>
      <div className='hero-skeleton skeleton'>
        <div className='avatar-skeleton-container'>
          <IonSkeletonText
            animated={true}
            className='avatar-skeleton'
          ></IonSkeletonText>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroSkeleton;
