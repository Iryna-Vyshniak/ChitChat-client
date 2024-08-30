import React, { useEffect } from 'react';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
} from '@ionic/react';

import { postFields, tags } from '../../shared/data';
import { usePreviewImage } from '../../shared/hooks/file/usePreviewImage';
import { useForm } from '../../shared/hooks/form/useForm';
import { PostFormProps, PostI, ValidationErrors } from '../../shared/types';
import PostImageUploader from './PostImageUploader';

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const { handleImageChange, imgUrl } = usePreviewImage();

  const initialValues: PostI = {
    title: '',
    text: '',
    tags: tags,
    imageUrl: imgUrl,
  };

  const validate = (values: PostI): ValidationErrors<PostI> => {
    const errors: ValidationErrors<PostI> = {};

    if (!values.title) errors.title = 'Title is required';
    if (values.title.length < 3 || values.title.length > 35) {
      errors.title = 'Title must be between 3 and 30 characters';
    }

    if (!values.text) errors.text = 'Description is required';
    if (values.text.length < 3 || values.text.length > 700) {
      errors.text = 'Description must be between 3 and 700 characters';
    }

    if (!values.tags || !values.tags.length) {
      errors.tags = 'At least one tag is required';
    }

    if (!values.imageUrl) errors.imageUrl = 'Image is required';

    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isValid,
    markTouched,
    touchedFields,
    setExternalValues,
  } = useForm<PostI>({
    initialValues,
    validate,
    onSubmit,
  });

  useEffect(() => {
    setExternalValues({ imageUrl: imgUrl });
  }, [imgUrl]);

  return (
    <IonGrid fixed className='ion-no-padding ion-margin-vertical'>
      <IonRow className='ion-justify-content-center'>
        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
          <IonCard className='auth-card'>
            <IonCardContent className='scrollable-content'>
              <form onSubmit={handleSubmit} className='form'>
                <IonInput
                  mode='md'
                  fill='solid'
                  labelPlacement='floating'
                  counter={true}
                  maxlength={35}
                  value={values.title}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('title')}
                  errorText={
                    touchedFields.title && errors.title ? errors.title : ''
                  }
                  {...postFields.title}
                  className={`${isValid.title ? 'ion-valid' : 'ion-invalid'} ${
                    touchedFields.title ? 'ion-touched' : ''
                  } custom`}
                  color='secondary'
                />
                <IonSelect
                  mode='md'
                  aria-label='category'
                  multiple={true}
                  fill='solid'
                  labelPlacement='floating'
                  onIonChange={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('tags')}
                  {...postFields.tags}
                  className={`${isValid.tags ? 'ion-valid' : 'ion-invalid'} ${
                    touchedFields.tags ? 'ion-touched' : ''
                  } custom`}
                  color='secondary'
                >
                  {tags.map((tag) => (
                    <IonSelectOption key={tag} value={tag}>
                      {tag}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {touchedFields.tags && errors.tags && (
                  <IonText color='danger' className='ion-padding-start'>
                    <p className='select-error error-text'>{errors.tags}</p>
                  </IonText>
                )}
                <IonTextarea
                  mode='md'
                  fill='solid'
                  labelPlacement='floating'
                  counter={true}
                  maxlength={700}
                  value={values.text}
                  autoGrow={true}
                  clearOnEdit={true}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('text')}
                  errorText={
                    touchedFields.text && errors.text ? errors.text : ''
                  }
                  {...postFields.text}
                  className={`${isValid.text ? 'ion-valid' : 'ion-invalid'} ${
                    touchedFields.text ? 'ion-touched' : ''
                  } custom`}
                  color='secondary'
                />
                <PostImageUploader
                  imageUrl={imgUrl}
                  handleImageChange={handleImageChange}
                  isValid={isValid}
                  markTouched={markTouched}
                  touchedFields={touchedFields}
                  errors={errors}
                />
                <IonButton
                  expand='block'
                  type='submit'
                  className='custom-button'
                >
                  Upload post
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PostForm;
