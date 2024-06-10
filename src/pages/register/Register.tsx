import {  IonContent,  IonHeader,  IonPage,  IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

import SignUpForm from '../../components/forms/SignUpForm';

import { useSignUp } from '../../shared/hooks/auth/useSignUp';
import { SignupI } from '../../shared/types';

const Register: React.FC = () => {
    const { signup } = useSignUp();

    const onSubmit = async (values: SignupI): Promise<void> => {
        await signup(values);
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color={'primary'}>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className="ion-padding">
              <SignUpForm onSubmit={onSubmit} />
            </IonContent>
          
        </IonPage>
    );
};

export default Register;