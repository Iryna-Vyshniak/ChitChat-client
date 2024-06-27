import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  calendarClearOutline,
  closeOutline,
  createOutline,
  mailOutline,
  maleFemaleOutline,
  personOutline,
} from 'ionicons/icons';
import React, { useRef, useState } from 'react';

import { UserModalProps } from '../../shared/types';
import { getFormattedDate } from '../../shared/utils';

import UserModalFab from './UserModalFab';

const UserModal: React.FC<UserModalProps> = ({ selectedUser, setSelectedUser }) => {
  const [activeSegment, setActiveSegment] = useState<any>('details');
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal
      breakpoints={[0, 0.5, 0.8]}
      initialBreakpoint={0.5}
      ref={modal}
      isOpen={selectedUser !== null}
      onIonModalDidDismiss={() => setSelectedUser(null)}
      className='custom-user-modal'
    >
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot='end'>
            <IonButton onClick={dismiss}>
              <IonIcon icon={closeOutline} color='light' />
            </IonButton>
          </IonButtons>
          <IonTitle className='custom-title'>{selectedUser?.fullName}</IonTitle>
        </IonToolbar>
        <IonToolbar color='secondary'>
          <IonSegment
            value={activeSegment}
            onIonChange={(e) => {
              modal.current?.setCurrentBreakpoint(0.8);
              setActiveSegment(e.detail.value!);
            }}
            class='ion-color-custom-segment'
          >
            <IonSegmentButton value='details'>
              <IonLabel>Details</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value='settings'>
              <IonLabel>Settings</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding custom-modal-card'>
        {activeSegment === 'details' && (
          <>
            {' '}
            <IonCard className='custom-modal-card'>
              <IonCardHeader className='custom-modal-header'>
                {' '}
                <div className='avatar'>
                  <IonImg src={selectedUser?.avatar} className='custom-avatar' />
                </div>
                <div className='custom-modal-header'>
                  <IonCardTitle>{selectedUser?.fullName}</IonCardTitle>
                  {selectedUser?.phone && <IonCardSubtitle>{selectedUser?.phone}</IonCardSubtitle>}
                </div>
              </IonCardHeader>

              <IonCardContent>
                <IonList className='custom-modal-list'>
                  <IonItem lines='none' className='custom-modal-item'>
                    <IonIcon
                      icon={personOutline}
                      aria-hidden='true'
                      slot='start'
                      className='custom-icon'
                    />
                    <IonLabel>
                      <p className='custom-label'>Nickname: @{selectedUser?.username}</p>
                    </IonLabel>
                  </IonItem>
                  {selectedUser?.birthday && (
                    <IonItem lines='none' className='custom-modal-item'>
                      <IonIcon
                        icon={calendarClearOutline}
                        aria-hidden='true'
                        slot='start'
                        className='custom-icon'
                      />
                      <IonLabel>
                        <p className='custom-label'>Data of Birth: {selectedUser?.birthday}</p>
                      </IonLabel>
                    </IonItem>
                  )}

                  <IonItem lines='none' className='custom-modal-item'>
                    <IonIcon
                      icon={mailOutline}
                      aria-hidden='true'
                      slot='start'
                      className='custom-icon'
                    />
                    <IonLabel>
                      <p className='custom-label'>Email: {selectedUser?.email}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines='none' className='custom-modal-item'>
                    <IonIcon
                      icon={maleFemaleOutline}
                      aria-hidden='true'
                      slot='start'
                      className='custom-icon'
                    />
                    <IonLabel>
                      {' '}
                      <p className='custom-label'>Gender: {selectedUser?.gender} </p>
                    </IonLabel>
                  </IonItem>
                  {selectedUser?.createdAt && (
                    <IonItem lines='none' className='custom-modal-item'>
                      <IonIcon
                        icon={createOutline}
                        aria-hidden='true'
                        slot='start'
                        className='custom-icon'
                      />
                      <IonLabel>
                        <p className='custom-label'>
                          Joined: {getFormattedDate(selectedUser?.createdAt)}
                        </p>
                      </IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </IonCardContent>
            </IonCard>
            <UserModalFab user={selectedUser} />
          </>
        )}
        {activeSegment === 'settings' && <p>Settings</p>}
      </IonContent>
    </IonModal>
  );
};

export default UserModal;
