import React from 'react';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { caretBack } from 'ionicons/icons';
import { useParams } from 'react-router';

import PostPopup from '../../components/posts/PostPopup';
import PostSkeleton from '../../components/posts/PostSkeleton';
import { useGetPost } from '../../shared/hooks/post/useGetPost';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { getPost, post, isLoading } = useGetPost();
  useIonViewWillEnter(() => {
    if (id) {
      getPost(id);
    }
  });
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonBackButton
            text='Previous'
            icon={caretBack}
            mode='md'
            defaultHref='/app/Posts'
          ></IonBackButton>
        </IonButtons>
      </IonToolbar>

      <IonContent fullscreen>
        {isLoading && !post && <PostSkeleton />}
        {!isLoading && post && <PostPopup post={post} />}
      </IonContent>
    </IonPage>
  );
};

export default PostDetailPage;
