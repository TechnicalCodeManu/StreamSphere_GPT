import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from '../utils/constant';
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const topratedMovies = useSelector((store) => store.movies.topratedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topratedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;