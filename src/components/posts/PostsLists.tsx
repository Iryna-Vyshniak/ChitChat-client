import React from 'react';

import { IonContent } from '@ionic/react';

import { PostCardI } from '../../shared/types';
import PostCard from './PostCard';

const PostsList: React.FC<{ posts: PostCardI[] }> = ({ posts }) => {
  return (
    <IonContent className='custom-content margin-y-10'>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </IonContent>
  );
};

export default PostsList;
