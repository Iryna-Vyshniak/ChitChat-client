import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonNote,
} from '@ionic/react';
import {
  calendarClearOutline,
  mailOutline,
  maleFemaleOutline,
  createOutline,
  chatboxEllipsesOutline,
  callOutline,
  atOutline,
} from 'ionicons/icons';
import React from 'react';

import './ProfileCard.css';

import { getFormattedDate } from '../../shared/utils';
import { useAuthContext } from '../../shared/context/AuthContext';

import ProfileContent from '../../assets/content/profile-content-1.jpg';

const authUserCard: React.FC = () => {
  const { authUser } = useAuthContext();

  return (
    <IonContent>
      <div className='header-container'>
        <div className='header-image-wrapper'>
          <img src={ProfileContent} alt='letters' className='header-image' />
        </div>

        <div className='header'>
          <div className='stats'>
            <span className='tag stat-module'>
              Posts <span className='stat-number'>56</span>
            </span>
            <span className='tag stat-module'>
              Followers <span className='stat-number'>29</span>
            </span>
            <span className='tag stat-module'>
              Following <span className='stat-number'>11</span>
            </span>
          </div>
          <h1 className='main-heading text-shadow-dark'>{authUser?.fullName}</h1>
        </div>
      </div>

      <div className='overlay-header'></div>

      <div className='profile-content'>
        <div className='avatar profile-avatar-wrapper'>
          <IonImg src={authUser?.avatar} alt='avatar' className='custom-avatar' />
        </div>

        <div className='profile-content-contacts-container'>
          {authUser?.phone && (
            <div className='profile-content-contacts'>
              <IonIcon icon={callOutline} className='custom-icon ion-margin-end' />{' '}
              <IonLabel>{authUser.phone}</IonLabel>
            </div>
          )}

          <div className='profile-content-contacts'>
            <IonIcon icon={mailOutline} className='custom-icon ion-margin-end' />
            <IonLabel>{authUser?.email}</IonLabel>
          </div>
        </div>
      </div>
      <IonGrid>
        {authUser?.bio && (
          <IonRow>
            <IonCol size='12'>
              <IonCard className='custom-card'>
                <IonCardHeader>
                  <IonRow>
                    <IonIcon
                      icon={chatboxEllipsesOutline}
                      className='ion-margin-end profile-icon'
                    />
                    <IonCardSubtitle className='text-shadow-theme'>Status</IonCardSubtitle>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>
                      Believe in Yourself and Do what You Love, and Dare to challenge Yourself to
                      achieve Success!
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        )}

        <IonRow>
          <IonCol size='12'>
            <IonCard className='custom-card'>
              <IonItem>
                <IonIcon
                  icon={atOutline}
                  aria-hidden='true'
                  slot='start'
                  className='profile-icon'
                />
                <IonLabel>
                  <p className='custom-label'>{authUser?.username}</p>
                </IonLabel>
                <IonNote>nickname</IonNote>
              </IonItem>

              {authUser?.birthday && (
                <IonItem className='profile-content-info'>
                  <IonIcon
                    icon={calendarClearOutline}
                    aria-hidden='true'
                    slot='start'
                    className='profile-icon'
                  />
                  <IonLabel>
                    <p className='custom-label'>{authUser?.birthday}</p>
                  </IonLabel>
                  <IonNote>date of birth</IonNote>
                </IonItem>
              )}

              <IonItem className='profile-content-info'>
                <IonIcon
                  icon={maleFemaleOutline}
                  aria-hidden='true'
                  slot='start'
                  className='profile-icon'
                />
                <IonLabel>
                  {' '}
                  <p className='custom-label'>{authUser?.gender} </p>
                </IonLabel>
                <IonNote>gender</IonNote>
              </IonItem>
              {authUser?.createdAt && (
                <IonItem lines='none' className='profile-content-info'>
                  <IonIcon
                    icon={createOutline}
                    aria-hidden='true'
                    slot='start'
                    className='profile-icon'
                  />
                  <IonLabel>
                    <p className='custom-label'>{getFormattedDate(authUser?.createdAt)}</p>
                  </IonLabel>
                  <IonNote>joined</IonNote>
                </IonItem>
              )}
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default authUserCard;
