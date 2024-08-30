import React from 'react';

import { IonImg } from '@ionic/react';

import { useUserStore } from '../../store/useUserStore';
import Avatar from '../avatar/Avatar';
import './ProfileHero.css';
import ProfileHeroSkeleton from './ProfileHeroSkeleton';

interface ProfileHeroProps {
  userId: string;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ userId }) => {
  const userInfo = useUserStore((store) =>
    store.users.find((user) => user._id === userId)
  );
  const isUserInfoLoading = !userInfo && userInfo !== undefined;

  if (isUserInfoLoading && !userInfo) {
    return <ProfileHeroSkeleton />;
  }

  if (!userInfo) {
    // Handle the case where userInfo is still undefined even after loading
    return <div>Error loading user information.</div>;
  }

  const { cover, avatar } = userInfo;

  return (
    <div className='profile-hero'>
      <div className='profile-cover-wrapper'>
        {cover && (
          <IonImg src={cover} alt='Cover Image' className='profile-cover' />
        )}
      </div>

      <div className='avatar-position'>
        <Avatar avatar={avatar} isLarge hasBorder />
      </div>
    </div>
  );
};

export default ProfileHero;
