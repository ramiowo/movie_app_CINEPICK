import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";

const Container = styled.div`
  padding: 100px ${mainStyle.pcPadding};
  @media screen and (max-width: 1024px) {
    padding: 20px ${mainStyle.tabletPadding};
  }
  @media screen and (max-width: 650px) {
    padding: 20px ${mainStyle.mobilePadding};
  }

  @media screen and (max-width: 430px) {
    padding: 20px ${mainStyle.smobilePadding};
  }
`;

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;
