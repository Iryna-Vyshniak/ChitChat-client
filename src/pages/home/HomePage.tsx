import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonNavLink,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useParams } from 'react-router';

import { useGetPosts } from '../../shared/hooks/post/useGetPosts';
import { useGetUsers } from '../../shared/hooks/users/useGetUsers';
import { ComponentProps } from '../../shared/types';
import Chats from '../chats/ChatsPage';
import PopularPostsPage from '../posts/PopularPostsPage';
import PostDetail from '../posts/PostDetailPage';
import Posts from '../posts/PostsPage';
import Profile from '../profile/ProfilePage';
import './Home.css';

const componentsMap: { [key: string]: React.FC<ComponentProps> } = {
  Chats: Chats,
  Profile: Profile,
  Posts: Posts,
  PostDetail: PostDetail,
};

const HomePage: React.FC = () => {
  const { name = 'Posts', id } = useParams<ComponentProps>();
  const { getUsers } = useGetUsers();
  const { getPosts } = useGetPosts();

  useIonViewWillEnter(() => {
    getUsers();
    if (name === 'Posts') {
      getPosts();
    }
  });

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
        {id ? (
          // Якщо сторінка має ID, але це не PostDetail
          <SelectedComponent name={name} id={id} key={`${name}-${id}`} />
        ) : (
          // Якщо сторінка не має ID
          <SelectedComponent name={name} key={name} />
        )}
      </IonContent>
    </>
  );
};

export default HomePage;
