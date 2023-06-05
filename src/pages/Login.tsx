import { IonAlert, IonBreadcrumb, IonBreadcrumbs, IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonLoading, IonNote, IonPage, IonSpinner, IonSplitPane, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Router } from 'react-router';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [loading, setLoading] = useState("");
  const [UserFound, setUserFound] = useState(0);
  const [LoggedIn, setLoggedIn] = useState(false);
 

  const UserLogin = (event: React.FormEvent) => {
    setLoading("Checking Account");
    event.preventDefault();

    let fData = new FormData(event.target as HTMLFormElement)
    const FormDataObj: any = {};
    for (let [key, value] of fData.entries()) {
      FormDataObj[key] = value
    }
    console.log(FormDataObj)
    axios.post('https://backnd-ge92.onrender.com/api/auth/login', FormDataObj, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then((res) => {
      setUserFound(0);
      setLoading("");
      console.log(res.data.Message);
      localStorage.setItem("AuthToken",res.data.AuthToken)
      setLoggedIn(true)
      router.push('/chat')
    }).catch((err) => {
      setLoading("")
      console.log(err.response.data)
      setUserFound(1);
      
    })

  }
  useEffect(():any => {
      if (loading!= "") {
        document.getElementById("SubmitBtn")?.setAttribute("disabled", "")
      }
      else {
        try {
          document.getElementById("SubmitBtn")?.removeAttribute("disabled")
        }
        catch { }
      }
     
  }, [loading,UserFound,LoggedIn,localStorage])

  if(localStorage.getItem("AuthToken")){
    window.location.href=("./chat")

    return (
      <h1>Account Verified</h1>
      )
  }
  if(loading != ""){
    document.getElementById("open-loading")?.click()

}


  if(UserFound == 1) {
    document.getElementById('present-alert')?.click()
    setUserFound(0)
  }
  
  if(LoggedIn){
    setLoggedIn(false)
    window.location.href=("/chat")
   
    // return <Redirect to={"/chat"} />
  }
  
  return (
    <IonPage>
       <IonLoading trigger="open-loading" message={loading} duration={5000} />
        <IonButton style={{display:"none"}} id="open-loading">Show Loading</IonButton>

      <IonHeader>
        <IonToolbar>
          <IonTitle>User Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={UserLogin}>
          
          <IonList style={{ display: "flex", flexFlow: "column" }} className='ion-align-items-center'>
           <IonTitle>Welcome to NotesVerse</IonTitle>
           <br/>
            <IonNote>You may use, { "{ demo@mail.in : demo } if you dont have account !"}</IonNote>
            <IonBreadcrumbs>{ "( Recomended New Re  gister )"}</IonBreadcrumbs>
            <br />
            <br />
            <IonInput
              type="text"
              name="email"
              fill="solid"
              label="Email"
              required
              labelPlacement="floating"
              // helperText="Enter a valid email"
              style={{ width: "80%" }}
            ></IonInput>
            <IonInput type="password"
              fill="solid"
              name="password"
              label="password "
              required
              labelPlacement="floating"
              style={{ width: "80%" }}
            ></IonInput>

            <IonButton id='SubmitBtn' type='submit'>Log In</IonButton>
          </IonList>
        </form>
        <IonButton style={{display:"none"}} id="present-alert">Click Me</IonButton>
      <IonAlert
        trigger="present-alert"
        header="email or password is incorrect"
        buttons={['OK']}
      ></IonAlert>
      </IonContent>
    </IonPage>
    

  );
};

export default Login;
