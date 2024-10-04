import React from 'react';

import { IonCol, IonGrid, IonImg, IonRouterLink, IonRow } from '@ionic/react';

import { PostCardI } from '../../shared/types';

const ProfilePosts: React.FC<{ posts: PostCardI[] }> = ({ posts }) => {
  return (
    <IonGrid fixed>
      <IonRow>
        {posts.map(({ _id, imageUrl }) => (
          <IonCol key={_id} size='12' sizeXs='4'>
            <IonRouterLink routerLink={`/app/Posts#${_id}`}>
              <IonImg src={imageUrl!} alt='post image' className='post-image' />
            </IonRouterLink>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ProfilePosts;
