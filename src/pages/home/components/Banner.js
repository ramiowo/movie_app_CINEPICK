import styled from "styled-components";
import { BANNER_URL, POSTER_URL } from "../../../constant/imgUrl";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { mainStyle } from "../../../GlobalStyled";

const MainBanner = styled.section`
  height: 90vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${mainStyle.pcPadding};
  @media screen and (max-width: 1024px) {
    padding: 0 ${mainStyle.tabletPadding};
  }
  @media screen and (max-width: 650px) {
    padding: 0 ${mainStyle.mobilePadding};
    height: 70vh;
  }

  @media screen and (max-width: 430px) {
    padding: 0 ${mainStyle.smobilePadding};
  }
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
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const MainWrap = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 650px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 0;
  }

  .posterImg {
    width: 40%;
    border-radius: 20px;
    max-width: 300px;
    margin-bottom: 20px;
  }
  .textWrap {
    width: 60%;
    margin-left: 80px;
    @media screen and (max-width: 650px) {
      width: 100%;
      margin-left: 0;
    }

    h3 {
      font-size: 65px;
      font-weight: 700;
      margin-bottom: 20px;
      @media screen and (max-width: 1024px) {
        font-size: 45px;
        margin-bottom: 15px;
      }
      @media screen and (max-width: 650px) {
        font-size: 38px;
      }
    }
    h4 {
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 5px;
      color: rgba(255, 255, 255, 0.8);
      span {
        margin-left: 8px;
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
        font-weight: 600;
      }
      @media screen and (max-width: 650px) {
        font-size: 16px;
      }
    }
    p {
      margin-top: 20px;
      font-size: 20px;
      opacity: 0.8;
      line-height: 1.6;
      @media screen and (max-width: 1024px) {
        font-size: 18px;
      }

      @media screen and (max-width: 650px) {
        font-size: 16px;
      }
    }
  }
`;

const Banner = ({ data }) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomMovie = data[randomIndex];

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
    >
      {data.slice(0, 5).map((movie, id) => (
        <SwiperSlide key={id}>
          <MainBanner>
            <BackgroundImg $coverImg={movie?.backdrop_path || ""} />
            <Overlay />
            <MainWrap>
              <img
                className="posterImg"
                src={`${POSTER_URL}${movie?.poster_path}`}
                alt={movie?.title}
              />
              <div className="textWrap">
                <h3>{movie?.title || "제목이 없습니다"}</h3>
                <h4>
                  평점<span>{Math.round(movie?.vote_average)}</span>
                </h4>

                <p>
                  {movie?.overview.slice(0, 100) + "..." || "내용이 없습니다."}
                </p>
              </div>
            </MainWrap>
          </MainBanner>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
