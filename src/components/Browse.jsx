import React from 'react'
import Header from './Header';
import MainContainer1 from './MainContainer1';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {

  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);
  useNowPlayingMovies();

  usePopularMovies();

  useTrendingMovies();

  useTopRatedMovies();
  return (
    <>
      <Header/>  


      {
        showGptSearch ?  (<GptSearch/>) : (<>  <MainContainer1/> <SecondaryContainer/>  </>  ) 
 
      }
    </>
  )
}

export default Browse;