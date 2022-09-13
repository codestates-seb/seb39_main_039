import { createGlobalStyle } from "styled-components";
import "./assets/fonts/font.css";
import colorVariables from "./assets/style/colorVariables";
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
   background: var(--gray-100);
   letter-spacing: -.050em;
   }

   :root {
      ${colorVariables}
   }

   a{
      text-decoration: none;
   }

   button {
      cursor: pointer;
   }

   .container{
      max-width:465px;
      margin:0 auto;
      padding:0 20px;
      background:var(--white-000);
   }
 
`
export default GlobalStyle;
