import { Swiper, SwiperSlide } from "swiper/react";
import { POSTER_URL } from "../../../constant/imgUrl";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { mainStyle } from "../../../GlobalStyled";

const Container = styled.section`
  padding: 0 ${mainStyle.pcPadding};
  @media screen and (max-width: 1024px) {
    padding: 0 ${mainStyle.tabletPadding};
  }
  @media screen and (max-width: 650px) {
    padding: 0 ${mainStyle.mobilePadding};
  }

  @media screen and (max-width: 430px) {
    padding: 0 ${mainStyle.smobilePadding};
  }
`;
const Title = styled.div`
  font-size: 30px;
  margin-top: 120px;
  margin-bottom: 40px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  /* justify-content: center; */
  @media screen and (max-width: 1024px) {
    margin-top: 60px;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 650px) {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;
const Con = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
  img {
    max-width: 310px;
    aspect-ratio: 2 / 3;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  ${({ isRanked }) =>
    isRanked &&
    css`
      margin-bottom: 20px; /* 간격을 추가 */
      padding-left: 80px; /* 패딩을 추가하여 간격을 조절 */
    `}
`;

const Rank = styled.div`
  font-size: 260px;
  position: absolute;
  bottom: -10px;
  left: -5px;
  z-index: -1;
  -webkit-text-stroke: 7px rgba(255, 255, 255, 0.6);
  color: rgba(255, 255, 255, 0);
  font-weight: 600;
  @media screen and (max-width: 1440px) {
    font-size: 200px;
  }
  @media screen and (max-width: 1024px) {
    -webkit-text-stroke: 5px rgba(255, 255, 255, 0.6);
    font-size: 160px;
    left: 15px;
    bottom: -5px;
  }
  @media screen and (max-width: 650px) {
    -webkit-text-stroke: 3px rgba(255, 255, 255, 0.6);
    font-size: 120px;
    left: 30px;
  }
  @media screen and (max-width: 430px) {
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.6);
    font-size: 60px;
    left: 40px;
  }
`;

const Movies = ({ title, data, isRanked, icon }) => {
  const randomData = data ? [...data].sort(() => Math.random() - 0.5) : [];

  const params = {
    spaceBetween: 10,
    slidesPerView: 1.6,
    breakpoints: {
      1440: { slidesPerView: isRanked ? 3.6 : 4.5, spaceBetween: 16 },
      1024: { slidesPerView: isRanked ? 3.2 : 4, spaceBetween: 12 },
      650: { slidesPerView: isRanked ? 2.6 : 2.3, spaceBetween: 10 },
      430: { slidesPerView: isRanked ? 1.6 : 2, spaceBetween: 8 },
    },
  };

  return (
    <Container>
      <Title>
        {icon}
        {title}
      </Title>
      <Swiper {...params}>
        {randomData &&
          randomData.map(({ id, poster_path, title }, index) => (
            <SwiperSlide key={id}>
              <Con isRanked={isRanked}>
                {isRanked && <Rank>{index + 1}</Rank>}
                <Link to={`detail/${id}`}>
                  <img src={POSTER_URL + poster_path} alt={title} />
                </Link>
              </Con>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
