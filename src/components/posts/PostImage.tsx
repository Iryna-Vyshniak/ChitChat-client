import React from 'react';

import { IonIcon, IonItemOption, IonItemOptions } from '@ionic/react';
import { downloadOutline, heart, heartOutline } from 'ionicons/icons';

import { downloadImage, downloadImagePost } from '../../shared/utils';

const PostImage: React.FC<{
  image: string | null;
  like: boolean;
  handleLikeClick: () => void;
}> = ({ image, like, handleLikeClick }) => {
  const downloadPostImage = downloadImage(image!);

  return (
    <>
      <IonItemOptions side='start'>
        <IonItemOption color='intro-rosy' expandable onClick={handleLikeClick}>
          <IonIcon
            slot='icon-only'
            color={!like ? '' : 'danger'}
            icon={!like ? heartOutline : heart}
          />
        </IonItemOption>
      </IonItemOptions>
      <div
        className='post-image'
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center, center',
          backgroundSize: 'cover',
          backgroundColor: 'var(--ion-color-step-650)',
        }}
      ></div>
      <IonItemOptions side='end'>
        <IonItemOption
          color='intro-violet'
          expandable
          onClick={() => downloadImagePost(downloadPostImage)}
          target='_blank'
          rel='noopener noreferrer'
        >
          <IonIcon
            slot='icon-only'
            icon={downloadOutline}
            className='custom'
          ></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </>
  );
};

export default PostImage;
