import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import styled from "styled-components";

const Container = styled.header`
  width: 100%;
  height: 80px;
  padding: 20px 160px;
`;

const Logo = styled.div`
  width: 145px;
  height: 33px;
`;

const Header = () => {
  return (
    <Container>
      <Logo>
        <Link to={"/"}>
          <img src={logo} alt="Cinepick logo"></img>
        </Link>
      </Logo>
    </Container>
  );
};

export default Header;
