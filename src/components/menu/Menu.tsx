import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {  useLocation } from 'react-router-dom';
import { bookmarkOutline, logOutOutline } from 'ionicons/icons';

import './Menu.css';

import { appMobilePages, appPages, labels } from '../../shared/data';
import { MenuProps } from '../../shared/types';

const Menu: React.FC<MenuProps> = ({ isMobile }) => {
  const location = useLocation();

  return (
    <IonMenu contentId='main' type='overlay'>
    <IonContent>
      <IonList id='inbox-list'>
        <IonListHeader>
          <IonToolbar>
            <IonTitle>ChitChat</IonTitle>
          </IonToolbar>
        </IonListHeader>
        {isMobile ? (
          appMobilePages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection='none'
                lines='none'
                detail={false}
              >
                <IonIcon aria-hidden='true' slot='start' ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))
        ) : (
          appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection='none'
                lines='none'
                detail={false}
              >
                <IonIcon aria-hidden='true' slot='start' ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))
        )}
      </IonList>

      <IonList id='labels-list'>
        <IonListHeader>Labels</IonListHeader>
        {labels.map((label, index) => (
          <IonItem lines='none' key={index}>
            <IonIcon aria-hidden='true' slot='start' icon={bookmarkOutline} />
            <IonLabel>{label}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
    <IonFooter>
        <IonToolbar>
        <IonMenuToggle autoHide={false}>
              <IonButton expand="full" routerLink="/signin" routerDirection="root">
                <IonIcon slot="start" icon={logOutOutline} />
                Logout
              </IonButton>
            </IonMenuToggle>
        </IonToolbar>
      </IonFooter>
  </IonMenu>
  );
};

export default Menu;
