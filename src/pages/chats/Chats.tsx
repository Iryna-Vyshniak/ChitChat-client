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
import React, { createRef, useEffect, useRef, useState } from 'react';
import { chevronDownCircleOutline, trashBin } from 'ionicons/icons';

import UsersList from '../../components/users/UsersList';
import UsersSkeleton from '../../components/users/UsersSkeleton';

import { useGetUsers } from '../../shared/hooks/users/useGetUsers';
import { UserItemI } from '../../shared/types';

const Chats: React.FC<{ name: string }> = ({ name }) => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<any>('contacts');

  const { users, setUsers, getUsers, isLoading } = useGetUsers();

  let [results, setResults] = useState<UserItemI[]>([]);

  const page = useRef(null);

  useEffect(() => {
    setResults(users);
  }, [users]);

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(users.filter((d) => d.fullName.toLowerCase().indexOf(query) > -1));
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getUsers();
    setUsers(data);
    event.detail.complete();
  };

  return (
    <IonPage ref={page} className='ion-padding'>
      <div style={{ marginTop: '24px' }}>
        <IonSegment
          value={activeSegment}
          onIonChange={(e) => setActiveSegment(e.detail.value!)}
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
            {!isLoading && <UsersList users={results} presentingElement={presentingElement} />}
          </IonContent>
        </>
      )}
      {activeSegment === 'groups' && <p>Groups</p>}
    </IonPage>
  );
};

export default Chats;
