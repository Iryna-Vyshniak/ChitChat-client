import React from 'react';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';

import PostForm from '../../components/posts/PostForm';
import { useCreatePost } from '../../shared/hooks/post/useCreatePost';
import { PostI } from '../../shared/types';

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
