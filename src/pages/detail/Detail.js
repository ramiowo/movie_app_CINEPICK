import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useScrollTop from "../../lib/useScrollTop";
import { movieDetail, movieTrailer } from "../../api";
import Loading from "../../components/Loading";
import Wrapper from "../../components/Wrapper";
import PageTitle from "../../components/PageTitle";
import styled from "styled-components";
import { BANNER_URL, NO_IMG, POSTER_URL } from "../../constant/imgUrl";
import { FaPlay } from "react-icons/fa";
import { SlClose } from "react-icons/sl";

const Container = styled.section`
  display: flex;
  @media screen and (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
  /* justify-content: space-between; */
`;

const BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -5;
`;

const BgBlur = styled.div`
  width: 100%;
  height: 70vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  top: 16%;
  z-index: -3;
  border-top-right-radius: 30px;
  @media screen and (max-width: 650px) {
    top: 40%;
  }
`;

const Poster = styled.div`
  width: 100%;
  max-width: 500px;
  aspect-ratio: 2/3;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  @media screen and (max-width: 1440px) {
    max-width: 400px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 300px;
  }

  @media screen and (max-width: 650px) {
    max-width: 250px;
  }

  @media screen and (max-width: 430px) {
    max-width: 200px;
  }
`;
const TitleWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
  margin-left: 5%;
  @media screen and (max-width: 650px) {
    margin-top: 20px;
    width: 100%;
    margin-left: 0;
    display: flex;
    align-items: center;
  }
  h3 {
    font-size: 68px;
    font-weight: 700;
    margin-bottom: 40px;
    @media screen and (max-width: 1440px) {
      font-size: 56px;
    }

    @media screen and (max-width: 1024px) {
      font-size: 48px;
    }

    @media screen and (max-width: 650px) {
      margin-bottom: 15px;
      font-size: 36px;
    }

    @media screen and (max-width: 430px) {
      margin-bottom: 10px;
      font-size: 28px;
    }
  }
  h4 {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    margin-bottom: 10px;
    span {
      margin-left: 10px;
      font-size: 22px;
      color: #fff;
      opacity: 0.9;
    }
  }
  ul {
    max-width: 600px;
    display: flex;
    font-size: 18px;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      background-color: rgba(201, 64, 64, 0.4);
      border-radius: 20px;
      margin: 10px 8px 20px 0;
    }
  }
  p {
    font-size: 20px;
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 180px;
  height: 68px;
  background-color: #c94040;
  border-radius: 50px;
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px;
  cursor: pointer;

  @media (max-width: 1440px) {
    font-size: 28px;
    top: -25px;
  }

  @media (max-width: 1024px) {
    font-size: 26px;
    top: -20px;
  }

  @media (max-width: 650px) {
    font-size: 24px;
    top: -15px;
  }

  @media (max-width: 430px) {
    max-width: 100vw;
    max-height: 70vh;
  }
`;

const TrailerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
`;

const TrailerModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 90%;
  height: 500px;
  max-width: 900px;

  border-radius: 20px;
  @media (max-width: 1440px) {
    max-width: 900px;
    max-height: 85vh;
  }

  @media (max-width: 1024px) {
    max-width: 80vw;
    max-height: 80vh;
  }

  @media (max-width: 650px) {
    max-width: 90vw;
    max-height: 75vh;
  }

  @media (max-width: 430px) {
    max-width: 100vw;
    max-height: 50vh;
  }
`;

const FrameWrap = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

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
              <BgBlur />
              <Poster
                style={{
                  background: `url(${
                    data.poster_path ? POSTER_URL + data.poster_path : NO_IMG
                  }) no-repeat center / cover`,
                }}
              />
              <TitleWrap>
                <h3>{data.title}</h3>
                <h4>
                  평점
                  <span> {Math.round(data.vote_average)} </span>
                </h4>
                <h4>
                  상영시간<span> {data.runtime} 분 </span>
                </h4>
                <h4>
                  개봉일<span> {data.release_date} </span>
                </h4>

                <ul>
                  {data.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <p>{data.overview}</p>
                <Button onClick={handleTrailerButton}>
                  <FaPlay style={{ marginRight: "7px", fontSize: "24px" }} />
                  <span>예고편 보기</span>
                </Button>
              </TitleWrap>
            </Container>
          </Wrapper>

          {isTrailer && (
            <>
              <TrailerOverlay onClick={() => setIsTrailer(false)} />
              <TrailerModal>
                <CloseButton onClick={() => setIsTrailer(false)}>
                  <SlClose />
                </CloseButton>
                <FrameWrap>
                  <Iframe
                    src={trailerUrl}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }}
                  ></Iframe>
                </FrameWrap>
              </TrailerModal>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Detail;
