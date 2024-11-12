import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
`;
const Copyright = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 30px;
`;

const Footer = () => {
  return;
  <FooterContainer>
    <Copyright>
      &copy; {new Date().getFullYear()} CINEPICK. All rights reserved.
    </Copyright>
  </FooterContainer>;
};

export default Footer;
