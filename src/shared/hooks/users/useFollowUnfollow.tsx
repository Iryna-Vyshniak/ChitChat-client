import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { useIonToast } from '@ionic/react';

import { useUserStore } from '../../../store/useUserStore';
import { API } from '../../constants';
import { useAuthContext } from '../../context/AuthContext';
import { UserItemI } from '../../types';

export const useFollowUnfollow = (userId: string) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [isFollowingLoading, setIsFollowingLoading] = useState<boolean>(false);
  const userInfo = useUserStore((store) =>
    store.users.find((user) => user._id === userId)
  );
  const setUsers = useUserStore((store) => store.setUsers);
  const [isFollowing, setIsFollowing] = useState<boolean>(
    userInfo?.followers?.includes(authUser?._id || '') ?? false
  );
  const [followersCount, setFollowersCount] = useState<number>(
    userInfo?.followers?.length || 0
  );
  const [showToast] = useIonToast();

  const handleFollowUnfollow = async () => {
    if (!userInfo || !authUser?._id) {
      showToast({
        message: 'User not found or not authenticated',
        duration: 2000,
        color: 'danger',
      });
      return;
    }
    setIsFollowingLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.post({
        url: `${API}/api/users/follow/${userInfo._id}`,
        webFetchExtra: {
          credentials: 'include',
        },
      });

      const data = (await res.data) || {};

      if (data.error) {
        showToast({
          message: data.error,
          duration: 2000,
          color: 'danger',
        });
        console.log(data.error);
        return;
      }

      const updatedFollowers = isFollowing
        ? userInfo.followers?.filter((follower) => follower !== authUser._id) ||
          [] // unfollow
        : [...(userInfo.followers || []), authUser._id]; // follow

      // Update only `followings` for `authUser`, and leave it as it was for other users
      const updatedAuthUserFollowings = isFollowing
        ? authUser.followings?.filter(
            (following) => following !== userInfo._id
          ) || []
        : [...(authUser.followings || []), userInfo._id];

      // update context auth user
      setAuthUser({
        ...authUser,
        followings: updatedAuthUserFollowings,
      });

      // Save the updated authUser to local storage
      await Preferences.set({
        key: 'user',
        value: JSON.stringify({
          ...authUser,
          followings: updatedAuthUserFollowings,
        }),
      });

      // Update the data in the store for a specific user (userInfo)
      const updatedUsers = useUserStore
        .getState()
        .users.map((user: UserItemI) => {
          if (user._id === userId) {
            return { ...user, followers: updatedFollowers };
          }
          return user;
        });

      setUsers(updatedUsers);

      // Update the state of followers and followings
      setIsFollowing(!isFollowing);
      setFollowersCount(updatedFollowers.length);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFollowingLoading(false);
    }
  };

  return {
    handleFollowUnfollow,
    isFollowing,
    setIsFollowing,
    isFollowingLoading,
    followersCount,
    followingsCount: userInfo?.followings?.length || 0,
  };
};
