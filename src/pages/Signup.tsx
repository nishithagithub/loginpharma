import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonIcon,
  IonFooter,
  IonAlert,
} from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import './Signup.css';
import useSQLiteDB from '../composables/useSQLiteDB';

const Signup: React.FC = () => {
  const [pharmacyName, setPharmacyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { registerUser, initialized } = useSQLiteDB(pharmacyName);

  const pharmacyNameRegex = /^[A-Z][a-z]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^\d{10}$/;

  const validatePharmacyName = () => pharmacyNameRegex.test(pharmacyName);
  const validateEmail = () => emailRegex.test(email);
  const validatePhoneNumber = () => phoneNumberRegex.test(phoneNumber);
  const validatePasswordsMatch = () => password === confirmPassword;

  const handleSignup = () => {
    if (!validatePharmacyName() || !validateEmail() || !validatePhoneNumber() || !validatePasswordsMatch()) {
      setAlertMessage('Please correct the errors in the form before submitting.');
      setShowAlert(true);
      return;
    }

    if (!initialized) {
      setAlertMessage('Database not initialized.');
      setShowAlert(true);
      return;
    }

    registerUser(pharmacyName, email, phoneNumber, password, () => {
      setAlertMessage('Signup successful!');
      setShowAlert(true);
    }, (error) => {
      setAlertMessage(error.message);
      setShowAlert(true);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='signup-content'>
        <IonItem>
          <IonLabel position="floating">Pharmacy Name</IonLabel>
          <IonInput value={pharmacyName} onIonChange={(e) => setPharmacyName(e.detail.value!)}></IonInput>
          {pharmacyName && (
            <IonIcon
              icon={validatePharmacyName() ? checkmarkCircle : closeCircle}
              color={validatePharmacyName() ? 'success' : 'danger'}
            />
          )}
        </IonItem>
        {!validatePharmacyName() && pharmacyName && (
          <IonText color="danger">Pharmacy name must start with a capital letter and contain only lowercase letters.</IonText>
        )}

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
          {email && (
            <IonIcon
              icon={validateEmail() ? checkmarkCircle : closeCircle}
              color={validateEmail() ? 'success' : 'danger'}
            />
          )}
        </IonItem>
        {!validateEmail() && email && (
          <IonText color="danger">Please enter a valid email address.</IonText>
        )}

        <IonItem>
          <IonLabel position="floating">Phone Number</IonLabel>
          <IonInput type="tel" value={phoneNumber} onIonChange={(e) => setPhoneNumber(e.detail.value!)}></IonInput>
          {phoneNumber && (
            <IonIcon
              icon={validatePhoneNumber() ? checkmarkCircle : closeCircle}
              color={validatePhoneNumber() ? 'success' : 'danger'}
            />
          )}
        </IonItem>
        {!validatePhoneNumber() && phoneNumber && (
          <IonText color="danger">Phone number must be 10 digits.</IonText>
        )}

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput type="password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
          {confirmPassword && (
            <IonIcon
              icon={validatePasswordsMatch() ? checkmarkCircle : closeCircle}
              color={validatePasswordsMatch() ? 'success' : 'danger'}
            />
          )}
        </IonItem>
        {!validatePasswordsMatch() && confirmPassword && (
          <IonText color="danger">Passwords do not match.</IonText>
        )}

        <IonButton expand="block" onClick={handleSignup}>Sign Up</IonButton>
      </IonContent>
      <IonFooter>
        <IonText>Contact Us: 9010203040</IonText>
        <IonText>Email: abc@gmail.com</IonText>
      </IonFooter>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Validation Error'}
        message={alertMessage}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Signup;
