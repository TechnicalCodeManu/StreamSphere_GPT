import React, { useRef } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import openai from '../utils/openai';


const GptSearchBar = () => {

  const dispatch = useDispatch();
  const searchtext = useRef(null);



  const langKey = useSelector((store) => store.config.lang);


  //search movie in tmdb
  const SearchMovieTMDB =  async(movie)=>{
const data = await fetch (`https://api.themoviedb.org/3/search/movie?query=`+ movie +`&include_adult=false&language=en-US&page=1`, API_OPTIONS);

const json = await data.json();

return json.results;

  };




  const handleGptSearch = async() => {


   console.log(searchtext.current.value);
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchtext.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",


      });
  
    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }


    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => SearchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };





  return (
    <div className="pt-[45%] md:pt-[20%] flex justify-center">
 <form  className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=> e.preventDefault()}>
 <input  ref={searchtext} type="text" className="p-4 m-4 col-span-9 bg-white rounded-lg"  placeholder={lang[langKey].gptSearchPlaceholder}/>
        
        
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearch} >  {lang[langKey].search} </button>
         </form>


    </div>
  )
}

export default GptSearchBar;