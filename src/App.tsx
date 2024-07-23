import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Medicines from './pages/Medicines'; // Import Medicines component
import GeneralItems from './pages/GeneralItems'; // Import GeneralItems component
import Add from './pages/Add'; // Import Add component
import AddToCart from './pages/AddToCart'; // Import AddToCart component
import ViewMedicines from './pages/ViewMedicines'; // Import ViewMedicines component
import Search from './pages/Search';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homeafterlogin from './pages/Homeafterlogin'
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
import './pages/AddToCart.css'; // Import AddToCart CSS

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/SignUp">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/homeafterlogin">
          <Homeafterlogin/>
        </Route>
        <Route exact path="/add/:pharmacyName">
          <Medicines />
        </Route>
        <Route exact path="/view/:pharmacyName">
          <ViewMedicines />
        </Route>
        <Route exact path="/search/:pharmacyName" component={Search} />
        <Route exact path="/add/general-items">
          <GeneralItems />
        </Route>
        <Route exact path="/add-to-cart">
          <AddToCart />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
