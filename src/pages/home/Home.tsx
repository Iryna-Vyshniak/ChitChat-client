import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { useParams } from 'react-router';
import Chats from '../chats/Chats';

const componentsMap: { [key: string]: React.FC<{ name: string }> } = {
  Chats: Chats,
};

const Home: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const SelectedComponent = componentsMap[name] || (() => <div>Page Not Found</div>);

  return (
    <>
      <IonHeader>
        <IonToolbar>
              <IonButtons slot='start'>
                <IonMenuButton />
              </IonButtons>
              <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectedComponent name={name} />
      </IonContent>
    </>
  );
};

export default Home;
