import React from 'react';

import { IonCol, IonIcon, IonRouterLink, IonRow } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import { useAuthContext } from '../../../shared/context/AuthContext';
import { UserItemI } from '../../../shared/types';
import { useUserStore } from '../../../store/useUserStore';
import './Stories.css';
import StoriesSkeleton from './StroriesSkeleton';

const Stories: React.FC = () => {
  const filteredUsers = useUserStore((store) => store.filteredUsers);

  const isLoading = !filteredUsers || !filteredUsers.length;
  const { authUser } = useAuthContext();

  return (
    <IonRow className='stories'>
      <div className='stories-container'>
        {authUser && (
          <IonCol>
            <IonRouterLink routerLink={`/app/Profile`} className='own-story'>
              <img alt='story avatar' src={authUser?.avatar} />
              <IonIcon icon={addOutline} className='story-add' />
              <p>Your story</p>
            </IonRouterLink>
          </IonCol>
        )}
        {isLoading && <StoriesSkeleton />}
        {!isLoading &&
          filteredUsers.map((user: UserItemI) => (
            <IonCol key={user._id} className='story'>
              <IonRouterLink
                routerLink={`/app/Profile/${user._id}`}
                className='story'
              >
                <img alt='story avatar' src={user.avatar} />
                <p>{user.username}</p>
              </IonRouterLink>
            </IonCol>
          ))}
      </div>
    </IonRow>
  );
};

export default Stories;
