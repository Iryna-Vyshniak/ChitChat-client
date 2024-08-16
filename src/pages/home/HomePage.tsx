import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonNavLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';

import Chats from '../chats/ChatsPage';
import PopularPostsPage from '../posts/PopularPostsPage';
import Posts from '../posts/PostsPage';
import Profile from '../profile/ProfilePage';
import './Home.css';

const componentsMap: { [key: string]: React.FC<{ name: string }> } = {
  Chats: Chats,
  Profile: Profile,
  Posts: Posts,
};

const HomePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const SelectedComponent =
    componentsMap[name] || (() => <div>Page Not Found</div>);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='ion-margin-bottom'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            {name === 'Posts' ? (
              <IonNavLink
                routerDirection='forward'
                component={PopularPostsPage}
              >
                <IonTitle className='ion-text-uppercase'>{name}</IonTitle>
              </IonNavLink>
            ) : (
              <IonTitle className='ion-text-uppercase'>{name}</IonTitle>
            )}
          </IonToolbar>
        </IonHeader>
        <SelectedComponent name={name} key={name} />
      </IonContent>
    </>
  );
};

export default HomePage;
