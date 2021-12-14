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
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { Header } from "../../../components/header/Header";
import {
  dob,
  username,
  setLocation as setLocationApi,
} from "../../../http/index";
import axios from "axios";
import Joi from "joi-browser";
import { useEffect } from "react";

export const RegisterOne = ({ onNext }) => {
  const classes = useStyles();

  const [location, setLocation] = useState({
    lon: "",
    lat: "",
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [type, setType] = useState("text");
  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const schema = {
    email: Joi.string().email().required().label("Email"),
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
    username: Joi.string().required().label("Username"),
    dob: Joi.date().required().label("Date of birth"),
  };

  const validate = () => {
    console.log(location);
    const data = {
      email: user.email[0],
      firstname: user.firstname[0],
      lastname: user.lastname[0],
      username: user.username[0],
      dob: user.dob[0],
    };
    const result = Joi.validate(data, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = item.message;
      setErrors(errorsObject);
      return true;
    }
  };
  const dispatch = useDispatch();
  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: [value] }));
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    // eslint-disable-next-line
    const it = error
      ? setErrors({ ...errors, [name]: error.details[0].message })
      : setErrors({ ...errors, [name]: "" });
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
    const error = validate();
    if (!error) {
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
      const locationData = {
        lon: location.lon,
        lat: location.lat,
        geoHash: "geoHash",
        visible: true,
        step: "/gender-selection",
      };
      await axios
        .all([
          dob(dateOfBirth),
          setLocationApi(locationData),
          username(userInfo),
        ])
        .then(
          axios.spread(function (res1, res2, res3) {
            dispatch(submit(res3.data));
            onNext();
          })
        )
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lon: pos.coords.longitude, lat: pos.coords.latitude });
      });
    }
  }, []);

  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));
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
  const showDate = () => {
    const dateSplit = user.dob.toString().split("-");
    const date = `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`;
    return date;
  };
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
                  error={Boolean(errors.email)}
                  helperText={errors.email}
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
                    error={Boolean(errors.firstname)}
                    helperText={errors.firstname}
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
                    error={Boolean(errors.lastname)}
                    helperText={errors.lastname}
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
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item sm={12}>
                  <Input
                    type={setType}
                    placeholder="Calender"
                    label="Date of birth"
                    onFocus={(e) => {
                      e.target.type = "date";
                      setType("date");
                    }}
                    onBlur={(e) => {
                      e.target.type = "text";
                      setType("text");
                    }}
                    // col={6}
                    name="dob"
                    onChange={handleUser}
                    // value={moment(user.dob).format("MMM Do YYYY").toString()}
                    value={
                      type === "text" && user.dob !== "" ? showDate() : user.dob
                    }
                    error={Boolean(errors.dob)}
                    helperText={errors.dob}
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
                <CustomIconButton disabled={!checked} onClick={handleSubmit} />
                {/* </Link> */}
              </Grid>
              <Grid item container justifyContent="center">
                <Typography className={classes.p} variant="body1">
                  Already have an account?
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
