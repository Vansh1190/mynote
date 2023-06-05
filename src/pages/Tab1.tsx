import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import axios, { Axios } from 'axios';
import { useDebugValue, useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const Tab1: React.FC = () => {
  const [loading, setLoading] = useState(0);

  useEffect(()=>{
    if(loading == 1){
      document.getElementById("SubmitBtn")?.setAttribute("disabled","")
    }
    else{
      document.getElementById("SubmitBtn")?.removeAttribute("disabled")
    }
  },[loading])

  let submitForm = (event: React.FormEvent)=>{
    setLoading(1)
    event.preventDefault()
    let FData = new FormData(event.target as HTMLFormElement);
    const FDataObj: any = {};
    for (let [key, value] of FData.entries()) {
      FDataObj[key] = value;
    }
    console.log(FDataObj)
    fetch('https://backnd-ge92.onrender.com/api/auth/reg', {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(
                FDataObj
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then((E)=>{
            console.log(E)
            return E.json()
    }).then((data)=>{
      setLoading(0)
      console.log(data,"DDDDD")
      if(data.ERRor){
        alert("Error email already exist")
      }
      else{
        alert("Account Created")
        Redirect
      }
      localStorage.setItem("AuthToken",data.AuthToken)
      
      
  }).catch((err)=>{
      console.log(err)
    });

  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonTitle size="large">Register</IonTitle>

        <form onSubmit={submitForm}>
        <IonList style={{display:"flex" , flexFlow:"column"}} className='ion-align-items-center'>

          <IonInput
           type="text"
           name="name"
           fill="solid"
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
            labelPlacement="floating"
            // helperText="Enter a valid email"
            errorText="Invalid email"
            style={{width:"80%"}}
            ></IonInput>
          <IonInput type="password"
            fill="solid"
            name="password"
            label="Password"
            labelPlacement="floating"
            // helperText="Enter a valid email"
            errorText="Invalid email"
            style={{width:"80%"}}
            ></IonInput>

          <IonButton   id='SubmitBtn' type='submit'>Register</IonButton>
       
        </IonList>
        </form>

        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
