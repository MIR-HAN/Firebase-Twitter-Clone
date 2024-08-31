import React, { useEffect, useState } from 'react'
import Form from "../../components/form"
import Post from '../../components/post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Loader from '../../components/Loader'

const Main = ({ user }) => {

  const [tweets, setTweets] = useState();

  useEffect(() => {
    // get ref of collection
    const tweetsCol = collection(db, "tweets");

    //adjust querys
    const q = query(tweetsCol, orderBy("createdAt", "desc"));
    // abonment to datas
    const unsub = onSnapshot(q, (snapshot) => {

      const temp = [];

      snapshot.docs.forEach((doc) => {
        temp.push({id:doc.id, ...doc.data()})
      })
 
      //send data send to state
      setTweets(temp);

    })

    //when user leaving the page

    return () => unsub();

  }, [])

  return (
    <div className='border-zinc-600 border overflow-y-auto'>
      <header className='font-bold p-4 border border-zinc-600'>
      <h2 className='text-xl font-semibold'> Home</h2>
       
      </header>

      <Form user={user} />

      {!tweets ? (
      <Loader />
      ) : (
        tweets.map((tweet, i) => (
          <Post key={i} tweet={tweet} />)))}

    </div>
  )
}

export default Main