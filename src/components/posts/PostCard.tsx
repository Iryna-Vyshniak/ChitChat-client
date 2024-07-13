import React, { useEffect, useRef, useState } from 'react';
import { IonAvatar, IonIcon, IonRouterLink, useIonActionSheet } from '@ionic/react';
import {
  ellipsisVertical,
  heart,
  chatbubbleOutline,
  paperPlaneOutline,
  bookmarkOutline,
} from 'ionicons/icons';

import './PostCard.css';

import { PostCardI } from '../../shared/types';

import PostComments from './comments/PostComments';
import PostAddComment from './comments/PostAddComment';

const PostCard: React.FC<{ post: PostCardI }> = ({
  post: { _id, imageUrl, likedBy, owner, tags, text, title, viewsCount, createdAt },
}) => {
  return (
    <div className='post-container ion-padding'>
      <div className='post-inner-container'>
        <div className='post-profile'>
          <div className='post-profile-info'>
            <IonRouterLink routerLink={`/profile/${owner._id}`}>
              <IonAvatar>
                <img alt='post avatar' src={owner.avatar} width={44} height={44} />
              </IonAvatar>
            </IonRouterLink>

            <IonRouterLink routerLink={`/profile/${owner._id}`}>
              <p>{owner.fullName}</p>
            </IonRouterLink>
          </div>

          <div className='post-profile-more'>
            <IonIcon icon={ellipsisVertical} />
          </div>
        </div>

        <div
          className='post-image'
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: 'center, center',
            backgroundSize: 'cover',
            backgroundColor: 'var(--ion-color-step-650)',
          }}
        >
          <IonIcon
            className='animated__animated animate__heartBeat post-image-like'
            icon={heart}
            color='light'
          />
        </div>

        <div className='post-actions-container'>
          <div className='post-actions'>
            <IonIcon
              className='animate__animated'
              color={'danger'}
              icon={heart}
              onClick={(e) => {}}
            />
            <IonIcon icon={chatbubbleOutline} />
            <IonIcon icon={paperPlaneOutline} />
          </div>

          <div className='post-bookmark'>
            <IonIcon icon={bookmarkOutline} />
          </div>
        </div>

        <div className='post-likes-container'>
          <p>
            Liked by <span className='post-liked-name'>Dillan</span> and{' '}
            <span className='post-liked-name'>2 others</span>
          </p>
        </div>

        <div className='post-title'>
          <p>
            <span className='post-name'>
              <IonRouterLink routerLink={`/profile/${owner._id}`}>{owner.fullName}</IonRouterLink>
            </span>{' '}
            {title}
          </p>

          <PostComments />

          <PostAddComment date={createdAt} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
