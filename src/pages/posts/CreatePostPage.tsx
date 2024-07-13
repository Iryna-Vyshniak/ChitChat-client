import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import PostForm from '../../components/posts/PostForm';
import { PostI } from '../../shared/types';
import { useCreatePost } from '../../shared/hooks/post/useCreatePost';

const CreatePostPage: React.FC = () => {
  const { createPost } = useCreatePost();

  const onSubmit = async (values: PostI): Promise<void> => {
    await createPost(values);
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border' translucent={true}>
        <IonToolbar color={'secondary'}>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/posts' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <PostForm onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default CreatePostPage;
