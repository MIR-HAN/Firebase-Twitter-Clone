import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'



const Aside = () => {

  const [caunt, setCaunt]=useState();

  useEffect(()=>{

   const tweetsCol = collection(db,"tweets")
   const snapshot=  onSnapshot(tweetsCol, (snapshot)=>{
    setCaunt(snapshot.size)
    })

  },[])

  return (
    <div className='max-xl:hidden' >
      <h1 className='text-xl font-semibold p-4'>Number of posts: {caunt} </h1>
    </div>
  )
}

// avoid over rerendering since aside doesnt need user prop
export default React.memo(Aside)