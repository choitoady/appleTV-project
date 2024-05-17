import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.fetchNowPlaying);
    console.log(response);
    //여러 영화중 영화 하나의 id를 가져오기
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
    console.log(movieDetail);
  };

  //data: movieDetail => 변수 별칭  -> 변수이름이 data 또는 movieDetail이라는 뜻
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };
// 100자 넘지 않게 하는 함수  
//Optional Chaining>>  str?.length는 str이 null 또는 undefined가 아닌 경우에만 str.length를 평가합니다. 만약 str이 null 또는 undefined라면 undefined를 반환합니다.
  if (!movie) {
    return <div>loading..</div>;
  }
  if (!isClicked) {
    return (
      <div
        className="banner"
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            {movie.videos?.results[0]?.key ? (
              <button
                className="banner_button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : null}
          </div>  
          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>
        <div className="banner--fadeBottom" />
      </div>
    );  //isClicked -> true일 때 -> !isClicked는 false 가 되고, isClicked가 false이면 !isClicked는 true가 된다.
  } else {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>X</button>
      </>
    );
  }
};

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Banner;
