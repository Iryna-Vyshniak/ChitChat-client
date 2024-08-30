import React, { Dispatch, SetStateAction } from 'react';

import { IonImg, IonRouterLink, IonText } from '@ionic/react';
import { motion } from 'framer-motion';

import { PostCardI } from '../../shared/types';
import { getFormattedDate } from '../../shared/utils';
import './PostCard.css';
import './PostPopup.css';

const PostPopup: React.FC<{
  post: PostCardI;
  closePopup: Dispatch<SetStateAction<PostCardI | undefined>>;
}> = ({
  post: { imageUrl, owner, title, text, createdAt, _id },
  closePopup,
}) => {
  return (
    <motion.div
      layoutId={'card-' + _id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='popup-container'
      onClick={() => closePopup(undefined)}
    >
      <motion.div layoutId={'image-container' + _id}>
        {' '}
        {imageUrl && <IonImg src={imageUrl} />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        animate={{
          opacity: 1,
          transform: 'translateY(0)',
          transitionDuration: '0.5s',
          transitionDelay: '0.15s',
        }}
        className='post-profile'
      >
        <IonRouterLink routerLink={`/app/Profile/${owner._id}`}>
          <p>Author {owner.fullName}</p>
        </IonRouterLink>

        <div className='post-profile-more'>
          <p>{getFormattedDate(createdAt)}</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        animate={{
          opacity: 1,
          transform: 'translateY(0)',
          transitionDuration: '0.5s',
          transitionDelay: '0.15s',
        }}
      >
        {' '}
        <h1>{title}</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        animate={{
          opacity: 1,
          transform: 'translateY(0)',
          transitionDuration: '0.5s',
          transitionDelay: '0.2s',
        }}
      >
        {' '}
        <IonText>
          <p>{text}</p>
        </IonText>
      </motion.div>
    </motion.div>
  );
};

export default PostPopup;
