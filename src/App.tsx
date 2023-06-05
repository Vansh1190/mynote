import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBreadcrumb,
  IonFooter,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chatboxEllipsesOutline, logIn, logInOutline, personAddOutline, personCircleOutline, square } from 'ionicons/icons';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';

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

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';

setupIonicReact();

const App = () => {

const c = localStorage.getItem("AuthToken")

  
  return(
    <IonApp>
    <IonReactRouter >
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/chat">
            <Chat/>
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
      </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Register" href="/register">
            <IonIcon aria-hidden="true" icon={personAddOutline} />
            <IonLabel>Register</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Login" href="/Login">
            <IonIcon aria-hidden="true" icon={personCircleOutline} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Chat" href="/chat">
            <IonIcon aria-hidden="true" icon={chatboxEllipsesOutline} />
            <IonLabel>My Notes</IonLabel>
          </IonTabButton>
      
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
