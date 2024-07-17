import { IonContent } from '@ionic/react';
import React from 'react';

import PostCard from './PostCard';
import { PostCardI } from '../../shared/types';

const PostsList: React.FC<{ posts: PostCardI[] }> = ({ posts }) => {
  return (
    <IonContent className='custom-content'>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </IonContent>
  );
};

export default PostsList;
