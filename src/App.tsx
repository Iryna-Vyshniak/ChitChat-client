import React, { useEffect, useState } from 'react';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */

/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { Redirect, Route, Switch } from 'react-router-dom';

import Menu from './components/menu/Menu';
import Home from './pages/home/HomePage';
import Login from './pages/login/LoginPage';
import CreatePostPage from './pages/posts/CreatePostPage';
import Register from './pages/register/RegisterPage';
import { useAuthContext } from './shared/context/AuthContext';
import { appTabs } from './shared/data';
import './theme/main.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  mode: 'ios',
});

const App: React.FC = () => {
  const { authUser, isAuthLoading } = useAuthContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {!authUser ? (
          <IonPage id='main'>
            <Switch>
              <Route exact path='/signin' component={Login} />
              <Route exact path='/signup' component={Register} />
              <Redirect to='/signin' />
            </Switch>
          </IonPage>
        ) : (
          <IonSplitPane contentId='main'>
            <Menu isMobile={isMobile} />
            <IonPage id='main'>
              <IonRouterOutlet id='main'>
                <Switch>
                  <Route path='/' exact={true}>
                    <Redirect to='/app/Posts' />
                  </Route>
                  <Route path='/app' exact={true}>
                    <Redirect to='/app/Posts' />
                  </Route>
                  <Route path='/app/Posts/create' component={CreatePostPage} />
                  <Route path='/app/:name' exact={true} component={Home} />
                  <Route path='/app/:name/:id' exact component={Home} />
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
                    <Route
                      path='/app/Posts/create'
                      exact={true}
                      component={CreatePostPage}
                    />
                    <Route path='/app/:name' exact={true} component={Home} />
                    <Route path='/app/:name/:id' exact component={Home} />
                  </Switch>
                </IonRouterOutlet>
                <IonTabBar
                  slot='bottom'
                  className='custom ion-margin-top'
                  translucent={true}
                >
                  {appTabs.map((tab, index) => (
                    <IonTabButton
                      key={index}
                      tab={tab.title}
                      href={tab.url}
                      mode='md'
                      className='custom'
                    >
                      <IonIcon icon={tab.iosIcon} className='custom' />
                      <IonLabel className='custom'>{tab.title}</IonLabel>
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
