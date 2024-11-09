import styled from "styled-components";
import { BANNER_URL } from "../../../constant/imgUrl";

const MainBanner = styled.section`
  height: 90vh;
  background: url(${BANNER_URL}${(props) => props.$coverImg}) no-repeat center /
    cover;
  position: relative;
`;
const Overlay = styled.div``;
const BnnerPoster = styled.img``;
const TitleWrap = styled.div``;

const Banner = ({ data }) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomMovie = data[randomIndex];
  return (
    <>
      <MainBanner $coverImg={randomMovie?.backdrop_path || ""}>
        <Overlay />
        <BnnerPoster />
        <TitleWrap>
          <h3>{randomMovie?.title || "제목이 없습니다"}</h3>
          <p>{randomMovie.overview.slice(0, 100) + "..."}</p>
        </TitleWrap>
      </MainBanner>
    </>
  );
};

export default Banner;
