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
        style={{ zIndex: 20, paddingBottom: "30px" }}
        spaceBetween={10} // 슬라이드 사이 여백
        slidesPerView="9" // 화면에 보이는 슬라이드 수 자동 조정
        freeMode={true} // 드래그 모드 활성화
        modules={[Scrollbar]}
        scrollbar={{ draggable: true, hide: false }}
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
