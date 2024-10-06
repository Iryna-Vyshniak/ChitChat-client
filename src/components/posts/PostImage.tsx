import React, { useRef } from 'react';

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
  const postLikeRef = useRef<HTMLIonIconElement | null>(null);

  const handleLikeAnimation = () => {
    if (postLikeRef.current) {
      postLikeRef.current.style.display = 'block';
      postLikeRef.current.classList.add('fadeOutTopRight');
    }

    setTimeout(() => {
      if (postLikeRef.current) {
        postLikeRef.current.classList.remove('fadeOutTopRight');
        postLikeRef.current.style.display = 'none';
      }
    }, 500);
  };

  return (
    <motion.div layoutId={'image-container' + id}>
      <IonItemOptions side='start'>
        <IonItemOption color='intro-rosy' expandable>
          <button className='btn-action' onClick={handleLikeAnimation}>
            <IonIcon
              ref={postLikeRef}
              className='post-action-animation animated'
              color='danger'
              icon={heart}
            />
            <IonIcon
              className='post-action'
              color={like ? 'danger' : ''}
              icon={like ? heart : heartOutline}
              onClick={handleLikeClick}
            />
          </button>
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
