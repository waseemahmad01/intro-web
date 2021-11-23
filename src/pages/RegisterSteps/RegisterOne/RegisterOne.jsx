import React, { useState } from "react";
import {
  Grid,
  Checkbox,
  useTheme,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../Styles/registerStylesOne";
import { Input } from "../../../components/Textfield/Input";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { Header } from "../../../components/header/Header";
import { dob, username } from "../../../http/index";
import axios from "axios";

export const RegisterOne = ({ onNext }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const userState = useSelector((state) => state.auth.user);
  const [authToken, setAuthToken] = useState(userState.accessToken);
  // console.log(userState);
  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    dob: "",
  });
  const dispatch = useDispatch();
  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: [value] }));
  };
  const calculateAge = (val) => {
    const dob = new Date(val);
    const currentDate = Date.now();
    const diff = currentDate - dob.getTime();
    let age = new Date(diff);
    let year = age.getUTCFullYear();
    age = Math.abs(year - 1970);
    return age;
  };
  const handleSubmit = async () => {
    try {
      // console.log(authToken);
      // const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const dateOfBirth = {
        dob: user.dob[0],
        age: calculateAge(user.dob[0]),
        step: "/username",
      };
      const userInfo = {
        email: user.email[0],
        first_name: user.firstname[0],
        last_name: user.lastname[0],
        username: user.username[0],
        step: "/gender-selection",
      };
      await axios.all([dob(dateOfBirth), username(userInfo)]).then(
        axios.spread(function (res1, res2) {
          dispatch(submit(res2.data));
        })
      );
      onNext();
    } catch (err) {
      console.log(err);
    }
  };
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const headerItems = [
    {
      label: "Sing up",
      to: "/signin",
    },
    {
      label: "Help",
      to: "/helpcenter",
    },
  ];
  return (
    <Grid container className={classes.container}>
      <Header transparent headerItems={headerItems} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.form}
      >
        <Typography variant="h1" className={classes.formTitle}>
          Sign up
        </Typography>
        <Grid item>
          <form autoComplete="off">
            <Grid
              container
              className={classes.formContainer}
              direction="column"
            >
              <Grid item>
                <Input
                  label="Email Address"
                  // placeholder="------@gmail.com"
                  type="text"
                  name="email"
                  onChange={handleUser}
                  value={user.email}
                />
              </Grid>
              <Grid item container direction="row" spacing={xsScreen ? 0 : 2}>
                <Grid item sm={6} xs={12}>
                  <Input
                    label="First Name"
                    type="text"
                    // placeholder="first name"
                    name="firstname"
                    onChange={handleUser}
                    value={user.firstname}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Input
                    label="Last Name"
                    type="text"
                    // placeholder="last name"
                    name="lastname"
                    onChange={handleUser}
                    value={user.lastname}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Input
                  label="Choose a unique username"
                  type="text"
                  // placeholder="username"
                  name="username"
                  onChange={handleUser}
                  value={user.username}
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item sm={12}>
                  <Input
                    type="text"
                    placeholder="calender"
                    label="Date of birth"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    // col={6}
                    name="dob"
                    onChange={handleUser}
                    value={user.dob}
                  />
                </Grid>
                {/* <Grid item sm={6}></Grid> */}
              </Grid>
              <Grid
                item
                container
                style={{ marginTop: lgScreen ? "0.35rem" : "-0.7rem" }}
              >
                <Grid item xs={1}>
                  <Checkbox
                    disableRipple
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    classes={{ root: classes.checkbox }}
                  />
                </Grid>
                <Grid item container alignItems="center" xs={11}>
                  <Typography
                    style={{ marginLeft: "10px" }}
                    variant="subtitle1"
                    className={classes.typographyS1}
                  >
                    I've read and agreed to the terms of serivce and our privacy
                    policy
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container justifyContent="center">
                {/* <Link to="/registertwo"> */}
                <CustomIconButton onClick={handleSubmit} />
                {/* </Link> */}
              </Grid>
              <Grid item container justifyContent="center">
                <Typography className={classes.p} variant="body1">
                  Already have an account?{" "}
                  <Link to="/login" className={classes.link}>
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      {/* <div className={classes.bgImage}>
				<img src={bgImage} alt="backgroundImage" />
			</div> */}
    </Grid>
  );
};
