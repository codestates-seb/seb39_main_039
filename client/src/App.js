import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import PrivateRoute from "./utills/PriviteRoute";
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
  WorkHistory,
  PendingWalk
} from "./pages";

function App() {
  const isLogin = Cookies.get("access");

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signupTerms" element={<Terms />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/ownerMain"
          element={
            <PrivateRoute authenticated={isLogin} component={<OwnerMain />} />
          }
        ></Route>
        <Route
          path="/walk/:id/walking"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<StartWalking />}
            />
          }
        ></Route>
        <Route
          path="/walk/:id/recordedWalking"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<WalkingLists />}
            />
          }
        ></Route>
        <Route
          path="/walkerMain"
          element={
            <PrivateRoute authenticated={isLogin} component={<WalkerMain />} />
          }
        ></Route>
        <Route
          path="/walkerHistory/:id"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<WalkerHistory />}
            />
          }
        ></Route>
        <Route
          path="/pendingWalk"
          element={
            <PrivateRoute authenticated={isLogin} component={<PendingWalk />} />
          }
        ></Route>
        <Route
          path="/wantedCreate"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<WantedCreate />}
            />
          }
        ></Route>
        <Route
          path="/wantedList"
          element={
            <PrivateRoute authenticated={isLogin} component={<WantedList />} />
          }
        ></Route>
        <Route
          path="/wantedDetail/:id"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<WantedDetail />}
            />
          }
        ></Route>
        <Route
          path="/workHistory"
          element={
            <PrivateRoute authenticated={isLogin} component={<WorkHistory />} />
          }
        ></Route>
        <Route
          path="/walking"
          element={
            <PrivateRoute authenticated={isLogin} component={<Walking />} />
          }
        ></Route>
        <Route
          path="/setting"
          element={
            <PrivateRoute authenticated={isLogin} component={<Setting />} />
          }
        ></Route>
        <Route
          path="/userEdit"
          element={
            <PrivateRoute authenticated={isLogin} component={<UserEdit />} />
          }
        ></Route>
        <Route
          path="/dogEdit"
          element={
            <PrivateRoute authenticated={isLogin} component={<DogEdit />} />
          }
        ></Route>
        <Route
          path="/dogAdd"
          element={
            <PrivateRoute authenticated={isLogin} component={<DogAdd />} />
          }
        ></Route>
        <Route
          path="/walkerEdit"
          element={
            <PrivateRoute authenticated={isLogin} component={<WalkerEdit />} />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
