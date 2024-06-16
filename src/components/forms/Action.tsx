import { IonCol, IonRouterLink, IonRow } from '@ionic/react';
import React from 'react';

import { ActionI } from '../../shared/types';

const Action: React.FC<ActionI> = ({ message, link, text }) => {

    return (
        <IonRow className="register-action ion-text-center ion-justify-content-center">
            <IonCol size='12'>
            <div>
                { message }
                <IonRouterLink className="custom-link ion-margin-start" routerLink={ link }
                > { text } &rarr;</IonRouterLink>
            </div>
            </IonCol>
        </IonRow>
    );
};

export default Action;