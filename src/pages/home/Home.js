import { useEffect, useState } from "react";
import {
  genresMovie,
  nowPlaying,
  popular,
  topRated,
  upComming,
} from "../../api";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet-async";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import TopButton from "../../components/TopButton";
import GenreSelector from "./components/GenreSelector";
import useScrollTop from "../../lib/useScrollTop";
import styled from "styled-components";
import { PiRankingLight } from "react-icons/pi";
import { CiPlay1 } from "react-icons/ci";
import { BsHandThumbsUp } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";

const Container = styled.section`
  width: 100%;
`;

const LineGradient = styled.div`
  width: 100%;
  height: 270px;
  position: absolute;
  top: 75%;
  background: rgb(21, 21, 21);
  background: linear-gradient(
    180deg,
    rgba(21, 21, 21, 0.1) 0%,
    rgba(21, 21, 21, 0.8) 30%,
    rgba(21, 21, 21, 1) 60%,

    rgba(21, 21, 21, 0.4) 100%
  );
  filter: blur(8px);
  z-index: 10;
  @media screen and (max-width: 650px) {
    height: 170px;
    top: 65%;
  }
`;

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [selectGenre, setSelectGenre] = useState(null);
  const [nowData, setNowData] = useState();
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setUpData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useScrollTop();

  useEffect(() => {
    (async () => {
      try {
        const [now, pop, top, up, genreData] = await Promise.all([
          nowPlaying(),
          popular(),
          topRated(),
          upComming(),
          genresMovie(),
        ]);

        setNowData(now.results);
        setPopData(pop.results);
        setTopData(top.results);
        setUpData(up.results);
        setGenres(genreData.genres);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const filter = (movies) => {
    return selectGenre
      ? movies.filter((movie) => movie.genre_ids.includes(selectGenre))
      : movies;
  };

  const handleSelectGenre = (genreId) => {
    setSelectGenre(genreId);
    console.log("Selected Genre ID", genreId);
  };
  console.log(nowData);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Home | CINEPICK</title>
          </Helmet>

          {nowData && (
            <Container>
              <Banner data={nowData} />
              <LineGradient />
              <GenreSelector
                genres={genres}
                selectGenre={selectGenre}
                onSelectGenre={handleSelectGenre}
              />
              <Movies
                title="시네픽 Best 영화 인기순위 "
                icon={<PiRankingLight style={{ color: "#DC5A5A" }} />}
                data={filter(popData)}
                isRanked={true}
              />
              <Movies
                title="믿고 보는 시네 Pick’s 추천영화"
                icon={<BsHandThumbsUp style={{ color: "#DC5A5A" }} />}
                data={filter(topData)}
                isRanked={false}
              />
              <Movies
                title="Right Now! 현재 상영 영화"
                data={filter(nowData)}
                icon={<CiPlay1 style={{ color: "#DC5A5A" }} />}
                isRanked={false}
              />
              <Movies
                title="Comming Soon! 개봉 예정 영화"
                icon={<IoTimeOutline style={{ color: "#DC5A5A" }} />}
                data={filter(upData)}
                isRanked={false}
              />
            </Container>
          )}
          <TopButton />
        </>
      )}
    </div>
  );
};

export default Home;
