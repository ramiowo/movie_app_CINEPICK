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
            <div>
              <Banner data={nowData} />
              <GenreSelector
                genres={genres}
                selectGenre={selectGenre}
                onSelectGenre={handleSelectGenre}
              />
              <Movies title="인기영화 순위" data={filter(popData)} />
              <Movies title="추천영화" data={filter(topData)} />
              <Movies title="현재상영작" data={filter(nowData)} />
              <Movies title="개봉예정작" data={filter(upData)} />
            </div>
          )}
          <TopButton />
        </>
      )}
    </div>
  );
};

export default Home;
