import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { Header } from "../../../components/header/Header";
import { bodyType, heightApi } from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { height, bodyType as bType, diet, fitness } from "../../../data";
import axios from "axios";
import Joi from "joi-browser";

export const RegisterTwo = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const heightOptions = height;
  const bodyTypeOptions = bType;

  const [show, setShow] = useState({
    height: true,
    bodyType: true,
    diet: true,
    fitness: true,
  });
  const [values, setValues] = useState({
    height: "0",
    bodyType: "0",
    diet: "0",
    fitness: "0",
  });
  const [errors, setErrors] = useState({
    height: "",
    bodyType: "",
    diet: "",
    fitness: "",
  });
  const schema = {
    height: Joi.string().min(2).required().label("Height"),
    bodyType: Joi.string().min(2).required().label("Body Type"),
    diet: Joi.string().min(2).required().label("Diet"),
    fitness: Joi.string().min(2).required().label("Fitness"),
  };

  const validate = () => {
    const result = Joi.validate(values, schema, { abortEarly: false });
    // console.log(result);
    if (!result.error) {
      setErrors({
        height: "",
        bodyType: "",
        diet: "",
        fitness: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = `"${
          item.path[0].charAt(0).toUpperCase() + item.path[0].slice(1)
        }" can not be empty`;
      console.log(errorsObject);
      setErrors(errorsObject);
      return true;
    }
  };

  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    const feets = Math.floor(realFeets);
    const inches = Math.round((realFeets - feets) * 12);
    return `${feets}'${inches}" ( ${cm}cm )`;
  };
  const newHeight = heightOptions.map((e) => toFeet(e));
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
  const handleNext = async () => {
    const error = validate();
    if (!error) {
      const heightInCM = values.height.split(" ")[2].split("cm")[0];
      const heightData = {
        height: heightInCM,
        visible: show.height,
        step: "/body-type",
      };
      const bodyTypeData = {
        type: values.bodyType,
        visible: show.bodyType,
        step: "/ethnicity-page",
      };
      await axios
        .all([heightApi(heightData), bodyType(bodyTypeData)])
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
        backgroundImage: `url(${image.comb}))`,
        backgroundPosition: "100% 100%, 0% 100%",
      }}
    >
      <Header transparent />
      <Grid
        container
        alignItems="center"
        direction="column"
        className={classes.form}
      >
        <Grid item>
          <form action="">
            <Grid
              container
              direction="column"
              className={classes.formContainer}
            >
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Height"
                  options={newHeight}
                  placeholder={`6'2" (188cm)`}
                  show={show.height}
                  handleShow={handleShow}
                  name="height"
                  onSelect={handleSelect}
                  value={values.height}
                  height={true}
                  error={Boolean(errors.height)}
                  errorText={errors.height}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Body Type"
                  options={bodyTypeOptions}
                  placeholder="Select body type"
                  show={show.bodyType}
                  handleShow={handleShow}
                  name="bodyType"
                  onSelect={handleSelect}
                  value={values.bodyType}
                  error={Boolean(errors.bodyType)}
                  errorText={errors.bodyType}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Diet"
                  options={diet}
                  placeholder="Select body type"
                  show={show.diet}
                  handleShow={handleShow}
                  name="diet"
                  onSelect={handleSelect}
                  value={values.diet}
                  error={Boolean(errors.diet)}
                  errorText={errors.diet}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Fitness"
                  options={fitness}
                  placeholder="Select body type"
                  show={show.fitness}
                  handleShow={handleShow}
                  name="fitness"
                  onSelect={handleSelect}
                  value={values.fitness}
                  error={Boolean(errors.fitness)}
                  errorText={errors.fitness}
                />
              </Grid>
              <Grid
                item
                container
                style={{ marginTop: lgScreen ? "1rem" : "1.5rem" }}
                justifyContent="center"
              >
                <CustomIconButton onClick={handleNext} />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
