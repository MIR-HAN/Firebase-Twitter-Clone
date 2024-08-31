import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import Main from './Main';
import Aside from './Aside';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';


const Feed = () => {
  // user state

  const [user,setUser]=useState(null);

  useEffect(()=>{
  //check the user's log in log out status
 const unsub=  onAuthStateChanged(auth, (user_data)=>{
      // update state
      setUser(user_data)
    })
//when user leave the page stop unsub function
    return()=> unsub();
  },[])

  return (
    <div className='feed h-screen bg-black overflow-hidden'>
      <Nav user={user}/>
      <Main user={user}/>
      <Aside />
    </div>
  )
}

export default Feed;