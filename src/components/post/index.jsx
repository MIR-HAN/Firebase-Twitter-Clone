import React, { useState } from 'react'
import UserInfo from './UserInfo'
import Content from './Content'
import Buttons from './Buttons'
import { auth, db } from "./../../firebase/config"
import Dropdown from './Dropdown'
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import EditMode from './EditMode'



const Post = ({ tweet }) => {

  // state of edit mode
  const [isEditMode, setIsEditMode]=useState(false)

  // while clicking delete button
  const handleDelete = async () => {
    const tweetRef = doc(db, "tweets", tweet.id)

   await deleteDoc(tweetRef)
    .then(()=> toast.warn("removed"))
    .catch(()=> toast.error("An error occured"))
  };
  // while clicking delete button
  const handleEdit = () => {
 
    setIsEditMode(true)

  };

//check if current user like

const isLiked = tweet.likes.includes(auth.currentUser.uid)

    // while clicking like button
const toogleLike= async()=>{
  //get document ref whic will be updated
 const tweetRef = doc(db,"tweets",tweet.id)
  
  await updateDoc(tweetRef,{
    likes: isLiked
     ? arrayRemove(auth.currentUser.uid) //remove from array
     : arrayUnion(auth.currentUser.uid) //add to array
   
  })

}

  return (
    <div className='flex gap-3 border-b  px-3 border-zinc-600'>
      <img className='w-12 h-12 rounded-full' src={tweet.user.photo} alt={tweet.user.name} />

      <div className='w-full'>
        <div className='flex justify-between  items-center' >
          <UserInfo tweet={tweet} />

          {auth.currentUser.uid === tweet.user.id &&
            <Dropdown handleDelete={handleDelete} handleEdit={handleEdit} />}
       
        </div>

        {isEditMode ?  <EditMode tweet={tweet} close={()=> setIsEditMode(false)}/> : <Content tweet={tweet} /> }

        <Buttons 
        isLiked={isLiked}
        toogleLike={toogleLike} likeCount={tweet.likes.length} />
      </div>

    </div>


  )
}

export default Post