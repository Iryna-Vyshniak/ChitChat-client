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
  IonRouterLink,
} from '@ionic/react';
import { archive, heartOutline, trash } from 'ionicons/icons';

import { UserCardProps } from '../../shared/types';

const UserCard: React.FC<UserCardProps> = ({
  user,
  variant,
  isAuthProfile,
  onAction,
}) => {
  return (
    <IonCardContent className='ion-no-padding'>
      <IonItemSliding disabled={!isAuthProfile}>
        {variant === 'chat' && (
          <IonItemOptions side='start'>
            <IonItemOption
              color={'intro-violet'}
              onClick={() => onAction && onAction(user._id)}
            >
              <IonIcon slot='icon-only' icon={heartOutline} />
            </IonItemOption>{' '}
            <IonItemOption color={'success'}>
              <IonIcon slot='icon-only' icon={archive} />
            </IonItemOption>
          </IonItemOptions>
        )}

        <IonItem lines='none'>
          <IonAvatar slot='start'>
            <IonImg src={user.avatar} />
          </IonAvatar>
          <IonLabel>
            {user.fullName}
            <p>{user.email}</p>
          </IonLabel>
          <IonChip slot='end' color={'secondary'}>
            {user.gender[0].toUpperCase()}
          </IonChip>
        </IonItem>

        {variant === 'chat' && (
          <IonItemOptions side='end'>
            <IonItemOption color={'danger'}>
              <IonIcon slot='icon-only' icon={trash} />
            </IonItemOption>
          </IonItemOptions>
        )}
        {variant === 'followings' && (
          <IonItemOptions side='end'>
            <IonItemOption color={'secondary'}>
              <IonRouterLink routerLink={`/app/Profile/${user._id}`}>
                <p>View Profile</p>
              </IonRouterLink>
            </IonItemOption>
          </IonItemOptions>
        )}
      </IonItemSliding>
    </IonCardContent>
  );
};

export default UserCard;
