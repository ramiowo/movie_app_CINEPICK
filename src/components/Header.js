import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.header`
  width: 100%;
  height: 80px;
  padding: 20px ${mainStyle.pcPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
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

const Logo = styled.div`
  margin-top: -8px;

  img {
    width: 120px;
    height: 28px;
    @media screen and (max-width: 650px) {
      width: 100px;
      height: 23px;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  li {
    margin-left: 140px;
    font-size: 18px;
    @media screen and (max-width: 1024px) {
      margin-left: 100px;
    }
    @media screen and (max-width: 650px) {
      margin-left: 50px;
      font-size: 16px;
    }

    @media screen and (max-width: 430px) {
      margin-left: 40px;
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <Logo>
        <Link to={"/"}>
          <img src={logo} alt="Cinepick logo"></img>
        </Link>
      </Logo>

      <Menu>
        <li>
          <Link to={"/search"}>SEARCH</Link>
        </li>
        <li>
          <Link to={"/login"}>LOGIN</Link>
        </li>
      </Menu>
    </Container>
  );
};

export default Header;
