import React, { createRef, useEffect, useRef, useState } from 'react';

import {
  IonContent,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  RefresherEventDetail,
} from '@ionic/react';
import { chevronDownCircleOutline, trashBin } from 'ionicons/icons';
import { useParams } from 'react-router';

import UserGroupFab from '../../components/users/UserGroupFab';
import UsersList from '../../components/users/UsersList';
import UsersSkeleton from '../../components/users/UsersSkeleton';
import { useAuthContext } from '../../shared/context/AuthContext';
import { useGetUsers } from '../../shared/hooks/users/useGetUsers';
import { UserItemI } from '../../shared/types';
import { useUserStore } from '../../store/useUserStore';

const ChatsPage: React.FC<{ name: string }> = ({ name }) => {
  console.log('name: ', name);
  const contentRef = createRef<HTMLIonContentElement>();
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<'contacts' | 'groups'>(
    'contacts'
  );
  const { id } = useParams<{ id: string }>();
  const { authUser } = useAuthContext();

  const { getUsers, isLoading } = useGetUsers();

  const users = useUserStore((store) => store.filteredUsers);
  const [results, setResults] = useState<UserItemI[]>([]);

  const page = useRef(null);

  // If there is no ID in the URL, use authUser._id (own profile)
  const currentProfileId = id || authUser?._id;

  // Check if this is a custom profile
  const isAuthProfile = currentProfileId === authUser?._id;

  useEffect(() => {
    setResults(users);
  }, [users]);

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      users.filter((d) => d.fullName.toLowerCase().indexOf(query) > -1)
    );
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await getUsers();
    event.detail.complete();
  };

  return (
    <IonPage ref={page} className='ion-padding'>
      <div style={{ marginTop: '24px' }}>
        <IonSegment
          value={activeSegment}
          onIonChange={(e) =>
            setActiveSegment(e.detail.value! as 'contacts' | 'groups')
          }
          class='ion-color-custom-segment'
        >
          <IonSegmentButton value='contacts'>
            <IonLabel>Contacts</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='groups'>
            <IonLabel>Groups</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      {activeSegment === 'contacts' && (
        <>
          <IonSearchbar
            showClearButton='focus'
            clearIcon={trashBin}
            onIonInput={handleInput}
            type='search'
          />

          <IonContent className='ion-padding' ref={contentRef}>
            <IonRefresher slot='fixed' onIonRefresh={(e) => handleRefresh(e)}>
              <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText='Pull to refresh'
                refreshingSpinner='circles'
              />
            </IonRefresher>
            {isLoading && <UsersSkeleton />}
            {!isLoading && (
              <UsersList
                users={results}
                variant='chat'
                presentingElement={presentingElement}
                isAuthProfile={isAuthProfile}
              />
            )}
          </IonContent>
        </>
      )}
      {activeSegment === 'groups' && (
        <div>
          <p>Groups</p>
          <UserGroupFab />
        </div>
      )}
    </IonPage>
  );
};

export default ChatsPage;
