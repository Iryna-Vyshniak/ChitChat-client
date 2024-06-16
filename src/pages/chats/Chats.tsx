import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import React, { createRef, useEffect, useRef, useState } from 'react';
import UsersSkeleton from '../../components/users/UsersSkeleton';
import {  chevronDownCircleOutline } from 'ionicons/icons';
import { useGetUsers } from '../../shared/hooks/users/useGetUsers';

const Chats: React.FC<{ name: string }> = ( { name } ) => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
    
    const { users, setUsers, getUsers, isLoading } = useGetUsers();
    
    const page = useRef(null);
    
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);


  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getUsers();
    setUsers(data);
    event.detail.complete();
  };


  return (
    <IonPage ref={ page}>
     <IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle>{name}</IonTitle>
					</IonToolbar>
					<IonSearchbar />
				</IonHeader>
     
      <IonContent className='ion-padding' ref={contentRef} color='light'>
      
      <IonRefresher slot="fixed" onIonRefresh={e => handleRefresh(e)}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          />
        </IonRefresher>
        {isLoading && <UsersSkeleton />}
      </IonContent>
    </IonPage>
  );
};

export default Chats;
