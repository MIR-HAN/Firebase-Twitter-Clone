import React, { useState } from 'react';
import { createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
    sendPasswordResetEmail,
  signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Login = () => {

  const [isSignUp, setIsSignUp] = useState(true);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  //sending form
  const handleSubmit = (e) => {
    e.preventDefault();


    if (isSignUp) {
      //if sign up mood true : sign up
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Account created successfully")
          navigate("/home")
        }).catch((err) => {
          toast.error("An error occurred" + err.code)
        })
    } else {
      //sign in mood
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Logged in successfully")
          navigate("/home")
        }).catch((err) => {
          toast.error("An error occurred" + err.code)
          if (err.code === 'auth/invalid-credential') setIsError(true)

        })

    }

  };

  // send password reset email
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Password reset mail has been sent. Check your email!"))
      .then((err) => toast.error("An error occured" + err.code))
  }

  //sign in with Google
  const handleGoogle =()=>{
    signInWithPopup(auth,provider)
    .then(() => {
      toast.success("Logged in successfully")
      navigate("/home")
    }).catch((err) => 
      toast.error("An error occurred" + err.code))

  }


  return (
    <section className='h-screen grid place-items-center'>
      <div className='bg-black flex flex-col gap-10 py-16 px-32
      rounded-lg'>
        <div className='flex justify-center'>

          <img className='h-[60px]' src="/x-logo.webp" />
        </div>

        <h1 className='text-lg font-bold text-center'>Happening now
          <br />Join today.</h1>

        <button onClick={handleGoogle} className='bg-white flex items-center py-2 px-10 rounded-full
gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap'>
          <img className='h-[20px]' src="/google-logo.svg" />
          Sign up with Google
        </button>

        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label >Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className='text-black rounded mt-1 p-2 outline-none shadow-lg
  focus:shadow-[gray]' type="text" />

          <label className='mt-5'>Password</label>
          <input onChange={(e) => setPass(e.target.value)} className='text-black rounded mt-1 p-2 outline-none shadow-lg
  focus:shadow-[gray]' type="password" />

          <button className='mt-10 bg-white text-black rounded-full p-1 font-bold
  transition hover:bg-gray-300'>{isSignUp ? "Sign Up" : "Sign In"}</button>

          <p onClick={() => setIsSignUp(!isSignUp)} className='mt-5'>
            <span className='text-gray-500'>{isSignUp ? "Already have an account" : "Dont you have an account"}</span>
            <span className='ms-2 text-blue-500 cursor-pointer'>{isSignUp ? "Sign In" : "Sign Up"}</span>
          </p>

        </form>
        {isError && <p onClick={handleReset} className='text-red-500 text-center cursor-pointer'>Forget password ?</p>}

      </div>
    </section>
  )
}

export default Login