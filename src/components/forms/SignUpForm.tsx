import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonButton,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import { useForm } from '../../shared/hooks/auth/useForm';

import { SignUpFormProps, SignupI, ValidationErrors } from '../../shared/types';
import { signupFields } from '../../shared/data';
import { regExp } from '../../shared/constants';

import GenderCheckbox from './GenderCheckbox';

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const initialValues: SignupI = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  };

  const validate = (values: SignupI): ValidationErrors<SignupI> => {
    const errors: ValidationErrors<SignupI> = {};

    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (values.fullName.length < 3 || values.fullName.length > 20) {
      errors.fullName = 'Full Name must be between 3 and 20 characters';
    }

    if (!values.username) errors.username = 'Username is required';
    if (values.username.length < 3 || values.username.length > 20) {
      errors.username = 'Username must be between 3 and 20 characters';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regExp.email.test(values.email)) {
      errors.email = 'Enter a valid email';
    }

    if (!values.password) errors.password = 'Password is required';
    if (values.password.length < 7) {
      errors.password = 'Password must be at least 7 characters';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!values.gender) errors.gender = 'Gender is required';

    return errors;
  };

  const { values, errors, handleChange, handleSubmit, isValid, markTouched, touchedFields } = useForm<SignupI>({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <IonGrid fixed>
      <IonRow class='ion-justify-content-center'>
        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
          <IonCard className='register-card'>
            <IonCardContent className='scrollable-content'>
              <form onSubmit={handleSubmit} className='form'>
                <IonInput
                  mode='md'
                  fill='outline'
                  labelPlacement='floating'
                  counter={true} maxlength={20}
                  value={values.fullName}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('fullName')}
                  errorText={touchedFields.fullName && errors.fullName ? errors.fullName : ''}
                  {...signupFields.fullName}
                  className={`${isValid.fullName ? 'ion-valid' : 'ion-invalid'} ${touchedFields.fullName ? 'ion-touched' : ''}`}
                /> 

                <IonInput
                  mode='md'
                  fill='outline'
                  labelPlacement='floating'
                  counter={true} maxlength={20}
                  value={values.username}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('username')}
                  errorText={touchedFields.username && errors.username ? errors.username : ''}
                  {...signupFields.username}
                  className={`${isValid.username ? 'ion-valid' : 'ion-invalid'} ${touchedFields.username ? 'ion-touched' : ''}`}
                />

                <IonInput
                  mode='md'
                  fill='outline'
                  labelPlacement='floating'
                  type='email'
                  value={values.email}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('email')}
                  errorText={touchedFields.email && errors.email ? errors.email : ''}
                  {...signupFields.email}
                  className={`${isValid.email ? 'ion-valid' : 'ion-invalid'} ${touchedFields.email ? 'ion-touched' : ''}`}
                />


                <IonInput
                  mode='md'
                  fill='outline'
                  labelPlacement='floating'
                  type='password'
                  value={values.password}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('password')}
                  errorText={touchedFields.password && errors.password ? errors.password : ''}
                  {...signupFields.password}
                  className={`${isValid.password ? 'ion-valid' : 'ion-invalid'} ${touchedFields.password ? 'ion-touched' : ''}`}
                />

                <IonInput
                  mode='md'
                  fill='outline'
                  labelPlacement='floating'
                  type='password'
                  value={values.confirmPassword}
                  onIonInput={(event) => handleChange(event)}
                  onIonBlur={() => markTouched('confirmPassword')}
                  errorText={touchedFields.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                  {...signupFields.confirmPassword}
                  className={`${isValid.confirmPassword ? 'ion-valid' : 'ion-invalid'} ${touchedFields.confirmPassword ? 'ion-touched' : ''}`}
                />

                <GenderCheckbox
                  selectedGender={values.gender}
                  handleChange={handleChange}
                  errors={errors}
                  markTouched={markTouched}
                  touchedFields={touchedFields}
                />

                <IonButton expand='block' type='submit'>
                Create an account
                </IonButton>
                <IonButton
                  routerLink='/signin'
                  color='secondary'
                  type='button'
                  expand='block'
                >
                  Sign In
                  <IonIcon icon={personCircleOutline} slot='end' />
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SignUpForm;
