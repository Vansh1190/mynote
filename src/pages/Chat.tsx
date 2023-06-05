import { IonBreadcrumb, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonList, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { body, logOut, sendOutline } from "ionicons/icons"
import { ChangeEvent, createElement, useEffect, useState } from "react"

export default function Chat(){
    console.log("CHAT")
    const [Messages,setMessages] :any  = useState([ ])
    const [ClearMSG,setClearMSG] :any  = useState("")

    const [loading, setLoading] = useState(0);
    const [UserFound, setUserFound] = useState(false);
    const [LogedIn, setLogedIn] = useState("");
    const [UserData, setUserData] :any = useState();
    const [MSG,setMSG] = useState ("");
 

useEffect(()=>{
    
    if(localStorage.getItem("AuthToken")){
        setLogedIn("Logging in...");
        setUserFound(true);
        axios.post("https://backnd-ge92.onrender.com/api/auth/getUser",null,{
            headers :{AuthToken :localStorage.getItem("AuthToken")}
        }).then((res)=>{
            setUserData(res)
            setLogedIn("");
            getMessages()
            document.getElementById("tab-button-Register")?.setAttribute("disabled" ,'')
            document.getElementById("tab-button-Login")?.setAttribute("disabled" ,'')

        }).catch((err)=>{
            console.log(err , "ERRR")
            alert("Error")
        })
    }
    else{

        setUserFound(false);
    }
    
},[UserFound,localStorage])


const handleChange :any = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setMSG(e.target.value);
    setClearMSG(e.target.value)

  };

const SendMessage = ()=>{
        UserData.data.message = ClearMSG
        setLogedIn("Saving..")
        // console.log(UserData)
        const message = {
            "user":"",
            "title":UserData["data"]["message"],
            "description":"My name is Vansh, Helo",
            "tags":"intro",
            "Date":""
        }
        setClearMSG("")
        // setLoading(1);
        axios.post("https://backnd-ge92.onrender.com/api/notes/addNote",message,{
            headers:{
                AuthToken:localStorage.getItem("AuthToken")
            }
        }).then((res)=>{
            console.log("USERRES",res)  
            // setLoading(0)
            getMessages()
            setLogedIn("")
          
        }).catch((err)=>{
            console.log(err)
        })
}

const getMessages = ()=>{
    setLogedIn("Fetching Previous Notes");
    axios.get("https://backnd-ge92.onrender.com/api/notes/allNotes",{
            headers:{
                AuthToken:localStorage.getItem("AuthToken")
            }
        }).then((res)=>{  
            setMessages(res.data.allNotes)
            setLogedIn("");
            // Messages.push(res)
          
        }).catch((err)=>{
            console.log(err)
        })
}
useEffect(():any => {
    if (loading == 1) {
      document.getElementById("SubmitBtn")?.setAttribute("disabled", "")
    }
    else {
      try {
        document.getElementById("SubmitBtn")?.removeAttribute("disabled")
      }
      catch { }
    }
   
}, [loading,LogedIn])

if(LogedIn != ""){
    document.getElementById("open-loading")?.click()

}





if(!UserFound){
    return(
        <IonHeader>
            Logged In to continue
            <IonFooter>
          <IonBreadcrumb>
            Made with 💝 by <a href="https://vansh1190.github.io/about">Vansh</a>.
          </IonBreadcrumb>
        </IonFooter>
        </IonHeader>
    )
}
const UserLogout = ()=>{
    window.location.reload()
    setUserFound(false);
    localStorage.removeItem("AuthToken");
    document.getElementById("tab-button-Register")?.removeAttribute("disabled" )
    document.getElementById("tab-button-Login")?.removeAttribute("disabled")

}









    return (
        <IonPage>
        <IonLoading trigger="open-loading" message={LogedIn} duration={5000} />
        <IonButton style={{display:"none"}} id="open-loading">Show Loading</IonButton>

           <IonToolbar>
           <IonRow>
        <IonTitle>Global Chat</IonTitle>
        <IonButton  id='Logout' type='submit' onClick={UserLogout}> <IonIcon aria-hidden="true" icon={logOut} /> </IonButton>
        </IonRow>
        </IonToolbar>
        <IonContent>
            <IonCard id="AllChats">
            <IonCardHeader>
                <IonCardSubtitle>
                {Messages.map((e:any)=>{
                    return (
                        
                        <IonRow class="ion-justify-content-between">
                        <h4>{e.title}</h4>
                        </IonRow>    
                        
                        )
                    })
                    }
                    
                </IonCardSubtitle>
             </IonCardHeader>
            </IonCard>
        </IonContent>
        <IonFooter>
            <IonList style={{display:"flex",justifyContent:"center"} }>

            <IonInput  type="text"
           name="message"
           id="msg"
           value={ClearMSG}
           fill="solid" onInput ={handleChange}
           label="Type a message "
           labelPlacement="floating"
           required
           // helperText="Enter a valid email"
           errorText="Invalid email"
           style={{width:"80%"}} >

            </IonInput>
            <IonButton  id='SubmitBtn' type='submit' onClick={SendMessage}> <IonIcon aria-hidden="true" icon={sendOutline} /> </IonButton>

            </IonList>
        </IonFooter>
        </IonPage>
    )

}