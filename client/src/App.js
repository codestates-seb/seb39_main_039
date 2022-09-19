import { Routes, Route } from "react-router-dom";
import {
  Login,
  Main,
  SignUp,
  Terms,
  WantedList,
  WantedDetail,
  WantedCreate,
  OwnerMain,
  WalkingLists,
  WalkerHistory,
  Setting,
  UserEdit,
  WalkerMain,
  StartWalking,
  Walking,
  DogEdit,
  DogAdd,
  WalkerEdit,
  WorkHistory
} from "./pages";

function App() {
  
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signupTerms" element={<Terms />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/ownerMain" element={<OwnerMain />}></Route>
        <Route path="/walk/:id/walking" element={<StartWalking />}></Route>
        <Route
          path="/walk/:id/recordedWalking"
          element={<WalkingLists />}
        ></Route>
        <Route path="/walkerMain" element={<WalkerMain />}></Route>
        <Route path="/wantedHistory" element={<WalkerHistory />}></Route>
        <Route path="/wantedCreate" element={<WantedCreate />}></Route>
        <Route path="/wantedList" element={<WantedList />}></Route>
        <Route path="/wantedDetail" element={<WantedDetail />}></Route>
        <Route path="/workHistory" element={<WorkHistory />}></Route>
        <Route path="/walking" element={<Walking />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
        <Route path="/userEdit" element={<UserEdit />}></Route>
        <Route path="/dogEdit" element={<DogEdit />}></Route>
        <Route path="/dogAdd" element={<DogAdd />}></Route>
        <Route path="/walkerEdit" element={<WalkerEdit />}></Route>
      </Routes>
    </>
  );
}

export default App;
