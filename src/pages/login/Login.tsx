import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';

interface LoginProps {
    login: () => void;
  }

const Login: React.FC<LoginProps> = ({ login }) => {
    const router = useIonRouter();

    const handleLogin = () => {
        login();
        router.push('app', 'root');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonInput placeholder="Username" />
        <IonInput type="password" placeholder="Password" />
        <IonButton onClick={handleLogin}>Login</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;