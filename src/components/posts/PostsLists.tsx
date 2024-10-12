import React, { createRef, useState } from 'react';

import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonList,
} from '@ionic/react';
import { chevronUp } from 'ionicons/icons';

import { useScrollToAnchor } from '../../shared/hooks/scroll/useScrollToAnchor';
import { useSmoothScroll } from '../../shared/hooks/scroll/useSmoothScroll';
import { PostCardI } from '../../shared/types';
import PostCard from './PostCard';

const PostsList: React.FC<{ posts: PostCardI[] }> = ({ posts }) => {
  const [, setSelectedPost] = useState<PostCardI | undefined>(undefined);
  const [backToTop, setBackToTop] = useState<boolean>(false);
  const contentRef = createRef<HTMLIonContentElement>();

  const { scrollRef } = useSmoothScroll(contentRef, 0.05);
  useScrollToAnchor(contentRef);

  const goToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollToTop(1500); // smooth scroll to top
    }
  };

  const scrollToTop = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;
    const threshold = 50;

    if (scrollTop > threshold) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  };

  const handleContentScroll = (event: CustomEvent) => {
    scrollToTop(event);
  };

  return (
    <IonContent
      className='ion-margin-vertical ion-padding-vertical custom-content post-content'
      ref={contentRef}
      scrollEvents={true}
      fixedSlotPlacement='before'
      onIonScroll={(e) => handleContentScroll(e)}
    >
      <div ref={scrollRef}>
        <IonList className='flex-center-col ion-padding-vertical'>
          {posts.map((post) => (
            <IonItem
              key={'card-' + post._id}
              lines='none'
              className='ion-no-padding ion-no-inner-padding post-card'
            >
              <PostCard post={post} selectPost={setSelectedPost} />
            </IonItem>
          ))}
        </IonList>
      </div>
      {backToTop && (
        <IonFab
          horizontal='center'
          vertical='bottom'
          slot='fixed'
          onClick={goToTop}
        >
          <IonFabButton className='custom-fab-button fab-scroll'>
            <IonIcon icon={chevronUp}></IonIcon>
          </IonFabButton>
        </IonFab>
      )}
    </IonContent>
  );
};

export default PostsList;
