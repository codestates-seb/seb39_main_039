import { createGlobalStyle } from "styled-components";
import "./assets/fonts/font.css";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
   ${reset}

   *{
      box-sizing: border-box;
   }

   body {
   font-family: -apple-system, Pretendard, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   }
 
`
export default GlobalStyle;
