import { useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  h2 {
    font-size: 60px;
    font-weight: 800;
    color: #dc5a5a;
    opacity: 0.6;
  }
  p {
    margin-top: 40px;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.6;
    @media screen and (max-width: 650px) {
      font-size: 20px;
    }
  }
  span {
    margin: 20px 0;
    font-size: 30px;
    line-height: 1.6;
    @media screen and (max-width: 650px) {
      font-size: 18px;
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  button {
    all: unset;
    width: 140px;
    height: 60px;
    background-color: #dc5a5a;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 40px;
    text-align: center;
  }
`;

const PageNotFound = () => {
  const nav = useNavigate();
  return (
    <Wrapper>
      <Container>
        <h2>404 ERROR</h2>
        <p>죄송합니다.현재 찾을 수 없는 페이지를 요청 하셨습니다.</p>
        <span>
          존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경,
          삭제되어 찾을 수 없습니다.
        </span>
        <BtnWrap>
          <button onClick={() => nav(-1)}>이전으로</button>
          <button
            onClick={() => nav("/")}
            style={{ backgroundColor: "#dbdbdb", color: "#333" }}
          >
            메인으로
          </button>
        </BtnWrap>
      </Container>
    </Wrapper>
  );
};

export default PageNotFound;
