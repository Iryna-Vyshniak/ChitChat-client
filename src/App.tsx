import {
  IonApp,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Menu from './components/menu/Menu';
import Home from './pages/home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/main.css';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { appTabs } from './shared/data';
import { useAuthContext } from './shared/context/AuthContext';

setupIonicReact({
  mode: 'ios',
});

const App: React.FC = () => {
  const { authUser } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const login = () => {
    if (!authUser) return;
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated ? (
          <IonPage id='main'>
            <Switch>
              <Route exact path='/signin' render={(props) => <Login {...props} login={login} />} />
              <Route exact path='/signup' component={Register} />
              <Redirect from='*' to='/signin' />
            </Switch>
          </IonPage>
        ) : (
          <IonSplitPane contentId='main'>
            <Menu isMobile={isMobile} />
            <IonPage id='main'>
              <IonRouterOutlet id='main'>
                <Switch>
                  <Route path='/app' exact={true}>
                    <Redirect to='/app/Posts' />
                  </Route>
                  <Route path='/app/:name' exact={true}>
                    <Home />
                  </Route>
                </Switch>
              </IonRouterOutlet>
            </IonPage>
            {isMobile && (
              <IonTabs>
                <IonRouterOutlet id='main'>
                  <Switch>
                    <Route path='/app' exact={true}>
                      <Redirect to='/app/Posts' />
                    </Route>
                    <Route path='/app/:name' exact={true}>
                      <Home />
                    </Route>
                  </Switch>
                </IonRouterOutlet>
                <IonTabBar slot='bottom'>
                  {appTabs.map((tab, index) => (
                    <IonTabButton key={index} tab={tab.title} href={tab.url}>
                      <IonIcon icon={tab.iosIcon} />
                      <IonLabel>{tab.title}</IonLabel>
                    </IonTabButton>
                  ))}
                </IonTabBar>
              </IonTabs>
            )}
          </IonSplitPane>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
