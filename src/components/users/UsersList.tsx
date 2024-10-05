import React, { useState } from 'react';

import { IonCard, IonContent, IonTitle } from '@ionic/react';

import { UserItemI, UserListProps } from '../../shared/types';
import UserCard from './UserCard';
import UserModal from './UserModal';

const UsersList: React.FC<UserListProps> = ({
  users,
  presentingElement,
  variant,
  isAuthProfile,
  onAction,
}) => {
  const [selectedUser, setSelectedUser] = useState<UserItemI | null>(null);
  return (
    <IonContent className='custom-content ion-padding'>
      {users.length > 0 ? (
        <>
          {users.map((user) => (
            <IonCard
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
              }}
              className='custom-card'
            >
              <UserCard
                user={user}
                variant={variant}
                isAuthProfile={isAuthProfile}
                onAction={onAction}
              />
            </IonCard>
          ))}
          {presentingElement && (
            <UserModal
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              presentingElement={presentingElement}
            />
          )}{' '}
        </>
      ) : (
        <IonTitle>{`Not ${variant} yet`}</IonTitle>
      )}
    </IonContent>
  );
};

export default UsersList;
