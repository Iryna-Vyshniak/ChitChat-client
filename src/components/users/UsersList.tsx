import React, { useState } from 'react';

import { IonCard, IonContent } from '@ionic/react';

import { UserItemI, UserListProps } from '../../shared/types';
import UserCard from './UserCard';
import UserModal from './UserModal';

const UsersList: React.FC<UserListProps> = ({ users, presentingElement }) => {
  const [selectedUser, setSelectedUser] = useState<UserItemI | null>(null);

  return (
    <IonContent className='custom-content ion-padding'>
      {users.map((user) => (
        <IonCard
          key={user._id}
          onClick={() => {
            setSelectedUser(user);
          }}
          className='custom-card'
        >
          <UserCard user={user} />
        </IonCard>
      ))}
      <UserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        presentingElement={presentingElement}
      />
    </IonContent>
  );
};

export default UsersList;
