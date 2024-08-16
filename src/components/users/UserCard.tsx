import React from 'react';

import {
  IonAvatar,
  IonCardContent,
  IonChip,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from '@ionic/react';
import { archive, heartOutline, trash } from 'ionicons/icons';

import { UserCardProps } from '../../shared/types';

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <IonCardContent className='ion-no-padding'>
      <IonItemSliding>
        <IonItemOptions side='start'>
          <IonItemOption color={'intro-violet'}>
            <IonIcon slot='icon-only' icon={heartOutline} />
          </IonItemOption>
          <IonItemOption color={'success'}>
            <IonIcon slot='icon-only' icon={archive} />
          </IonItemOption>
        </IonItemOptions>
        <IonItem lines='none'>
          <IonAvatar slot='start'>
            <IonImg src={user.avatar} />
          </IonAvatar>
          <IonLabel>
            {user.fullName}
            <p>{user.email}</p>
          </IonLabel>
          <IonChip slot='end' color={'secondary'}>
            {user.gender.split(' ')[0].toUpperCase()[0]}
          </IonChip>
        </IonItem>
        <IonItemOptions side='end'>
          <IonItemOption color={'danger'}>
            <IonIcon slot='icon-only' icon={trash} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </IonCardContent>
  );
};

export default UserCard;
