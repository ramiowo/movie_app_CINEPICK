import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useScrollTop from "../../lib/useScrollTop";
import { movieDetail, movieTrailer } from "../../api";
import Loading from "../../components/Loading";
import Wrapper from "../../components/Wrapper";
import PageTitle from "../../components/PageTitle";
import styled from "styled-components";
import { BANNER_URL, NO_IMG, POSTER_URL } from "../../constant/imgUrl";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
`;

const BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${BANNER_URL}${(props) => props.$coverImg}) no-repeat center /
    cover;
  filter: blur(20px);
  z-index: -10;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -5;
`;

const Poster = styled.div`
  width: 45%;
  height: 800px;
`;
const TitleWrap = styled.section`
  width: 53%;
`;
const TrailerModal = styled.div``;

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isTrailer, setIsTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useScrollTop();

  useEffect(() => {
    (async () => {
      try {
        const detailData = await movieDetail(id);
        setData(detailData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleTrailerButton = async () => {
    try {
      const trailer = await movieTrailer(id);
      const yotubeTrailer = trailer?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (yotubeTrailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${yotubeTrailer.key}`);
        setIsTrailer(true);
      } else {
        alert("예고편이 없습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={data?.title} />

          <Wrapper>
            <Container>
              <BackgroundImg $coverImg={data?.backdrop_path || ""} />
              <Overlay />
              <Poster
                style={{
                  background: `url(${
                    data.poster_path ? POSTER_URL + data.poster_path : NO_IMG
                  }) no-repeat center / cover`,
                }}
              />
              <TitleWrap>
                <h3>{data.title}</h3>
                <span>{Math.round(data.vote_average)} 점 </span> •
                <span> {data.runtime} 분 </span> •{" "}
                <span> {data.release_date} </span>
                <ul>
                  {data.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <p>{data.overview}</p>
                <button onClick={handleTrailerButton}>예고편 보기</button>
              </TitleWrap>
            </Container>
          </Wrapper>

          {isTrailer && (
            <TrailerModal>
              <iframe
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button onClick={() => setIsTrailer(false)}>닫기</button>
            </TrailerModal>
          )}
        </>
      )}
    </>
  );
};

export default Detail;
