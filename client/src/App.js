import { Routes, Route } from "react-router-dom";
import { Login, Main, SignUp, Terms, WantedList, WantedDetailPage, OwnerMain, Map } from './pages';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signupTerms" element={<Terms />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/ownerMain" element={<OwnerMain />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/wantedList" element={<WantedList />}></Route>
        <Route path="/wantedDetail" element={<WantedDetailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
