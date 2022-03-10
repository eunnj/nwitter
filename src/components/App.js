import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "../fbase";

function App() {
  const [init,setInit]= useState(false);
  const [isLoggedin,setIsLoggedIn] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
    <>
    {init?<AppRouter isLoggedin={isLoggedin}/>:"Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
