import { IonAvatar, IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import React from 'react';

const PostComment: React.FC = () => {
  return (
    <li className='post-user-comment'>
      <div className='post-comment-profile'>
        <IonAvatar>
          <img
            alt='comment user avatar'
            src={
              'https://res.cloudinary.com/dkqxaid79/image/upload/v1711450156/rewievs/female-emoji.png'
            }
            width={24}
            height={24}
          />
        </IonAvatar>
        <p className='ion-margin-left'>Test comment...</p>
      </div>

      <div className='post-time post-comment-actions'>
        <IonIcon icon={heartOutline} />

        <p>07.07.2024</p>
      </div>
    </li>
  );
};

export default PostComment;
