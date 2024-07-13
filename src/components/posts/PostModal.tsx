import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';

import PostFormComment from './comments/PostFormComment';

import { PostModalProps } from '../../shared/types';

import './PostModal.css';

const PostModal: React.FC<PostModalProps> = ({ dismiss }) => {
  const handleConfirmModal = () => {
    dismiss('confirm');
  };

  const handleDismissModal = () => {
    dismiss(null, 'cancel');
  };

  return (
    <IonPage id='comment-modal'>
      <IonHeader>
        <IonToolbar color={'secondary'}>
          <IonButtons slot='start'>
            <IonButton onClick={handleConfirmModal} strong={true}>
              Confirm
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton onClick={handleDismissModal}>
              <IonIcon icon={closeOutline} slot='end' className='custom-icon' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='flex-center-col ion-padding'>
        <PostFormComment />
      </IonContent>
    </IonPage>
  );
};

export default PostModal;
