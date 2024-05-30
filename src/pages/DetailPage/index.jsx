import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";
import { imageBasePath } from "../../components/constant";
import "./index.css";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching movie data:", err);
      }
    }
    fetchData();
  }, [movieId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movie) return <div>Loading...</div>;

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const genreNames = movie.genres.map((genre) => genre.name);
  const result = genreNames.join("/");

  return (
    <section className="detail__container">
      <img
        className="detail__img"
        src={`${imageBasePath}${movie.backdrop_path}`}
        alt="detail"
      />
      <div className="detail__description">
        <h2>
          {movie.title} ({releaseYear})
        </h2>
        <p>{movie.overview}</p>
        <div className="detail__additional-info">
          <span>
            <span className="vote_average"> ★ </span>평점: {movie.vote_average}
          </span>
          <span>장르: {result}</span>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
