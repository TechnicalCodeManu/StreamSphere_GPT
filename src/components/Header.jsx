import React from 'react'
import  { useEffect } from 'react'
import { addUser, removeUser } from '../utils/userSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {  useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import {useNavigate} from 'react-router-dom'
import {LOGO, SUPPORTED_LANGUAGES} from '../utils/constant'
import { toggleGptSearchView } from '../utils/gptSlice.jsx';
import { changeLanguage } from '../utils/configSlice.jsx';






const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);

  const handleSignout =()=>{
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error");
    });
};


const handleGptSearchClick =()=>{
//toggle
dispatch(toggleGptSearchView());


}


const handleLangchange = (e)=>{
dispatch(changeLanguage(e.target.value));

}




  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);





  return (<>
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img  className='w-44 mx-auto md:mx-0' src={LOGO} alt='not available' />
            {user && (

     
      
 
  <div className='flex p-2 justify-between'>

  {  showGptSearch && (
    <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLangchange}>

  {SUPPORTED_LANGUAGES.map((lang)=>(
    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>

  ))}
   
  </select>
  )
   }
  

  <button onClick={handleGptSearchClick} className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'>
  
  {showGptSearch? "HomePage":"GPT Search"}
  </button>
    <img className='hidden md:block w-12 h-12' src={user?.photoURL} alt='usericon' />
    <button  onClick={handleSignout} className='font-bold text-white '>(Sign Out)</button>
     
  </div>   
)}

 

  </div>






</>
  )
  
}

export default Header;