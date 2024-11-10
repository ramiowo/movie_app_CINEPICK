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
  padding: ${mainStyle.pcPadding};
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

  .posterImg {
    max-width: 200px;
    margin-bottom: 20px;
  }
  .textWrap {
    width: 80%;

    h3 {
      font-size: 65px;
      font-weight: 700;
    }
    p {
      font-size: 20px;
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
      {data.map((movie, id) => (
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
                <p>{movie?.overview.slice(0, 100) + "..."}</p>
              </div>
            </MainWrap>
          </MainBanner>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
