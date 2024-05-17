/* eslint-disable react/prop-types */

import { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal/MovieModal";
import "./Row.css";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };
  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>

      {modalOpen ? (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  );
};
//  전개 구문인 {...movieSelected}를 사용하면 movieSelected 객체의 모든 속성을 MovieModal 컴포넌트의 props로 전달할 수 있습니다.
export default Row;
