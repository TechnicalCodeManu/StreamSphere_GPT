import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import usericon from '../assets/programmer.png';
import { BG_URL } from '../utils/constant';




const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();





  const name = useRef(null);
  const email = useRef(null);

  const password = useRef(null);

  const togglesigninform = () => {
    setIsSignInForm(!isSignInForm);

  }

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: usericon,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className='w-full-screen '>

      <Header />
      <div className='absolute'>
        <img className='h-screen w-screen  object-cover' src={BG_URL} alt="not available" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-80">

        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign in" : "Sign up"}</h1>
        {!isSignInForm && <input ref={name} type='text' placeholder='Enter Full Name' className='p-4 my-4 w-full bg-gray-700' />}

        <input ref={email} type='text' placeholder='Email address' className='p-4 my-4 w-full bg-gray-700' />
        <input ref={password} type='password' placeholder='Enter Password' className='p-4 my-4 w-full bg-gray-700' />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick} >{isSignInForm ? "Sign in" : "Sign up"}</button>

        <p className='py-4 cursor-pointer' onClick={togglesigninform}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered ? Sign in Now"}</p>




      </form>
    </div>
  )
}

export default Login;