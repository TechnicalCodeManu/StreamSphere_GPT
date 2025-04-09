import React from 'react'
import GptSearchBar from './GptSearchBar'
import { BG_URL } from '../utils/constant'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
  
        <img  className='h-screen  w-screen object-cover' src={BG_URL} alt="not available" />
      </div>
     
      <div className="">

   <GptSearchBar/> 
   <GptMovieSuggestions/>
 
  </div>
    </>
  )
}

export default GptSearch;