import React, { useEffect } from 'react';

import { IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import {
  calendarClearOutline,
  createOutline,
  maleFemaleOutline,
} from 'ionicons/icons';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../shared/context/AuthContext';
import { PROFILE_TAGS } from '../../shared/data/profile-tags';
import { useFollowUnfollow } from '../../shared/hooks/users/useFollowUnfollow';
import { getFormattedDate } from '../../shared/utils';
import { useUserStore } from '../../store/useUserStore';
import Button from '../ui/button/Button';
import './ProfileCard.css';
import ProfileCardSkeleton from './ProfileCardSkeleton';

const ProfileCard: React.FC<{ userId: string }> = ({ userId }) => {
  const { authUser } = useAuthContext();
  // get info for all users
  const userInfo = useUserStore((store) =>
    store.users.find((user) => user._id === userId)
  );
  const {
    handleFollowUnfollow,
    isFollowing,
    setIsFollowing,
    isFollowingLoading,
    followersCount,
    followingsCount,
  } = useFollowUnfollow(userId);

  const isUserInfoLoading = !userInfo && userInfo !== undefined;

  useEffect(() => {
    if (userInfo) {
      const isFollowing =
        userInfo?.followers?.includes(authUser?._id || '') ?? false;
      setIsFollowing(isFollowing);
    }
  }, [userInfo, authUser, setIsFollowing]);

  if (isUserInfoLoading && !userInfo) {
    return <ProfileCardSkeleton />;
  }

  if (!userInfo) {
    // Handle the case where userInfo is still undefined even after loading
    return <div>Error loading user information.</div>;
  }

  const { _id, fullName, username, bio, gender, birthday, createdAt, posts } =
    userInfo;

  const getProfileTagData = (label: string) => {
    switch (label) {
      case 'followings':
        return authUser?._id === userId
          ? authUser?.followings?.length
          : followingsCount;
      case 'followers':
        return followersCount;
      case 'posts':
        return posts?.length || 0;
      default:
        return 0;
    }
  };

  return (
    <IonContent>
      <div className='container'>
        <div className='flex-end'>
          {authUser?._id === userId ? (
            <Button variant='outline' rounded label='Edit Profile' />
          ) : (
            <Button
              variant='secondary'
              rounded
              label={isFollowing ? 'Unfollow' : 'Follow'}
              onClick={handleFollowUnfollow}
              disabled={isFollowingLoading}
            />
          )}
        </div>
        <div className='mt-container'>
          <div className='flex-col'>
            <p className='text-bold'>{fullName}</p>
            <p className='text-xs'>@{username}</p>
          </div>
          <div className='mt-1-5'>
            <p>{bio || 'Biography is currently missing'}</p>
            <div className='flex-wrap-gap'>
              <div className='flex-row-center'>
                <IonIcon
                  icon={maleFemaleOutline}
                  slot='start'
                  className='profile-icon'
                />
                <p className='text-xs-md'>{gender}</p>
              </div>
              {birthday && (
                <div className='flex-row-center'>
                  <IonIcon
                    icon={calendarClearOutline}
                    slot='start'
                    className='profile-icon'
                  />
                  <p className='text-xs-md'>{birthday}</p>
                </div>
              )}
              <div className='flex-row-center'>
                <IonIcon
                  icon={createOutline}
                  slot='start'
                  className='profile-icon'
                />
                <p className='text-xs-md'>
                  Joined {getFormattedDate(createdAt)}
                </p>
              </div>
            </div>
          </div>
          <IonList className='flex-row-gap list-tags'>
            {PROFILE_TAGS.map(({ id, label }) => (
              <IonItem
                key={id}
                lines='none'
                className='ion-no-padding tag'
                color='ion-color-intro-violet'
              >
                <Link
                  to={`/Profile/${label}/${_id}`}
                  className='link flex-row-center'
                >
                  <IonLabel className='stat-module'>
                    <span className='mr-x stat-number'>
                      {getProfileTagData(label)}
                    </span>
                    {label === 'posts' && getProfileTagData(label) === 1
                      ? 'Post'
                      : label.charAt(0).toUpperCase() + label.slice(1)}
                  </IonLabel>
                </Link>
              </IonItem>
            ))}
          </IonList>
        </div>
      </div>
    </IonContent>
  );
};

export default ProfileCard;
