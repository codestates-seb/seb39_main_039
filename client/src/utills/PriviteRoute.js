import React from 'react';
import { Navigate } from 'react-router-dom';

 function PrivateRoute({ authenticated, component: Component }) {
   return (
    authenticated ? Component : <Navigate to='/' {...alert("해당 URL이동은 로그인이 필요합니다.")} />
   )
 }

 export default PrivateRoute 