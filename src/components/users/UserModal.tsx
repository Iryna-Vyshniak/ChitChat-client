import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
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
    >
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot='end'>
            <IonButton onClick={dismiss}>
              <IonIcon icon={closeOutline} color='light' />
            </IonButton>
          </IonButtons>
          <IonTitle>{selectedUser?.fullName}</IonTitle>
        </IonToolbar>
        <IonToolbar color='secondary'>
          <IonSegment
            value={activeSegment}
            onIonChange={(e) => setActiveSegment(e.detail.value!)}
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
            <div className='custom-modal-card'>
              {' '}
              <div className='avatar'>
                <IonImg src={selectedUser?.avatar} className='custom-avatar' />
              </div>
              <div>
                <h2>{selectedUser?.fullName}</h2>
                {selectedUser?.phone && <h3>{selectedUser?.phone}</h3>}
              </div>
            </div>

            <div>
              <IonItem lines='none'>
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
                <IonItem lines='none'>
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

              <IonItem lines='none'>
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
              <IonItem lines='none'>
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
                <IonItem lines='none'>
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
            </div>
          </>
        )}
        {activeSegment === 'settings' && <p>Settings</p>}
      </IonContent>
    </IonModal>
  );
};

export default UserModal;
