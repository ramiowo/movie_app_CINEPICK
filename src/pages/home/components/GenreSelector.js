import styled from "styled-components";
import { mainStyle } from "../../../GlobalStyled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const BtnWrap = styled.div`
  margin-top: 80px;
  width: 100%;
  overflow: hidden;
  padding: 0 ${mainStyle.pcPadding};
  @media screen and (max-width: 650px) {
    margin-top: 30px;
  }
`;

// const GenreButtons = styled.div`
//   max-width: 100%;
//   overflow-x: auto;
//   white-space: nowrap;
//   display: flex;
//   padding: 0 ${mainStyle.pcPadding};
// `;
const GenreButton = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 150px;
  height: 60px;
  border: 2px solid #dc5a5a;
  border-radius: 50px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.2);
  color: #dc5a5a;

  @media screen and (max-width: 1024px) {
    width: 130px;
    height: 55px;
    font-size: 17px;
  }

  @media screen and (max-width: 650px) {
    width: 120px;
    height: 50px;
    font-size: 16px;
  }

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
`;

const CunstomScroll = styled(Swiper)`
  cursor: pointer;
  .swiper-scrollbar {
    height: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  .swiper-scrollbar-drag {
    background-color: rgba(220, 90, 90, 0.6);
  }
`;

const GenreSelector = ({ genres, selectGenre, onSelectGenre }) => {
  return (
    <BtnWrap>
      <CunstomScroll
        // style={{ zIndex: 20, paddingBottom: "30px" }}
        // spaceBetween={20}
        // slidesPerView={9}
        // freeMode={true}
        // modules={[Scrollbar]}
        // scrollbar={{ draggable: true, hide: false }}
        // breakpoints={{
        //   1440: {
        //     spaceBetween: 16,
        //     slidesPerView: 7,
        //   },
        //   1024: { spaceBetween: 12, slidesPerView: 5 },
        //   650: {
        //     spaceBetween: 10,
        //     slidesPerView: 4,
        //   },
        //   480: { spaceBetween: 8, slidesPerView: 3 },
        // }}
        style={{ zIndex: 20, paddingBottom: "30px" }}
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        modules={[Scrollbar]}
        scrollbar={{ draggable: true, hide: false }}
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 8 },
          650: { slidesPerView: 4, spaceBetween: 10 },
          1024: { slidesPerView: 6, spaceBetween: 12 },
          1440: { slidesPerView: 7, spaceBetween: 16 },
          1900: { slidesPerView: 9, spaceBetween: 20 },
        }}
      >
        {/* <GenreButtons> */}
        <SwiperSlide>
          <GenreButton
            onClick={() => onSelectGenre(null)}
            $isActive={!selectGenre}
          >
            전체보기
          </GenreButton>
        </SwiperSlide>
        {genres &&
          genres.map((genre) => (
            <SwiperSlide key={genre.id}>
              <GenreButton
                onClick={() => onSelectGenre(genre.id)}
                $isActive={selectGenre === genre.id}
              >
                {genre.name}
              </GenreButton>
            </SwiperSlide>
          ))}
        {/* </GenreButtons> */}
      </CunstomScroll>
    </BtnWrap>
  );
};

export default GenreSelector;
