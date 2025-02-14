import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonText,
  IonToast
} from '@ionic/react';
import { RouteState } from './types'; // Adjust the import path based on where you define your types
import './Home.css';

const Home: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  
  // Mock authentication status, replace with actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // Toast message state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const state = location.state as RouteState | undefined;
  const pharmacyName = state?.pharmacyName || '';

  const handleNavigation = (path: string) => {
    if (isLoggedIn) {
      history.push({
        pathname: path,
        state: { pharmacyName }
      });
    } else {
      setToastMessage('Please log in to access this feature');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader className='pgcolor'>
        <div className="hd-button">
          <IonButton shape="round" color="light" routerLink='/Login'>Login</IonButton>
          <IonButton shape="round" color="light" routerLink='/SignUp'>SignUp</IonButton>
        </div>
      </IonHeader>
      <IonContent fullscreen className='pgcolor'>
        <IonGrid className="custom-grid">
          <IonRow className='custom-row'>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => handleNavigation(`/add/${pharmacyName.replace(/\s+/g, '_')}`)}>Add Medicine</IonButton>
            </IonCol>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => handleNavigation(`/view/${pharmacyName.replace(/\s+/g, '_')}`)}>View Medicines</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className='custom-row'>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => handleNavigation(`/accounting/${pharmacyName.replace(/\s+/g, '_')}`)}>Accounting</IonButton>
            </IonCol>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => handleNavigation(`/orders/${pharmacyName.replace(/\s+/g, '_')}`)}>Orders</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className='footer'>
        <IonText>Contact Us : 9010203040</IonText>
        <IonText>Email : abc@gmail.com</IonText>
      </IonFooter>
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default Home;
