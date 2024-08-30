import React, { useState } from 'react';

import { IonContent, IonItem, IonList } from '@ionic/react';
import { AnimatePresence } from 'framer-motion';

import { PostCardI } from '../../shared/types';
import PostCard from './PostCard';
import PostPopup from './PostPopup';

const PostsList: React.FC<{ posts: PostCardI[] }> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<PostCardI | undefined>(
    undefined
  );
  return (
    <IonContent className='ion-margin-vertical'>
      <div className='content-container'>
        <IonList>
          {' '}
          {posts.map((post) => (
            <IonItem
              key={'card-' + post._id}
              lines='none'
              className='ion-no-padding ion-no-inner-padding'
            >
              {' '}
              <PostCard
                post={post}
                selectPost={setSelectedPost}
                selectedPost={selectedPost}
              />
            </IonItem>
          ))}
        </IonList>
        <AnimatePresence>
          {selectedPost && (
            <PostPopup post={selectedPost} closePopup={setSelectedPost} />
          )}
        </AnimatePresence>
      </div>
    </IonContent>
  );
};

export default PostsList;
