import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { db } from '../../firebase/config';
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";




const EditMode = ({ tweet, close }) => {

  const [isPicDelete, setIsPicDelete] =useState(false)

  //while form sending
  const handleSubmit = async (e) => {

    e.preventDefault();

    //get new title
    const newTittle = e.target[0].value;
    //get ref of tweet which will be edited
    const tweetRef = doc(db, "tweets", tweet.id)

    if(isPicDelete){
      await updateDoc(tweetRef, {
        textContent: newTittle,
        imageContent:null,
        isEdited: true,
      })
    }else {await updateDoc(tweetRef, {
      textContent: newTittle,
      isEdited: true,
    })
}

//close edit mode
close();

  }


  return (
    <form onSubmit={handleSubmit} className='my-4'>
      <input defaultValue={tweet.textContent}
        className='rounded p-1 px-2 text-black' type="text" />


      <button type="submit" className='mx-5 p-2 border border-zinc-500 text-green-400
        rounded shadow hover:bg-zinc-700'>
        <FaRegSave />
      </button>

      <button type="button" onClick={close} className='mx-5 p-2 border border-zinc-500 text-red-400
        rounded shadow hover:bg-zinc-700'>
        <MdCancel />

      </button>


      {tweet.imageContent && 
        (<div className='relative'>
          <img className={`
          ${isPicDelete ? "blur" : ""}
          my-2 w-full rounded-lg
        object-cover max-h-[400px]`} src={tweet.imageContent}></img>
     
      <button 
      type="button"
      onClick={()=> setIsPicDelete(!isPicDelete)} className='absolute top-0 right-0 p-2 bg-white
      transition text-red-600 hover:scale-90 rounded-full'>
     
     {isPicDelete ?<MdOutlineSubdirectoryArrowLeft /> :   <FaTrashAlt />
 }
   
      </button>

      </div>)}

    </form>
  )
}

export default EditMode