import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';

import './Home.css';

import Chats from '../chats/ChatsPage';

const componentsMap: { [key: string]: React.FC<{ name: string }> } = {
  Chats: Chats,
};

const HomePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const SelectedComponent = componentsMap[name] || (() => <div>Page Not Found</div>);

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar color={name === 'Profile' ? 'secondary' : ''}>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectedComponent name={name} />
      </IonContent>
    </>
  );
};

export default HomePage;
