import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";
import { useEffect, useRef } from "react";

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
  z-index: 999;
  @media screen and (max-width: 1024px) {
    padding: 20px ${mainStyle.tabletPadding};
  }
  @media screen and (max-width: 650px) {
    height: 60px;
    padding: 20px ${mainStyle.mobilePadding};
  }

  @media screen and (max-width: 430px) {
    height: 40px;
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
  const headerRef = useRef();

  const scrollHandler = () => {
    const pageY = window.scrollY;
    const current = headerRef.current;

    if (pageY >= 300) {
      current.style.position = "fixed";
      current.style.backgroundColor = "rgba(0,0,0,0.5)";
      current.style.backdropFilter = "blur(10px)";
    } else {
      current.style.position = "absolute";
      current.style.backgroundColor = "transparent";
      current.style.backdropFilter = "blur(0px)";
    }
  };

  useEffect(() => {
    return window.addEventListener("scroll", scrollHandler);
  });
  return (
    <Container ref={headerRef}>
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
