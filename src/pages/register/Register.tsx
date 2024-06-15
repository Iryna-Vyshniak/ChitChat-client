import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import './Register.css';

import SignUpForm from '../../components/forms/SignUpForm';

import { useSignUp } from '../../shared/hooks/auth/useSignUp';
import { SignupI } from '../../shared/types';

const Register: React.FC = () => {
  const { signup } = useSignUp();

  const onSubmit = async (values: SignupI): Promise<void> => {
    await signup(values);
  };

  return (
    <IonPage className='register-page'>
      <IonHeader className='register-header ion-no-border'>
        <IonToolbar className='register-toolbar'>
          <IonTitle>
            <h1>Sign Up</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className='register-content ion-padding'>
        <SignUpForm onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
