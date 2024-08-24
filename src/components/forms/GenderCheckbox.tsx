import React from 'react';

import {
  CheckboxChangeEventDetail,
  IonCheckbox,
  IonItem,
  IonList,
  IonText,
} from '@ionic/react';

import { signupFields } from '../../shared/data';
import { Gender, SelectedGenderProps } from '../../shared/types';

const GenderCheckbox: React.FC<SelectedGenderProps> = ({
  selectedGender,
  handleChange,
  errors,
  markTouched,
  touchedFields,
}) => {
  // Function to handle the change event and pass the correct type to the handler
  const handleGenderChange = (
    event: CustomEvent<CheckboxChangeEventDetail>
  ) => {
    // Extract the value from the event and assert the type to 'Gender'
    const gender = event.detail.value as Gender;

    // Call the handleChange function with a simulated event object
    handleChange({
      target: {
        name: 'gender',
        value: gender,
      },
    } as unknown as CustomEvent<Gender>);
  };

  return (
    <IonList className='auth-ion-list'>
      <IonText class='auth-gender-text'>Gender</IonText>
      <div className='auth-list-wrapper'>
        <IonItem className='auth-gender-item'>
          <IonCheckbox
            labelPlacement='start'
            value='male'
            checked={selectedGender === 'male'}
            onIonChange={handleGenderChange}
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
            onIonChange={handleGenderChange}
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
            onIonChange={handleGenderChange}
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
