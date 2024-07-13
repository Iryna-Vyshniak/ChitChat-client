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
import Profile from '../profile/ProfilePage';
import Posts from '../posts/PostsPage';

const componentsMap: { [key: string]: React.FC<{ name: string }> } = {
  Chats: Chats,
  Profile: Profile,
  Posts: Posts,
};

const HomePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const SelectedComponent = componentsMap[name] || (() => <div>Page Not Found</div>);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle className='ion-text-uppercase'>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectedComponent name={name} />
      </IonContent>
    </>
  );
};

export default HomePage;
