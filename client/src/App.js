import { Routes, Route } from "react-router-dom";
import Mapping2 from "./components/Map/Mapping2";
import { Login, Main, SignUp, Terms } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signupTerms" element={<Terms />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Mapping2 />
    </>
  );
}

export default App;
