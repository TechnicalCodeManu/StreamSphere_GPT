import {  useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBg = ({movieId}) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

 useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      <iframe
        className="w-[100dvw] aspect-video min-h-[30rem] lg:mt-[-10px] mt-[-25px] "
        src={
        `https://www.youtube.com/embed/` 
        +trailerVideo?.key +
          `?&autoplay=1&mute=1`
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;  web-share">
      </iframe>
    </div>
  );
};
  

export default VideoBg;