import React, { useEffect, useContext } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { GetApp } from "./pages/GetApp/GetApp";
import { SignInScreen } from "./pages/SignInScreen/SignInScreen";
import { HelpCenter } from "./pages/Help/HelpCenter";
import { ProfileAccountHelp } from "./pages/Help/ProfileAccountHelp";
import { BillingSubscription } from "./pages/Help/BillingSubscription";
import { SafetyPrivacy } from "./pages/Help/SafetyPrivacy";
import { Features } from "./pages/Help/Features";
import { LiveFAQ } from "./pages/Help/LiveFAQ";
import { AllTabs } from "./pages/TabsContainer/AllTabs";
import { Live } from "./pages/Live/Live";
import { Stream } from "./pages/LiveStream/Stream";
// import { Battle } from "./pages/Battle/Battle";
import { useDispatch } from "react-redux";
import { getUser } from "./http/index";
import { submit } from "./store/user";
import { SocketContext } from "./http/socket";
import { onMessageListener } from "./firebaseInit";
import { useSelector } from "react-redux";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

function App(props) {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const userState = useSelector((state) => state.auth.user.data);
  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      props.history.push("/getapp");
    } else {
      if (props.location.pathname === "/getapp" && window.innerWidth > 1200) {
        props.history.goBack();
      }
    }
  };
  const fetchUser = async () => {
    try {
      if (localStorage.getItem("token")) {
        const { data } = await getUser();
        dispatch(submit(data));
        socket.emit("login", data.data._id);
        const step = data.data.step;
        switch (step) {
          case "/home":
            if (props.history.location.pathname === "/") {
              props.history.push("home");
            }
            break;
          default:
            // props.history.push("signin");
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
    (async () => {
      const data = onMessageListener();
    })();

    return () => {
      if (socket !== null) socket.emit("disconnect");
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      // if (socket !== null) socket.emit("disconnect", userState._id);
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/getapp" component={GetApp} />
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signin" component={SignInScreen} />
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute path="/home" component={AllTabs} />
        <Route path="/helpcenter" exact>
          <HelpCenter />
        </Route>
        <Route
          path="/helpcenter/profileandaccount"
          exact
          component={ProfileAccountHelp}
        />
        <Route
          path="/helpcenter/billingandsubscription"
          exact
          component={BillingSubscription}
        />
        <Route
          path="/helpcenter/safetyandprivacy"
          exact
          component={SafetyPrivacy}
        />
        <Route path="/helpcenter/features" exact component={Features} />
        <Route path="/helpcenter/livefaq" exact component={LiveFAQ} />
        <ProtectedRoute path="/live" component={Live} />
        <ProtectedRoute path="/stream" component={Stream} />
        <ProtectedRoute
          path="/joinstream/:id/:sId"
          audience={true}
          component={Stream}
        />
      </Switch>
    </div>
  );
}
export default App;
