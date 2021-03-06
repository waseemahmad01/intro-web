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
// import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { Header } from "../../../components/header/Header";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import {
  dob,
  username,
  setLocation as setLocationApi,
  checkUsername,
  identify,
} from "../../../http/index";
import axios from "axios";
import Joi from "joi-browser";
import { useEffect } from "react";
import { gender } from "../../../data";
import ButtonComp from "../../../components/ButtonComp/ButtonComp";

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
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    dob: "",
    identify: "0",
  });
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    // eslint-disable-next-line
    const it = error
      ? setErrors({
          ...errors,
          [name]: `"${
            name.charAt(0).toUpperCase() + name.slice(1)
          }" can not be empty`,
        })
      : setErrors({ ...errors, [name]: "" });
  };
  const [errors, setErrors] = useState({
    firstname: "",
    username: "",
    dob: "",
    identify: "",
  });
  const schema = {
    firstname: Joi.string().required().label("Firstname"),
    username: Joi.string().required().label("Username"),
    dob: Joi.date().required().label("Date of birth"),
    identify: Joi.string().min(2).required().label("Identify"),
  };

  const validate = () => {
    // console.log(location);
    const data = {
      firstname: user.firstname[0],
      username: user.username[0],
      dob: user.dob[0],
      identify: user.identify,
    };

    console.log(data);
    const result = Joi.validate(data, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = item.message;

      if (user.identify.length <= 1) {
        errorsObject.identify = "Identify can not be empty!";
      }
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

  // const handleUniqueUsername = async (e) => {
  //   const username = e.target.value;
  //   const cancelToken = axios.CancelToken.source();
  //   console.log(username);
  //   const { data } = await checkUsername(
  //     { username },
  //     { cancelToken: cancelToken.token }
  //   );
  //   if (typeof cancelToken !== typeof undefined) {
  //     cancelToken.cancel("canceled");
  //   }
  //   console.log(cancelToken);
  //   console.log(data);
  // };

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
      const { data } = await checkUsername({ username: user.username[0] });
      if (data.nameExists) {
        setErrors({
          ...errors,
          username: `"${user.username}" is already taken..`,
        });
        return;
      }
      const identifyData = {
        gender: user.identify,
        visible: true,
        step: "/choose-date-characters",
      };
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
        lon: String(location.lon),
        lat: String(location.lat),
        geoHash: "geoHash",
        visible: true,
        step: "/gender-selection",
      };
      await axios
        .all([
          dob(dateOfBirth),
          setLocationApi(locationData),
          username(userInfo),
          identify(identifyData),
        ])
        .then(
          axios.spread(function (res1, res2, res3, res4) {
            dispatch(submit(res4.data));
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

  useEffect(() => {
    if (
      errors.firstname === "" &&
      errors.dob === "" &&
      errors.username === "" &&
      errors.identify === "" &&
      checked
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors, checked]);

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
          Signup
        </Typography>
        <Grid item>
          <form autoComplete="off">
            <Grid
              container
              className={classes.formContainer}
              direction="column"
            >
              <Grid item container spacing={2}>
                <Grid item sm={12}>
                  <Input
                    type={type}
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
                    name="dob"
                    onChange={handleUser}
                    value={
                      type === "text" && user.dob !== "" ? showDate() : user.dob
                    }
                    error={Boolean(errors.dob)}
                    helperText={errors.dob}
                  />
                </Grid>
              </Grid>
              {/* <Grid item>
                <Input
                  label="Email Address"
                  type="text"
                  name="email"
                  onChange={handleUser}
                  value={user.email}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid> */}
              <Grid item container direction="row" spacing={xsScreen ? 0 : 2}>
                <Grid item xs={12}>
                  <Input
                    label="Enter Your Name"
                    type="text"
                    placeholder="Name"
                    name="firstname"
                    onChange={handleUser}
                    value={user.firstname}
                    error={Boolean(errors.firstname)}
                    helperText={errors.firstname}
                  />
                </Grid>
                {/* <Grid item sm={6} xs={12}>
                  <Input
                    label="Last Name"
                    type="text"
                    name="lastname"
                    onChange={handleUser}
                    value={user.lastname}
                    error={Boolean(errors.lastname)}
                    helperText={errors.lastname}
                  />
                </Grid> */}
              </Grid>
              <Grid item>
                <Input
                  label="Select A Username"
                  type="text"
                  name="username"
                  placeholder="@"
                  onChange={handleUser}
                  value={user.username}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>

              <Grid item>
                <SelectOption
                  noShow={true}
                  checkboxVaraint="switch"
                  label="How do you identify"
                  options={gender}
                  placeholder="Choose"
                  name="identify"
                  value={user.identify}
                  onSelect={handleSelect}
                  errorText={errors.identify}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                style={{ marginTop: lgScreen ? "40px" : "89px" }}
              >
                <ButtonComp
                  label="Continue"
                  onClick={handleSubmit}
                  disabled={disabled}
                />
              </Grid>
              <Grid item container justifyContent="center">
                <Typography className={classes.p} variant="body1">
                  Already have an account?
                  <Link to="/login" className={classes.link}>
                    Sign In
                  </Link>
                </Typography>
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
                    variant="subtitle1"
                    className={classes.typographyS1}
                  >
                    I've read and agreed to the terms of service and our privacy
                    policy
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
