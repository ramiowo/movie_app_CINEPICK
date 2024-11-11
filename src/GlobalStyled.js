import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "8%",
  tabletPadding: "40px",
  mobilePadding: "20px",
  smobilePadding: "14px",
};

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}
body{
    font-family: "Noto Sans KR", sans-serif;
    background-color: #151515;
    letter-spacing: -1px;
    color: #FFFFFF;
}
a{
    color: #FFFFFF;
    text-decoration: none;
}
img{
    width: 100%;
    display: block;
}
`;
