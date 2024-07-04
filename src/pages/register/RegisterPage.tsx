import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import '../../theme/authstyles.css';

import SignUpForm from '../../components/forms/SignUpForm';

import { useSignUp } from '../../shared/hooks/auth/useSignUp';
import { SignupI } from '../../shared/types';

const RegisterPage: React.FC = () => {
  const { signup } = useSignUp();

  const handleSubmit = async (values: SignupI): Promise<void> => {
    await signup(values);
  };

  return (
    <IonPage className='auth-page'>
      <IonHeader className='ion-no-border' translucent={true}>
        <IonToolbar color='secondary'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/signin' />
          </IonButtons>
          <IonTitle>
            <h1>Sign Up</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className='auth-content ion-padding'>
        <SignUpForm onSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
