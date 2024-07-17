import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';
import React from 'react';

import PostComment from './PostComment';

const PostComments: React.FC = () => {
  return (
    <div className='post-comments'>
      <IonAccordionGroup>
        <IonAccordion value='first' toggleIcon={''} toggleIconSlot='start'>
          <IonItem slot='header'>
            <IonLabel>
              <p className='post-comments-header'>View last comments</p>
            </IonLabel>
          </IonItem>

          <ul className='ion-padding ion-no-margin' slot='content'>
            <PostComment />
          </ul>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default PostComments;
