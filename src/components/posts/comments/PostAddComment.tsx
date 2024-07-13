import { OverlayEventDetail } from '@ionic/core/components';
import { IonAvatar, IonIcon, useIonModal } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import React, { useRef } from 'react';

import { getFormattedDate } from '../../../shared/utils';

import { useAuthContext } from '../../../shared/context/AuthContext';

import PostModal from '../PostModal';

const PostAddComment: React.FC<{ date: string }> = ({ date }) => {
  const { authUser } = useAuthContext();
  const content = useRef<HTMLDivElement>(null);

  const [present, dismiss] = useIonModal(PostModal, {
    dismiss: (data: string, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          console.log('Confirm add message');
        }
      },
    });
  }

  return (
    <div className='post-add-comment' ref={content}>
      <div className='post-add-comment-profile'>
        <IonAvatar>
          <img alt='add comment avatar' src={authUser!.avatar} width={24} height={24} />
        </IonAvatar>
        <p className='ion-margin-left'>Add a comment...</p>

        <button
          className='post-add-comment-actions btn-open-modal'
          id='comment-modal'
          onClick={() => openModal()}
        >
          <IonIcon icon={addCircleOutline} color='medium' />
        </button>
      </div>

      <div className='post-time'>
        <p>{getFormattedDate(date)}</p>
      </div>
    </div>
  );
};

export default PostAddComment;
