import { Swiper, SwiperSlide } from "swiper/react";
import { POSTER_URL } from "../../../constant/imgUrl";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../../../GlobalStyled";

const Container = styled.section`
  padding: 0 ${mainStyle.pcPadding};
`;
const Title = styled.div`
  font-size: 30px;
  margin-top: 120px;
  margin-bottom: 55px;
`;
const Con = styled.div`
  width: 100%;

  overflow: hidden;
  img {
    max-width: 310px;
    max-height: 430px;
    width: 100%;
    object-fit: cover;
  }
`;

const Movies = ({ title, data }) => {
  const randomData = data ? [...data].sort(() => Math.random() - 0.5) : [];

  const params = {
    spaceBetween: 10,
    slidesPerView: 4.7,
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Swiper {...params}>
        {randomData &&
          randomData.map(({ id, poster_path, title }) => (
            <SwiperSlide key={id}>
              <Con>
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
