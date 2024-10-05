import React from 'react';

import { IonContent } from '@ionic/react';

import PostSkeleton from './PostSkeleton';

const PostsSkeleton: React.FC = () => {
  return (
    <IonContent className='custom-content ion-padding'>
      {[...Array(16)].map((_, idx) => (
        <PostSkeleton key={idx} />
      ))}
    </IonContent>
  );
};

export default PostsSkeleton;
