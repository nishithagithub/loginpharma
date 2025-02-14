import React from 'react';
import { useLocation, useHistory } from 'react-router-dom'; // Import useHistory
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
  IonText
} from '@ionic/react';
import { RouteState } from './types'; // Adjust the import path based on where you define your types
import './Home.css';

const Home: React.FC = () => {
  const location = useLocation();
  const history = useHistory(); // Initialize useHistory

  const state = location.state as RouteState | undefined;
  const pharmacyName = state?.pharmacyName || '';
  console.log(pharmacyName)
  const navigateTo = (path: string) => {
    history.push({
      pathname: path,
      state: { pharmacyName }
    });
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
              <IonButton expand="full" onClick={() => navigateTo(`/add/${pharmacyName.replace(/\s+/g, '_')}`)}>Add Medicine</IonButton>
            </IonCol>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => navigateTo(`/search/${pharmacyName.replace(/\s+/g, '_')}`)}>Search Medicines</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className='custom-row'>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => navigateTo(`/accounting/${pharmacyName.replace(/\s+/g, '_')}`)}>Accounting</IonButton>
            </IonCol>
            <IonCol className="custom-col">
              <IonImg src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="box-image"/>
              <IonButton expand="full" onClick={() => navigateTo(`/orders/${pharmacyName.replace(/\s+/g, '_')}`)}>Orders</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className='footer'>
        <IonText>Contact Us : 9010203040</IonText>
        <IonText>Email : abc@gmail.com</IonText>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
