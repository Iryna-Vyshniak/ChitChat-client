import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonRow,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import { regExp } from '../../shared/constants';
import { signupFields } from '../../shared/data';
import { useForm } from '../../shared/hooks/form/useForm';
import { SignInFormProps, SigninI, ValidationErrors } from '../../shared/types';

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const initialValues: SigninI = {
    email: '',
    password: '',
  };

  const validate = (values: SigninI): ValidationErrors<SigninI> => {
    const errors: ValidationErrors<SigninI> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regExp.email.test(values.email)) {
      errors.email = 'Enter a valid email';
    }

    if (!values.password) errors.password = 'Password is required';
    if (values.password.length < 7) {
      errors.password = 'Password must be at least 7 characters';
    }

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
  } = useForm<SigninI>({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <IonGrid fixed className='ion-no-padding'>
      <IonRow className='ion-justify-content-center'>
        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
          <IonCardTitle className='ion-text-center'>
            <h2>
              Welcome back! <br /> Sign in using your email to continue us
            </h2>
          </IonCardTitle>
          <IonCard className='auth-card'>
            <IonCardContent className='scrollable-content'>
              <form onSubmit={handleSubmit} className='form'>
                <IonInput
                  mode='md'
                  fill='solid'
                  labelPlacement='floating'
                  type='email'
                  value={values.email}
                  onIonInput={handleChange}
                  onIonBlur={() => markTouched('email')}
                  errorText={
                    touchedFields.email && errors.email ? errors.email : ''
                  }
                  {...signupFields.email}
                  className={`${isValid.email ? 'ion-valid' : 'ion-invalid'} ${
                    touchedFields.email ? 'ion-touched' : ''
                  } custom`}
                  color='secondary'
                />

                <IonInput
                  mode='md'
                  fill='solid'
                  labelPlacement='floating'
                  type='password'
                  value={values.password}
                  onIonInput={handleChange}
                  onIonBlur={() => markTouched('password')}
                  errorText={
                    touchedFields.password && errors.password
                      ? errors.password
                      : ''
                  }
                  {...signupFields.password}
                  className={`${isValid.password ? 'ion-valid' : 'ion-invalid'} ${
                    touchedFields.password ? 'ion-touched' : ''
                  } custom`}
                  color='secondary'
                >
                  <IonInputPasswordToggle slot='end'></IonInputPasswordToggle>
                </IonInput>

                <IonButton
                  expand='block'
                  type='submit'
                  className='custom-button'
                >
                  Log In
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

export default SignInForm;
