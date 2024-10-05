import React, { useEffect, useState } from 'react';

import { IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import {
  calendarClearOutline,
  createOutline,
  maleFemaleOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router';

import { useAuthContext } from '../../shared/context/AuthContext';
import { PROFILE_TAGS } from '../../shared/data/profile-tags';
import { useGetPosts } from '../../shared/hooks/post/useGetPosts';
import { useFollowUnfollow } from '../../shared/hooks/users/useFollowUnfollow';
import { PostCardI, UserItemI } from '../../shared/types';
import { getFormattedDate } from '../../shared/utils';
import { usePostStore } from '../../store/usePostStore';
import { useUserStore } from '../../store/useUserStore';
import Button from '../ui/button/Button';
import UsersList from '../users/UsersList';
import './ProfileCard.css';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import ProfilePosts from './ProfilePosts';
import ProfilePostsSkeleton from './ProfilePostsSkeleton';

const ProfileCard: React.FC<{ userId: string }> = ({ userId }) => {
  const [activeDetails, setActiveDetails] = useState<
    'followers' | 'followings' | 'posts'
  >('posts');
  const { authUser } = useAuthContext();
  const { getPosts } = useGetPosts();
  const { id } = useParams<{ id: string }>();

  // get info for all users
  const users = useUserStore((store) => store.users);

  const userInfo = useUserStore((store) =>
    store.users.find((user) => user._id === userId)
  );

  // If there is no ID in the URL, use authUser._id (own profile)
  const currentProfileId = id || authUser?._id;

  // Check if this is a custom profile
  const isAuthProfile = currentProfileId === authUser?._id;

  const userFollowers =
    userInfo?.followers
      ?.map((f) => users.find((user) => user._id === f))
      ?.filter((user): user is UserItemI => !!user) || []; // filtered if undefined

  const userFollowings =
    userInfo?.followings
      ?.map((f) => users.find((user) => user._id === f))
      ?.filter((user): user is UserItemI => !!user) || []; // filtered if undefined
  const authUserFollowings =
    authUser?.followings
      ?.map((f) => users.find((user) => user._id === f))
      ?.filter((user): user is UserItemI => !!user) || []; // filtered if undefined

  const allPosts = usePostStore((store) => store.posts);
  const isPostLoading = usePostStore((store) => store.isLoading);

  const userPosts =
    userInfo?.posts
      ?.map((post) => allPosts.find((p) => p._id === post))
      .filter((post): post is PostCardI => !!post) || []; // filtered if undefined

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

  const getProfileTagData = (label: string) => {
    switch (label) {
      case 'followings':
        return authUser?._id === userId
          ? authUser?.followings?.length
          : followingsCount;
      case 'followers':
        return userInfo?.followers?.length || followersCount;
      case 'posts':
        return userInfo?.posts?.length || 0;
      default:
        return 0;
    }
  };

  const followings = isAuthProfile ? authUserFollowings : userFollowings;

  useEffect(() => {
    if (!allPosts.length) {
      getPosts();
    }
  }, [allPosts]);

  return (
    <IonContent>
      {userInfo && (
        <>
          {' '}
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
                <p className='text-bold'>{userInfo.fullName}</p>
                <p className='text-xs'>@{userInfo.username}</p>
              </div>
              <div className='mt-1-5'>
                <p>{userInfo.bio || 'Biography is currently missing'}</p>
                <div className='flex-wrap-gap'>
                  <div className='flex-row-center'>
                    <IonIcon
                      icon={maleFemaleOutline}
                      slot='start'
                      className='profile-icon'
                    />
                    <p className='text-xs-md'>{userInfo.gender}</p>
                  </div>
                  {userInfo.birthday && (
                    <div className='flex-row-center'>
                      <IonIcon
                        icon={calendarClearOutline}
                        slot='start'
                        className='profile-icon'
                      />
                      <p className='text-xs-md'>{userInfo.birthday}</p>
                    </div>
                  )}
                  <div className='flex-row-center'>
                    <IonIcon
                      icon={createOutline}
                      slot='start'
                      className='profile-icon'
                    />
                    <p className='text-xs-md'>
                      Joined {getFormattedDate(userInfo.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <IonList className='flex-row-gap list-tags flex-row-center'>
                {PROFILE_TAGS.map(({ id, label }) => (
                  <IonItem
                    key={id}
                    lines='none'
                    className='ion-no-padding tag'
                    color='ion-color-intro-violet'
                    onClick={() => setActiveDetails(label)}
                  >
                    <IonLabel className='stat-module'>
                      <span className='mr-x stat-number'>
                        {getProfileTagData(label)}
                      </span>
                      {label === 'posts' && getProfileTagData(label) === 1
                        ? 'Post'
                        : label.charAt(0).toUpperCase() + label.slice(1)}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </div>
          </div>
          {activeDetails === 'followers' && (
            <UsersList users={userFollowers} variant={'followers'} />
          )}
          {activeDetails === 'followings' && (
            <UsersList
              users={followings}
              variant={'followings'}
              isAuthProfile={isAuthProfile}
            />
          )}
          {activeDetails === 'posts' && (
            <>
              {!isPostLoading && allPosts.length && (
                <ProfilePosts posts={userPosts} />
              )}
              {isPostLoading && !allPosts.length && <ProfilePostsSkeleton />}
            </>
          )}
        </>
      )}
    </IonContent>
  );
};

export default ProfileCard;
