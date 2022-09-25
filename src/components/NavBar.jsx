import React, { Fragment, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import "../styles/NavBarStyles.css";
import Movies from "./Movies";
import Trending from "./Trending";
import TvShows from "./TvShows";
import useDebounce from "../hooks/useDebounce";

export const Container = React.createContext();

function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [debounceValue] = useDebounce(inputValue, 1000);

  return (
    <Container.Provider value={{ debounceValue }}>
      <Fragment>
        <div className="nav_container">
          <div className="nav_options">
            <NavLink to="">
              <h1 className="nav_heading">NETFLIX</h1>
            </NavLink>
            <NavLink to="">
              <span>Movies</span>
            </NavLink>
            <NavLink to="/TvShows">
              <span>TvShows</span>
            </NavLink>
            <NavLink to="/Trending">
              <span>Trending</span>
            </NavLink>
          </div>
          <div className="search_container">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
              className="nav_input"
            />
            <HiSearch fontSize={21} id="search" />
          </div>
        </div>
        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trending" element={<Trending />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default NavBar;
