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
  IonToolbar,
} from '@ionic/react';
import { bookmarkOutline, logOutOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

import { useAuthContext } from '../../shared/context/AuthContext';
import { appMobilePages, appPages, labels } from '../../shared/data';
import { useLogout } from '../../shared/hooks/auth/useLogout';
import { MenuProps } from '../../shared/types';
import Avatar from '../avatar/Avatar';
import './Menu.css';

const Menu: React.FC<MenuProps> = ({ isMobile }) => {
  const location = useLocation();
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>ChitChat</IonListHeader>
          {isMobile
            ? appMobilePages.map((appPage, index) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? 'selected' : ''
                    }
                    routerLink={appPage.url}
                    routerDirection='none'
                    lines='none'
                    detail={false}
                  >
                    {appPage.title === 'Profile' ? (
                      <>
                        {' '}
                        <Avatar avatar={authUser!.avatar} isMedium />
                        <IonLabel className='ml-x'>{appPage.title}</IonLabel>
                      </>
                    ) : (
                      <>
                        {' '}
                        <IonIcon
                          slot='start'
                          ios={appPage.iosIcon}
                          md={appPage.mdIcon}
                        />
                        <IonLabel>{appPage.title}</IonLabel>
                      </>
                    )}
                  </IonItem>
                </IonMenuToggle>
              ))
            : appPages.map((appPage, index) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? 'selected' : ''
                    }
                    routerLink={appPage.url}
                    routerDirection='none'
                    lines='none'
                    detail={false}
                  >
                    {appPage.title === 'Profile' ? (
                      <>
                        {' '}
                        <Avatar avatar={authUser!.avatar} isMedium />
                        <IonLabel className='ml-x'>{appPage.title}</IonLabel>
                      </>
                    ) : (
                      <>
                        {' '}
                        <IonIcon
                          slot='start'
                          ios={appPage.iosIcon}
                          md={appPage.mdIcon}
                        />
                        <IonLabel>{appPage.title}</IonLabel>
                      </>
                    )}
                  </IonItem>
                </IonMenuToggle>
              ))}
        </IonList>

        <IonList id='labels-list'>
          <IonListHeader>
            <h2>Labels</h2>
          </IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines='none' key={index}>
              <IonIcon slot='start' icon={bookmarkOutline} />
              <IonLabel>
                <h3>{label}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter className='ion-no-border ion-no-padding'>
        <IonToolbar className='ion-no-padding'>
          <IonMenuToggle autoHide={false}>
            <IonButton
              expand='block'
              onClick={logout}
              className='custom-button'
            >
              <IonIcon slot='start' icon={logOutOutline} />
              Logout
            </IonButton>
          </IonMenuToggle>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
