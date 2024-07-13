import { IonCard, IonTextarea } from '@ionic/react';
import React from 'react';

import './PostForm.css';

const PostFormComment: React.FC = () => {
  return (
    <IonCard className='ion-padding custom-card post-card'>
      {' '}
      <form className='flex-center-col full-width'>
        <IonTextarea
          aria-label='Comment'
          placeholder='Add a comment'
          counter={true}
          maxlength={350}
          autoGrow={true}
          className='custom'
        ></IonTextarea>
      </form>
    </IonCard>
  );
};

export default PostFormComment;
