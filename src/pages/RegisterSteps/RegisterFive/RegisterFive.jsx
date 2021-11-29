import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import { Input } from "../../../components/Textfield/Input";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { homeTown, schoolDegree } from "../../../data";
import { hometown, education } from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import axios from "axios";
import Joi from "joi-browser";

export const RegisterFive = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [values, setValues] = useState({
    live: "0",
    degree: "0",
  });
  const [details, setDetails] = useState({
    hometown: "",
    school: "",
  });
  const [show, setShow] = useState({
    live: true,
    hometown: true,
    school: true,
    degree: true,
  });

  const [errors, setErrors] = useState({
    live: "",
    hometown: "",
    school: "",
    degree: "",
  });

  const schema = {
    live: Joi.string().min(2).required(),
    hometown: Joi.string().required(),
    school: Joi.string().required(),
    degree: Joi.string().min(2).required(),
  };

  const validate = () => {
    const data = {
      live: values.live,
      hometown: details.hometown[0],
      school: details.school[0],
      degree: values.degree,
    };
    const result = Joi.validate(data, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({
        live: "",
        hometown: "",
        school: "",
        degree: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = `"${
          item.path[0].charAt(0).toUpperCase() + item.path[0].slice(1)
        }" is not allowed to be empty`;
      console.log(errorsObject);
      setErrors(errorsObject);
      return true;
    }
  };

  const handleShow = (e) => {
    const { checked, name } = e.target;
    setShow({ ...show, [name]: checked });
  };
  const handleSelect = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    console.log(error);
    const it = error
      ? setErrors({
          ...errors,
          [name]: `"${
            name.charAt(0).toUpperCase() + name.slice(1)
          }" is not allowed to be empty`,
        })
      : setErrors({ ...errors, [name]: "" });
  };
  const handleDetails = (e) => {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value });
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    const it = error
      ? setErrors({
          ...errors,
          [name]: `"${
            name.charAt(0).toUpperCase() + name.slice(1)
          }" is not allowed to be empty`,
        })
      : setErrors({ ...errors, [name]: "" });
  };
  const handleNext = async () => {
    const error = validate();
    if (!error) {
      const hometownData = {
        home_town: details.hometown,
        visible: show.hometown,
        live_with: values.live,
        live_with_visible: show.live,
        step: "/step",
      };
      const educationData = {
        school: details.school,
        s_visible: show.school,
        degree: values.degree,
        d_visible: show.degree,
        step: "/step",
      };
      await axios
        .all([hometown(hometownData), education(educationData)])
        .then(
          axios.spread(function (res1, res2) {
            dispatch(submit(res2.data));
            onNext();
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundImage: `url(${image.bgHome})`,
        backgroundPosition: "100% 100%",
      }}
    >
      <Header transparent />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.form}
        // style={{ marginBottom: lgScreen ? "3rem" : "5rem" }}
      >
        <Grid item>
          <form action="">
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              className={classes.formContainer}
              style={{
                marginTop: lgScreen ? "1rem" : "5rem",
              }}
              spacing={lgScreen ? 0 : 2}
            >
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Who do you live with?"
                  options={homeTown}
                  placeholder="Select an option"
                  show={show.live}
                  handleShow={handleShow}
                  name="live"
                  onSelect={handleSelect}
                  value={values.live}
                  error={errors.live}
                  errorText={errors.live}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="flex-end"
                sm={12}
                style={{ marginBottom: lgScreen ? "2rem" : "4rem" }}
              >
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Your Hometown?"
                    type="text"
                    placeholder="Enter details"
                    value={details.hometown}
                    onChange={handleDetails}
                    name="hometown"
                    error={errors.hometown}
                    helperText={errors.hometown}
                  />
                </Grid>
                <Grid
                  item
                  container
                  style={{ marginTop: "10px" }}
                  alignItems="center"
                  className={classes.switchContainer}
                >
                  <span className={classes.showProfileText}>
                    Show in profile
                  </span>
                  <Checkbox
                    variant="switch"
                    name="work"
                    show={show.hometown}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
              <Grid item container justifyContent="flex-end" sm={12}>
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Where did you go to school?"
                    type="text"
                    placeholder="Enter details"
                    value={details.school}
                    onChange={handleDetails}
                    name="school"
                    error={errors.school}
                    helperText={errors.school}
                  />
                </Grid>
                <Grid
                  item
                  container
                  style={{ marginTop: "10px" }}
                  alignItems="center"
                  className={classes.switchContainer}
                >
                  <span className={classes.showProfileText}>
                    Show in profile
                  </span>
                  <Checkbox
                    variant="switch"
                    name="work"
                    show={show.school}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="What's the highest degree you've attained?"
                  options={schoolDegree}
                  placeholder="Select an option"
                  show={show.degree}
                  handleShow={handleShow}
                  name="degree"
                  onSelect={handleSelect}
                  value={values.degree}
                  error={errors.degree}
                  errorText={errors.degree}
                />
              </Grid>
              <Grid item container justifyContent="center">
                <CustomIconButton onClick={handleNext} />
                <CustomButton variant="outlineButton">Skip</CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
