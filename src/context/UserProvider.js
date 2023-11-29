import { useEffect, useState } from "react";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "./userContext";

const UserProvider = ({children}) => {

    const [user,setUser] = useState({
      data:{},
      logIn: false,
    });
  
    useEffect(()=>{
      setUser({
          data: getCurrentUserDetail(),
          logIn: isLoggedIn(),
      })
    },[]);
  
    return (
      <userContext.Provider value={{user, setUser}}>
          {children}
      </userContext.Provider>
    )
  }
  
export default UserProvider;