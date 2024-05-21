import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { imageBasePath } from "../../components/constant";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovies(response.data);
    }
    fetchData;
  }, [movieId]);

  if (!movies) return null;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`${imageBasePath}${movies.backdrop_path}`}
        alt="modal__poster-img"
      />
    </section>
  );
};

export default DetailPage;
