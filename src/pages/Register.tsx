import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import axios, { Axios } from 'axios';
import { useDebugValue, useEffect, useState } from 'react';

import { Redirect } from 'react-router';



const Register: React.FC = () => {
  const router =  useIonRouter();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(0);

  useEffect(()=>{
    if(loading == 1){
      document.getElementById("SubmitBtn")?.setAttribute("disabled","")
    }
    else{
      document.getElementById("SubmitBtn")?.removeAttribute("disabled")
    }
    
  },[loading,redirect])

  let submitForm = (event: React.FormEvent)=>{
    setLoading(1)
    event.preventDefault()
    let FData = new FormData(event.target as HTMLFormElement);
    const FDataObj: any = {};
    for (let [key, value] of FData.entries()) {
      FDataObj[key] = value;
    }
    
    axios.post('https://backnd-ge92.onrender.com/api/auth/reg', FDataObj, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
    }).then((data)=>{
      
      setLoading(0)
      if(data.data.ERRor){
        alert("Error email already exist")
        // setRedirect(true)
      }
      else{
        setRedirect(true)
        alert("Account Created")
      }
      // localStorage.setItem("AuthToken",data.data.AuthToken)
      
      
  }).catch((err)=>{
      console.log(err)
    });

  }

  if (redirect) {
    router.push("./login")
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Tab 1</IonTitle> */}
        <IonTitle size="large">Create new Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <form onSubmit={submitForm}>
        <IonList style={{display:"flex" , flexFlow:"column"}} className='ion-align-items-center'>
        <IonTitle>Welcome to NotesVerse</IonTitle>
          <IonInput
           type="text"
           name="name"
           fill="solid"
           required
           label="Name"
           labelPlacement="floating"
           // helperText="Enter a valid email"
           errorText="Invalid email"
           style={{width:"80%"}}
           ></IonInput>
          <IonInput type="email"
            fill="solid"
            name="email"
            label="Email"
            required
            labelPlacement="floating"
            // helperText="Enter a valid email"
            errorText="Invalid email"
            style={{width:"80%"}}
            ></IonInput>
          <IonInput type="password"
            fill="solid"
            name="password"
            required
            label="Password"
            labelPlacement="floating"
            // helperText="Enter a valid email"
            errorText="Invalid email"
            style={{width:"80%"}}
            ></IonInput>

          <IonButton   id='SubmitBtn' type='submit'>Create new Account</IonButton>
       
        </IonList>
        </form>

        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Register;
