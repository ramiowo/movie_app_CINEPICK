import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}
body{
    background-color: #151515;
}
img{
    width: 100%;
    display: block;
}
`;
