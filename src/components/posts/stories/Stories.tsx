import React from 'react';

import { IonCol, IonIcon, IonRouterLink, IonRow } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

import { useAuthContext } from '../../../shared/context/AuthContext';
import { useGetUsers } from '../../../shared/hooks/users/useGetUsers';
import './Stories.css';
import StoriesSkeleton from './StroriesSkeleton';

const Stories: React.FC = () => {
  const { users, isLoading } = useGetUsers();
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
          users.map((story) => (
            <IonCol key={story._id} className='story'>
              <IonRouterLink
                routerLink={`/app/profile/${story._id}`}
                className='story'
              >
                <img alt='story avatar' src={story.avatar} />
                <p>{story.username}</p>
              </IonRouterLink>
            </IonCol>
          ))}
      </div>
    </IonRow>
  );
};

export default Stories;
