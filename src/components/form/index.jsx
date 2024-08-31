import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Loader from '../Loader';






const Form = ({ user }) => {

    const [isLoading, setIsLoading] = useState(false);

    //tweets collection
    const tweetsCol = collection(db, "tweets");
    //adds image document to storage
    const uploadImage = async (file) => {
        // if document type is image stop the function
        if (!file?.type.startsWith("image")) return null;
        //loadding starts here
        setIsLoading(true)
        // select the location which image will be send
        const imageRef = ref(storage, v4() + file.name)
        // upload image
        try {
            await uploadBytes(imageRef, file)
            // return the document url from the store
            return await getDownloadURL(imageRef)
        } catch (err) {
            toast.error(" Sorry! An error occured while aploading photo")
            return null;

        }

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // get unputs data
        const text = e.target[0].value.trim();

        const file = e.target[1].files[0];

        //if there is no text or img send warning
        if (!text && !file) return toast.info("pleace enter a content", {
            position: "bottom-right"
        })

        try {
            // if there is img? add the storage
            const url = await uploadImage(file);

            // add documents to the collection
            await addDoc(tweetsCol, {
                textContent: text,
                imageContent: url,
                createdAt: serverTimestamp(),
                likes: [],
                isEdited: false,
                user: {
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL
                }
            });
        } catch (err) {
            toast.error("An error occured while tweeting" + err)
            console.log(err)
        }


        //uploading ends
        setIsLoading(false)
        //reset form
        e.target.reset();
    }



    return (
        <form onSubmit={handleSubmit} className='flex gap-3 border-b border-zinc-600 p-4' >
            <img className='rounded-full h-[35px] md:h-[54px] mt-1' src={user?.photoURL} alt="" />

            <div className='w-full'>
                <input className='w-full mb-2 mt-1 bg-transparent outline-none
        md:text-lg'
                    placeholder='Whats happening?' type="text" />

                <div className='flex justify-between items-center'>


                    <label className='text-lg transition p-4 cursor-pointer
        rounded-full hover:bg-gray-800' htmlFor="icon">
                        <CiImageOn />

                        <input className='hidden' id="icon" type="file" />
                    </label>


                    <button className='bg-blue-600 justify-center
            px-4 py-2 min-w-[85px] min-h-[40px] rounded-full
            transition hover:bg-blue-800'>{isLoading ? <Loader /> : "Tweet"}</button>
                </div>
            </div>
        </form>
    )
}

export default  React.memo(Form)