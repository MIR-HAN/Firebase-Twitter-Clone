import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'


const Protected = () => {

    // state of use authorization
    const [isAuth, setIsAuth] = useState();

useEffect(()=> {
    onAuthStateChanged(auth, (user)=>{

        // if there is user? switch the authorization true
        // else switch the false
        setIsAuth(user ? true : false)
      
    })

},[])

// if user hasn't authorization
if(isAuth === false) {
    return <Navigate to={'/'}/>
}
// else

  return (

       <Outlet/>
 
  )
}

export default Protected;