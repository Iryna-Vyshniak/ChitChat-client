import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';
import React, { createRef, useEffect, useRef, useState } from 'react';

import PostsFab from '../../components/posts/PostsFab';
import PostsList from '../../components/posts/PostsLists';

import { useGetPosts } from '../../shared/hooks/post/useGetPosts';
import Stories from '../../components/posts/stories/Stories';

const PostsPage: React.FC = () => {
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const { posts, setPosts, getPosts, isLoading } = useGetPosts();

  const contentRef = createRef<HTMLIonContentElement>();
  const page = useRef(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const posts = await getPosts();
    setPosts(posts);
    event.detail.complete();
  };

  return (
    <IonPage ref={page} className='ion-padding' style={{ marginTop: '24px' }}>
      <IonContent ref={contentRef} className='ion-padding'>
        <IonRefresher slot='fixed' onIonRefresh={(e) => handleRefresh(e)}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText='Pull to refresh'
            refreshingSpinner='circles'
          />
        </IonRefresher>
        <Stories />
        {!isLoading && posts.length > 0 && <PostsList posts={posts} />}

        <PostsFab />
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
