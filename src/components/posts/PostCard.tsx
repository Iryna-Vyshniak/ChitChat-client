import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  arrowRedoOutline,
  bookmarkOutline,
  chatbubbleOutline,
  ellipsisVertical,
  heart,
  heartOutline,
  statsChartSharp,
} from 'ionicons/icons';

import { PostCardI } from '../../shared/types';
import PostAddComment from './comments/PostAddComment';
import PostComments from './comments/PostComments';
import PostCommentsModal from './modals/PostCommentsModal';
import './PostCard.css';
import PostImage from './PostImage';

const PostCard: React.FC<{
  post: PostCardI;
  selectPost: Dispatch<SetStateAction<PostCardI | undefined>>;
}> = ({ post, selectPost }) => {
  const [like, setLike] = useState<boolean>(false);
  const content = useRef(null);
  const modalAllComments = useRef<HTMLIonModalElement | null>(null);
  const postLikeRef = useRef<HTMLIonIconElement | null>(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(content.current);
  }, []);

  const handleLikeClick = () => {
    setLike(!like);
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

  const { imageUrl, owner, title, viewsCount, createdAt, _id } = post;

  const openModal = () => {
    if (modalAllComments.current) {
      modalAllComments.current.present();
    }
  };

  return (
    <>
      <IonCard className='ion-no-padding post-container' ref={content} id={_id}>
        <div className='ion-padding'>
          {' '}
          <IonItemSliding>
            <IonCardContent className='post-inner-container ion-no-padding'>
              <div className='post-profile'>
                <div className='post-profile-info'>
                  <IonRouterLink routerLink={`/app/Profile/${owner._id}`}>
                    <IonAvatar>
                      <img
                        alt='post avatar'
                        src={owner.avatar}
                        width={44}
                        height={44}
                      />
                    </IonAvatar>
                  </IonRouterLink>

                  <IonRouterLink routerLink={`/app/Profile/${owner._id}`}>
                    <p>{owner.fullName}</p>
                  </IonRouterLink>
                </div>

                <div className='post-profile-more'>
                  <IonIcon icon={ellipsisVertical} />
                </div>
              </div>
              <PostImage
                id={_id}
                image={imageUrl}
                like={like}
                handleLikeClick={handleLikeClick}
                openPopup={() => selectPost(post)}
              />
              <div className='title-container'>
                {' '}
                <div className='post-actions-container'>
                  <div className='post-actions'>
                    <button className='btn-action'>
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

                    <button className='btn-action' onClick={openModal}>
                      <IonIcon icon={chatbubbleOutline} />
                    </button>

                    <button className='btn-action'>
                      <IonIcon
                        className='post-action'
                        size='medium'
                        icon={arrowRedoOutline}
                      />
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
                  <IonRouterLink
                    routerLink={`/app/Posts/${_id}`}
                    className='ion-padding'
                  >
                    <p>
                      <span className='post-name'>{owner.fullName}</span>{' '}
                      {title}
                    </p>
                  </IonRouterLink>
                  <PostComments />

                  <PostAddComment date={createdAt} />
                </div>
              </div>
            </IonCardContent>
          </IonItemSliding>
        </div>
      </IonCard>

      <PostCommentsModal
        presentingElement={presentingElement}
        modalAllComments={modalAllComments}
      />
    </>
  );
};

export default PostCard;
