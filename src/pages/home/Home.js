import { useEffect, useState } from "react";
import { nowPlaying, popular, topRated, upComming } from "../../api";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet-async";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import TopButton from "../../components/TopButton";

const Home = () => {
  const [nowData, setNowData] = useState();
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setUpData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // useScrollTop();

  useEffect(() => {
    (async () => {
      try {
        const [now, pop, top, up] = await Promise.all([
          nowPlaying(),
          popular(),
          topRated(),
          upComming(),
        ]);

        setNowData(now.results);
        setPopData(pop.results);
        setTopData(top.results);
        setUpData(up.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
              <Movies title="인기영화 순위" data={popData} />
              <Movies title="추천영화" data={topData} />
              <Movies title="현재상영작" data={nowData} />
              <Movies title="개봉예정작" data={upData} />
            </div>
          )}
          <TopButton />
        </>
      )}
    </div>
  );
};

export default Home;
