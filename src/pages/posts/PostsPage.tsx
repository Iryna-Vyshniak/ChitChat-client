import React, { useEffect, useRef, useState } from 'react';

import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';

import PostsFab from '../../components/posts/PostsFab';
import PostsList from '../../components/posts/PostsLists';
import PostsSkeleton from '../../components/posts/PostsSkeleton';
import Sort from '../../components/posts/sort/Sort';
import Stories from '../../components/posts/stories/Stories';
import { useGetPosts } from '../../shared/hooks/post/useGetPosts';
import { useGetPostsByTag } from '../../shared/hooks/post/useGetPostsByTag';

const PostsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [, setPresentingElement] = useState<HTMLElement | null>(null);
  const { posts, getPosts, isLoading } = useGetPosts();
  const { tagsPosts, isTagsPostLoading, getPostsByTag } =
    useGetPostsByTag(selectedTag);

  const page = useRef(null);
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (!selectedTag) {
      await getPosts();
    } else {
      await getPostsByTag(selectedTag);
    }
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

        <Sort onTagClick={(tag) => setSelectedTag(tag)} />

        {isLoading && <PostsSkeleton />}
        {isTagsPostLoading && <PostsSkeleton />}
        {!selectedTag && !isLoading && posts.length > 0 && (
          <PostsList posts={posts} />
        )}
        {selectedTag && !isTagsPostLoading && posts.length > 0 && (
          <PostsList posts={tagsPosts} />
        )}
        <PostsFab />
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
