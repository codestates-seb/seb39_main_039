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
  DogEditAdd,
  WalkerEdit,
  WorkHistory,
  PendingWalk,
  WantedEdit,
  WalkerWalkHistory,
} from "./pages";
import WalkerWalkWaiting from "./pages/Walkers/WalkerWalkWaiting";
import { getLocation } from "./redux/actions/mappingAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const isLogin = Cookies.get("access");
  const { lat, lon } = useSelector((state) => state.mapping);

  const dispatch = useDispatch();

  const getGeolocation = () => {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        dispatch(
          getLocation(position.coords.latitude, position.coords.longitude)
        );
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getGeolocation();
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
  }, [lat, lon]);

  useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
    }
  }, []);

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
          path="/pendingWalk/:id"
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
          path="/walking/:id"
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
        <Route
          path="/wantedEdit/:id"
          element={
            <PrivateRoute authenticated={isLogin} component={<WantedEdit />} />
          }
        ></Route>
        <Route
          path="/walkerWalkHistory/:id"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<WalkerWalkHistory />}
            />
          }
        ></Route>
        <Route
          path="/walkerWalkWaiting/:id"
          element={
            <PrivateRoute
              authenticated={isLogin}
              component={<WalkerWalkWaiting />}
            />
          }
        ></Route>

        <Route
          path="/dogEditAdd"
          element={
            <PrivateRoute authenticated={isLogin} component={<DogEditAdd />} />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
