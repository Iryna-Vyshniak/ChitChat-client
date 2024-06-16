import { IonCheckbox,  IonItem,  IonList, IonText } from '@ionic/react';
import React from 'react';

import { SelectedGenderProps } from '../../shared/types';
import { signupFields } from '../../shared/data';

const GenderCheckbox: React.FC<SelectedGenderProps> = ({
  selectedGender,
  handleChange,
  errors,
  markTouched,
  touchedFields,
}) => {
  return (
    <IonList className='auth-ion-list'>
      <IonText class='auth-gender-text'>Gender</IonText>
      <div className='auth-list-wrapper'>
        <IonItem className='auth-gender-item'>
       
          <IonCheckbox
            labelPlacement='start'
            value='male'
            checked={selectedGender === 'male'}
            onIonChange={(event) => handleChange(event)}
            onIonBlur={() => markTouched('gender')}
            {...signupFields.gender}
            className={`${touchedFields.gender ? 'ion-touched' : ''}`}
            >
          Male
        </IonCheckbox>
         
        </IonItem>

        <IonItem className='auth-gender-item'>
     
          <IonCheckbox
            labelPlacement='start'
            value='female'
            checked={selectedGender === 'female'}
            onIonChange={(event) => handleChange(event)}
            onIonBlur={() => markTouched('gender')}
            {...signupFields.gender}
            className={`${touchedFields.gender ? 'ion-touched' : ''}`}
            >
            Female
          </IonCheckbox>
        
        </IonItem>

        <IonItem className='auth-gender-item'>
       
          <IonCheckbox
            labelPlacement='start'
            value='other'
            checked={selectedGender === 'other'}
            onIonChange={(event) => handleChange(event)}
            onIonBlur={() => markTouched('gender')}
            {...signupFields.gender}
            className={`${touchedFields.gender ? 'ion-touched' : ''}`}
            >
            Other
          </IonCheckbox>
         
        </IonItem>
      </div>

      {touchedFields.gender && errors.gender && (
        <IonText color='danger'>
          <p className='gender-error'>{errors.gender}</p>
        </IonText>
      )}
    </IonList>
  );
};

export default GenderCheckbox;
