import React, { useEffect } from "react";
import "./App.css";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
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
import { Battle } from "./pages/Battle/Battle";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./http/index";
import { submit } from "./store/user";
// import io from "socket.io-client";

// const socket = io(process.env.REACT_APP_API_URL);

// socket.on('login', )

function App(props) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user.data);
  // socket.on("login", user._id);
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("md"));
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
      const { data } = await getUser();
      console.log(data);
      dispatch(submit(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="App">
      <Switch>
        {/* {mdScreen ? (
						<GuestRoute exact path="/" component={GetApp} />
					) : ( */}
        <>
          <GuestRoute exact path="/getapp" component={GetApp} />
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <AllTabs />
          </Route>
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
          <Route path="/live">
            <Live />
          </Route>
          <Route path="/stream">
            {/* <Stream /> */}
            <Battle />
          </Route>
        </>
        {/* )} */}
      </Switch>
      {/* <Slider /> */}
    </div>
  );
}
const GuestRoute = ({ children, component: Component, ...rest }) => {
  return <Route {...rest} render={() => <Component />} />;
};
export default App;
