import React from 'react';

import { IonIcon, IonItemOption, IonItemOptions } from '@ionic/react';
import { motion } from 'framer-motion';
import { downloadOutline, heart, heartOutline } from 'ionicons/icons';

import { downloadImage, downloadImagePost } from '../../shared/utils';

const PostImage: React.FC<{
  id: string;
  image: string | null;
  like: boolean;
  handleLikeClick: () => void;
  openPopup: () => void;
}> = ({ id, image, like, handleLikeClick, openPopup }) => {
  const downloadPostImage = downloadImage(image!);

  return (
    <motion.div layoutId={'image-container' + id}>
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
        role='button'
        tabIndex={0}
        className='post-image'
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center, center',
          backgroundSize: 'cover',
          backgroundColor: 'var(--ion-color-step-650)',
        }}
        onClick={openPopup}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openPopup();
          }
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
    </motion.div>
  );
};

export default PostImage;
