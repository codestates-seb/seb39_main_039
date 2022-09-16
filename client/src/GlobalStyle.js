import { createGlobalStyle } from "styled-components";
import colorVariables from "./assets/style/colorVariables";
import "./assets/fonts/font.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import reset from "styled-reset";


const GlobalStyle = createGlobalStyle`
   ${reset}

   *{
      box-sizing: border-box;
      font-family: -apple-system, Pretendard, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
   }

   body {
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
      max-width:100%;
      min-height:100vh;
      margin:0 auto;
      padding:0 20px;
      background:var(--white-000);
   }

   .container.bg-gray{
      background:var(--gray-100);
   }

   .container.pa0{
      padding:0;
   }

   .ipt-form-area{
      position:relative;
   }

   .ipt-group{
      margin-bottom:23px;
   }

   .ipt-form{
      width:100%;
      border:1px solid var(--gray-200);
      border-radius: 15px;
      height:50px;
      padding:0 20px;
   }

   .ipt-form:disabled{
      background:var(--gray-100);
      color:var(--gray-800)
   }

   textarea.ipt-form{
      height:200px;
      padding:15px 20px;
      font-size:16px;
   }

   select.ipt-form{
      font-size:16px;
      padding:15px 15px;
   }

   .ipt-label{
      display: inline-block;
      font-weight:500;
      padding-bottom:6px;
   }

   .img-circle{
      border-radius: 100px;
   }
   .img-circle.xs{
      width:25px;
   }
   .img-circle.sm{
      width:35px;
   }
`
export default GlobalStyle;
