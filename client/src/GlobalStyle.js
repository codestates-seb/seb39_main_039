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

   input{
      font-size:1rem;
   }

   .container{
      max-width:465px;
      min-height:100vh;
      margin:0 auto;
      padding:0 20px;
      background:var(--white-000);
   }

   .ipt-form-area{
      position:relative;
   }

   .ipt-form{
      width:100%;
      border:1px solid var(--gray-200);
      border-radius: 15px;
      height:50px;
      padding:0 20px;
   }
`
export default GlobalStyle;
