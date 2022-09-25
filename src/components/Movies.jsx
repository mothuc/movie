import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "./NavBar";
import image from "./NoImage.png";

function Movies() {
  const { debounceValue } = useContext(Container);
  const input = debounceValue;
  const [moviesData, setMoviesData] = useState([]);
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const Images = "https://image.tmdb.org/t/p/w500/";

  const MovieCall = async () => {
    const { data } = await axios.get(Api, {
      params: {
        api_key: "9e569b9f8252900c592f23b7fd86fd23",
        query: input,
      },
    });
    const results = data.results;
    setMoviesData(results);
  };
  useEffect(() => {
    MovieCall();
  }, [input]);
  return (
    <Fragment>
      <div className="movies_container">
        {moviesData.length > 0 &&
          moviesData.map((movie, index) => (
            <div className="movie-card-container">
              <div className="movie-card" key={index}>
                <img
                  src={movie.backdrop_path ? `${Images}${movie.backdrop_path}` : image}
                  alt=""
                  className="movie-card-img"
                />
                <h3 className="movie-card-title">{movie.title}</h3>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
}

export default Movies;
