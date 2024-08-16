import React, { useEffect, useRef, useState } from 'react';

import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItemSliding,
  IonLabel,
  IonRouterLink,
} from '@ionic/react';
import {
  bookmarkOutline,
  chatbubbleOutline,
  ellipsisVertical,
  heart,
  heartOutline,
  paperPlaneOutline,
  statsChartSharp,
} from 'ionicons/icons';

import { PostCardI } from '../../shared/types';
import PostAddComment from './comments/PostAddComment';
import PostComments from './comments/PostComments';
import PostCommentsModal from './modals/PostCommentsModal';
import './PostCard.css';
import PostImage from './PostImage';

const PostCard: React.FC<{ post: PostCardI }> = ({
  post: { imageUrl, owner, title, viewsCount, createdAt },
}) => {
  const [like, setLike] = useState<boolean>(false);
  const content = useRef(null);
  const modalAllComments = useRef<HTMLIonModalElement | null>(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(content.current);
  }, []);

  const handleLikeClick = () => {
    setLike(!like);
  };

  const openModal = () => {
    if (modalAllComments.current) {
      modalAllComments.current.present();
    }
  };

  return (
    <>
      <IonCard className='post-container ion-padding custom-card' ref={content}>
        <IonItemSliding>
          <IonCardContent className='post-inner-container ion-no-padding'>
            <div className='post-profile'>
              <div className='post-profile-info'>
                <IonRouterLink routerLink={`/profile/${owner._id}`}>
                  <IonAvatar>
                    <img
                      alt='post avatar'
                      src={owner.avatar}
                      width={44}
                      height={44}
                    />
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
            <PostImage
              image={imageUrl}
              like={like}
              handleLikeClick={handleLikeClick}
            />

            <div className='post-actions-container'>
              <div className='post-actions'>
                <button className='btn-action'>
                  {' '}
                  <IonIcon
                    className='animate__animated'
                    color={!like ? '' : 'danger'}
                    icon={!like ? heartOutline : heart}
                    onClick={handleLikeClick}
                  />
                </button>

                <button className='btn-action' onClick={openModal}>
                  <IonIcon icon={chatbubbleOutline} />
                </button>

                <button className='btn-action'>
                  <IonIcon icon={paperPlaneOutline} />
                </button>
              </div>

              <div className='post-stats'>
                <IonIcon icon={statsChartSharp} />
                <IonLabel>{viewsCount}</IonLabel>
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
                  <IonRouterLink routerLink={`/profile/${owner._id}`}>
                    {owner.fullName}
                  </IonRouterLink>
                </span>{' '}
                {title}
              </p>

              <PostComments />

              <PostAddComment date={createdAt} />
            </div>
          </IonCardContent>
        </IonItemSliding>
      </IonCard>

      <PostCommentsModal
        presentingElement={presentingElement}
        modalAllComments={modalAllComments}
      />
    </>
  );
};

export default PostCard;
