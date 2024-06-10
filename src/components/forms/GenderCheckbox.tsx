import {
  IonCheckbox,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/react';
import React from 'react';

import { SelectedGenderProps } from '../../shared/types';
import { signupFields } from '../../shared/data';

const GenderCheckbox: React.FC<SelectedGenderProps> = ({
    selectedGender,
    handleChange,
    errors,
    markTouched,
    touchedFields
}) => {

  return (
    <IonList lines="inset">
        <IonItemGroup>
        <IonItemDivider className='ion-padding'>
          <IonLabel>Gender</IonLabel>
        </IonItemDivider>
      <IonItem>
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

      <IonItem>
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
      
      <IonItem>
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
      {touchedFields.gender && errors.gender && <IonText color='danger'>{errors.gender}</IonText>}
      </IonItemGroup>
    </IonList>
  );
};

export default GenderCheckbox;
