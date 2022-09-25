import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "./NavBar";
import image from "./NoImage.png";

function TvShows(props) {
  const { debounceValue } = useContext(Container);
  const input = debounceValue;
  const [showData, setShowData] = useState([]);
  const Api = "https://api.themoviedb.org/3/discover/tv";
  const searchApi = "https://api.themoviedb.org/3/search/tv";
  const Images = "https://image.tmdb.org/t/p/w500/";

  const TvShowsData = async () => {
    const { data } = await axios.get(input ? searchApi : Api, {
      params: {
        api_key: "9e569b9f8252900c592f23b7fd86fd23",
        query: input,
      },
    });
    const tvShows = data.results;
    setShowData(tvShows);
  };

  useEffect(() => {
    TvShowsData();
  }, [input]);

  console.log(showData);

  return (
    <div className="movies_container">
      {showData.map((show, index) => {
        return (
          <div className="movie-card-container" key={index}>
            <div className="movie-card">
              <img
                src={show.backdrop_path ? `${Images}${show.backdrop_path}` : image}
                alt="Moviecard"
                className="movie-card-img"
              />
              <h3 className="movie-card-title">{show.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TvShows;
