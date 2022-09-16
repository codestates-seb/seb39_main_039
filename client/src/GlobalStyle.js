import { createGlobalStyle } from "styled-components";
import colorVariables from "./assets/style/colorVariables";
import "./assets/fonts/font.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-datepicker/dist/react-datepicker.css";
import calendar from './assets/img/calendar.svg'
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
      ${colorVariables};
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

   // util
   .img-circle{border-radius: 100px;}
   .img-circle.xs{width:25px;}
   .img-circle.sm{ width:35px;}
   .pb20{padding-bottom:20px;}
   .pt0{padding-top:0}
   .pb0{padding-bottom:0}
   .bb0{border-bottom:0}



   // layout
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


   
   // form
   .ipt-form-area{
      position:relative;
   }

   .ipt-group{
      margin-bottom:23px;
   }

   .ipt-form, .react-datepicker__input-container input{
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

   .ipt-unit{
      position:relative;
      input{
         text-align: right;
         padding-right:45px;
      }
      span{
         position:absolute;
         top:50%;
         right:25px;
         font-weight: 600;
         transform: translate(0, -50%);
      }
   }


   
   //datepicker style
   .react-datepicker__input-container input{
         text-align: center;
         background:url('${calendar}');
         background-repeat: no-repeat;
         background-position:20px 50%;
   }

   .react-datepicker{
      overflow:hidden;
      border:1px solid var(--gray-200);
      box-shadow: 0 0 15px 0 rgba(0,0,0, .2);
      border-radius:20px;
   }

   .react-datepicker__header{
      background:var(--white-000);
      border-bottom:0;
      padding:22px 15px 0;
   }

   .react-datepicker__month{
      padding:3px 3px 8px;
      font-size:15px;
   }

   .react-datepicker__day-names{
      padding-top:18px
   }

   .react-datepicker__day-name{
      color:var(--gray-500);
      line-height: 1em !important;
   }

   .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name{
      margin: 0.23rem;
      width: 1.9rem;
      line-height: 1.9rem;
   }

   .react-datepicker__day--keyboard-selected, .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range{
      background:var(--primary);
      border:0;
      border-radius: 50px;
   }

   .react-datepicker__navigation--previous{
      top: 15px;
      left: 30px;
   }

   .react-datepicker__navigation--next{
      top: 15px;
      right: 30px;
   }
`
export default GlobalStyle;
