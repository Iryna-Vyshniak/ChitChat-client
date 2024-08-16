import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import { PostCommentsModalProps } from '../../../shared/types';
import PostComment from '../comments/PostComment';

const PostCommentsModal: React.FC<PostCommentsModalProps> = ({
  presentingElement,
  modalAllComments,
}) => {
  function dismiss() {
    modalAllComments.current?.dismiss();
  }

  return (
    <IonModal ref={modalAllComments} presentingElement={presentingElement!}>
      <IonContent>
        <IonToolbar>
          <IonTitle>All comments to post</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => dismiss()}>
              <IonIcon icon={closeOutline} slot='end' className='custom-icon' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <ul className='ion-padding ion-margin'>
          <PostComment />
        </ul>
      </IonContent>
    </IonModal>
  );
};

export default PostCommentsModal;
