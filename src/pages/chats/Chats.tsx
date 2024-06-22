import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
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
      <IonSearchbar
        showClearButton='focus'
        clearIcon={trashBin}
        onIonInput={handleInput}
        type='search'
        className='ion-margin-top'
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
    </IonPage>
  );
};

export default Chats;
