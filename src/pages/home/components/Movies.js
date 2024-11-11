import { Swiper, SwiperSlide } from "swiper/react";
import { POSTER_URL } from "../../../constant/imgUrl";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { mainStyle } from "../../../GlobalStyled";

const Container = styled.section`
  padding: 0 ${mainStyle.pcPadding};
`;
const Title = styled.div`
  font-size: 30px;
  margin-top: 120px;
  margin-bottom: 40px;
  font-weight: 600;
`;
const Con = styled.div`
  width: 100%;
  overflow: hidden;
  /* position: relative; */
  img {
    max-width: 310px;
    max-height: 430px;
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
  font-size: 300px;
  position: absolute;
  bottom: 0;
  left: -30px;
  z-index: -1;
  -webkit-text-stroke: 7px rgba(255, 255, 255, 0.6);
  color: rgba(255, 255, 255, 0);
  font-weight: 600;
`;

const Movies = ({ title, data, isRanked, icon }) => {
  const randomData = data ? [...data].sort(() => Math.random() - 0.5) : [];

  const params = {
    spaceBetween: isRanked ? 10 : 10,
    slidesPerView: isRanked ? 3.6 : 4.7,
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
