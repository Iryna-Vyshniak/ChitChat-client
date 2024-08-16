import React, { useRef } from 'react';

import { IonButton, IonIcon, IonText } from '@ionic/react';
import { cloudCircleOutline } from 'ionicons/icons';

import { postFields } from '../../shared/data';
import { PostImageUploaderProps } from '../../shared/types';
import './PostImageUploader.css';

const PostImageUploader: React.FC<PostImageUploaderProps> = ({
  imageUrl,
  handleImageChange,
  markTouched,
  touchedFields,
  errors,
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className='post-img-container'>
      <input
        type='file'
        className='post-img-input'
        ref={fileRef}
        onChange={(event) => handleImageChange(event)}
        onBlur={() => markTouched('imageUrl')}
        {...postFields.imageUrl}
      />
      {imageUrl ? (
        <div className='post-img-thumb'>
          <img
            src={imageUrl}
            alt='post illustration'
            width={250}
            height={250}
            className='full-width full-height cover-center'
          />
        </div>
      ) : (
        <div className='post-uploader'>
          <IonIcon icon={cloudCircleOutline} className='icon-uploader' />
          <h3>Drag photo here</h3>
          <p>SVG, PNG, JPG</p>
          <IonButton color='intro-violet' expand='block' onClick={handleClick}>
            Select from your device
          </IonButton>
        </div>
      )}
      {errors.imageUrl && touchedFields.imageUrl && !imageUrl && (
        <IonText color='danger' className='ion-padding-start'>
          <p className='select-error error-text'>{errors.imageUrl}</p>
        </IonText>
      )}
    </div>
  );
};

export default PostImageUploader;
