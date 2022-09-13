import { Routes, Route } from "react-router-dom";
import { Login, Main, SignUp, Terms } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signupTerms" element={<Terms />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
