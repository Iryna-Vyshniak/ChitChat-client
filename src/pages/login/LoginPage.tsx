import React from 'react';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import Action from '../../components/forms/Action';
import SignInForm from '../../components/forms/SignInForm';
import { useSignIn } from '../../shared/hooks/auth/useSignIn';
import { SigninI } from '../../shared/types';
import '../../theme/authstyles.css';

interface LoginProps {
  login: () => void;
}

const LoginPage: React.FC<LoginProps> = () => {
  const { signin } = useSignIn();

  const handleLogin = async (values: SigninI): Promise<void> => {
    await signin(values);
  };

  return (
    <IonPage className='auth-page'>
      <IonHeader className='ion-no-border' translucent={true}>
        <IonToolbar color='secondary'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/signup' />
          </IonButtons>
          <IonTitle>Log in to ChitChat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className='auth-content ion-padding'>
        <SignInForm onSubmit={handleLogin} />
      </IonContent>

      <IonFooter translucent={true} className='ion-no-border'>
        <Action
          message='Don’t have an account?'
          link='/signup'
          text='Sign Up'
        />
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
