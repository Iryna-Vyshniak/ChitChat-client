import { IonCard, IonContent, IonLabel, IonSkeletonText, IonThumbnail } from '@ionic/react';
import React from 'react';

const PostsSkeleton: React.FC = () => {
  return (
    <IonContent className='custom-content ion-padding'>
      {[...Array(16)].map((_, idx) => (
        <IonCard key={idx} className='post-container ion-padding ion-margin'>
          <div className='post-inner-container'>
            <div className='post-profile'>
              <div className='post-profile-info'>
                <IonThumbnail slot='start'>
                  <IonSkeletonText animated={true} />
                </IonThumbnail>

                <IonSkeletonText animated={true} style={{ marginLeft: '0.2rem', width: '120px' }} />
              </div>

              <div className='post-profile-more'>
                <IonSkeletonText animated={true} style={{ width: '10px', height: '24px' }} />
              </div>
            </div>

            <IonThumbnail className='post-image post-image-skeleton'>
              <IonSkeletonText animated={true} />
            </IonThumbnail>

            <div className='post-actions-container'>
              <div className='post-actions'>
                <IonSkeletonText animated={true} style={{ width: '24px', height: '24px' }} />
                <IonSkeletonText animated={true} style={{ width: '24px', height: '24px' }} />
                <IonSkeletonText animated={true} style={{ width: '24px', height: '24px' }} />
              </div>
              <IonLabel className='post-bookmark'>
                <IonSkeletonText animated={true} style={{ width: '20px', height: '24px' }} />
              </IonLabel>
            </div>
          </div>
          <div className='post-likes-container'>
            <p>
              <IonSkeletonText animated={true} style={{ width: '50%' }} />
            </p>
          </div>

          <div className='post-title'>
            <p className='flex-start'>
              <IonSkeletonText animated={true} style={{ width: '25%' }} />
              <IonSkeletonText animated={true} style={{ width: '10%' }} />
            </p>
          </div>
        </IonCard>
      ))}
    </IonContent>
  );
};

export default PostsSkeleton;
