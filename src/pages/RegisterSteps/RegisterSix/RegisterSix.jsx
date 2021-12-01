import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import image from "../../../assets/index";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Input } from "../../../components/Textfield/Input";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Header } from "../../../components/header/Header";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { profession, step } from "../../../http";
import Joi from "joi-browser";

export const RegisterSix = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [show, setShow] = useState({
    work: true,
    occupation: true,
    job: true,
  });
  const [values, setValues] = useState({
    work: "",
    occupation: "",
    job: "",
  });
  const [errors, setErrors] = useState({
    work: "",
    occupation: "",
    job: "",
  });

  const schema = {
    work: Joi.string().required().label("Work"),
    occupation: Joi.string().required().label("Occupation"),
    job: Joi.string().required().label("Job"),
  };

  const validate = () => {
    const data = {
      work: values.work[0],
      occupation: values.occupation[0],
      job: values.job[0],
    };
    const result = Joi.validate(data, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({
        work: "",
        occupation: "",
        job: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = item.message;
      setErrors(errorsObject);
      return true;
    }
  };
  const handleShow = (e) => {
    const { checked, name } = e.target;
    setShow({ ...show, [name]: checked });
    // alert(name);
  };
  const handleSelect = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    const it = error
      ? setErrors({ ...errors, [name]: error.details[0].message })
      : setErrors({ ...errors, [name]: "" });
  };
  const handleNext = async () => {
    const error = validate();
    if (!error) {
      try {
        const apiData = {
          company: values.work,
          job_title: values.job,
          occupation: values.occupation,
          c_visible: show.work,
          j_visible: show.job,
          o_visible: show.occupation,
          step: "/step",
        };
        const { data } = await profession(apiData);
        dispatch(submit(data));
        onNext();
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const handleSkip = async () => {
    const stepData = {
      step: "/",
    };
    try {
      const { data } = await step(stepData);
      dispatch(submit(data));
      onNext();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundImage: `url(${image.bag})`,
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
        // style={{ marginBottom: lgScreen ? "5rem" : "10rem" }}
      >
        <Grid item>
          <form action="" autoComplete={false}>
            <Grid
              container
              direction="column"
              aligItems="flex-end"
              className={classes.formContainer}
              // style={{ marginTop: lgScreen ? "3rem" : "8rem" }}
            >
              <Grid
                item
                container
                style={{ marginBottom: lgScreen ? "0.5rem" : "1rem" }}
                justifyContent="flex-end"
              >
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Where do you work?"
                    type="text"
                    placeholder="Enter details"
                    value={values.work}
                    onChange={handleSelect}
                    name="work"
                    error={errors.work}
                    helperText={errors.work}
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
                    show={show.work}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                style={{ marginBottom: lgScreen ? "0.5rem" : "1rem" }}
                justifyContent="flex-end"
              >
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Occupation"
                    type="text"
                    placeholder="Enter details"
                    value={values.occupation}
                    onChange={handleSelect}
                    name="occupation"
                    error={errors.occupation}
                    helperText={errors.occupation}
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
                    name="occupation"
                    show={show.occupation}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                style={{ marginBottom: lgScreen ? "0.5rem" : "1rem" }}
                justifyContent="flex-end"
              >
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="What's your job title?"
                    type="text"
                    placeholder="Enter details"
                    value={values.job}
                    onChange={handleSelect}
                    name="job"
                    error={errors.job}
                    helperText={errors.job}
                  />
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  style={{ marginTop: "10px" }}
                  className={classes.switchContainer}
                >
                  <span className={classes.showProfileText}>
                    Show in profile
                  </span>
                  <Checkbox
                    variant="switch"
                    name="job"
                    show={show.job}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
              <Grid item container justifyContent="center">
                <CustomIconButton onClick={handleNext} />
                <CustomButton onClick={handleSkip} variant="outlineButton">
                  Skip
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
