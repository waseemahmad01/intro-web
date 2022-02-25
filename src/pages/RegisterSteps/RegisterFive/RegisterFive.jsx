import React, { useEffect, useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery, Typography } from "@material-ui/core";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import { Input } from "../../../components/Textfield/Input";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { schoolDegree } from "../../../data";
import { profession, education, step } from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import axios from "axios";
import Joi from "joi-browser";
import ButtonComp from "../../../components/ButtonComp/ButtonComp";

const occupationList = [
  "Architecture and Construction",
  "Arts, Design, Entertainment, Sports, and Media",
  "Building and Grounds Cleaning and Maintenance",
  "Business and Finance",
  "Community and Social Services",
  "Science, Technology, Engineering and Mathematics",
  "Construction and Extraction",
  "Education, Training, and Library,",
  "Farming, Fishing and Forestry",
  "Food Preparation and Serving Related",
  "Healthcare Practitioners and Technical",
  "Healthcare Support",
  "Installation, Maintenance and Repair",
  "Legal",
  "Life, Physical and Social Science",
  "Business Management and Administration",
  "Military",
  "Office and Administrative Support",
  "Government and Public Administration",
  "Transportation. Distribution and Logistics",
  "Personal Care and Services",
  "Protective and Security Service",
  "Marketing, Sales, and Service",
];

export const RegisterFive = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    degree: "0",
    occupation: "0",
  });
  const [details, setDetails] = useState({
    school: "",
    work: "",
    job: "",
  });
  const [show, setShow] = useState({
    school: true,
    degree: true,
    work: true,
    job: true,
    occupation: true,
  });

  const [errors, setErrors] = useState({
    school: "",
    degree: "",
    occupation: "",
  });

  const schema = {
    school: Joi.string().required(),
    degree: Joi.string().min(2).required(),
    occupation: Joi.string().min(2).required(),
  };

  const validate = () => {
    const data = {
      school: details.school[0],
      degree: values.degree,
      occupation: values.occupation,
    };
    const result = Joi.validate(data, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({
        school: "",
        degree: "",
        occupation: "",
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
      const educationData = {
        school: details.school,
        s_visible: show.school,
        degree: values.degree,
        d_visible: show.degree,
        step: "/get-user-profession",
      };
      const professionData = {
        company: details.work,
        job_title: details.job,
        occupation: details.occupation,
        c_visible: show.work,
        j_visible: show.job,
        o_visible: show.occupation,
        step: "/get-user-religion",
      };
      // console.log(educationData, professionData);
      await axios
        .all([education(educationData), profession(professionData)])
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
  const handleSkip = async () => {
    const stepData = {
      step: "/get-user-religion",
    };
    try {
      const { data } = await step(stepData);
      dispatch(submit(data));
      onNext();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (
      details.school !== "" &&
      values.degree !== "0" &&
      values.occupation !== "0"
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [details, values]);
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
              spacing={lgScreen ? 0 : 2}
            >
              <Grid item container justifyContent="center">
                <Typography variant="h1" className={classes.formTitle}>
                  Education/ Profession
                </Typography>
              </Grid>
              <Grid item container sm={12}>
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="School"
                    type="text"
                    placeholder="Enter details"
                    value={details.school}
                    onChange={handleDetails}
                    name="school"
                    error={Boolean(errors.school)}
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
                  label="Degree"
                  options={schoolDegree}
                  placeholder="Select an option"
                  show={show.degree}
                  handleShow={handleShow}
                  name="degree"
                  onSelect={handleSelect}
                  value={values.degree}
                  error={Boolean(errors.degree)}
                  errorText={errors.degree}
                />
              </Grid>
              <Grid item container sm={12}>
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Workplace"
                    type="text"
                    placeholder="Enter details (optional)"
                    value={details.work}
                    onChange={handleDetails}
                    name="work"
                    error={Boolean(errors.work)}
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
              <Grid item container sm={12}>
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Job Title"
                    type="text"
                    placeholder="Enter details (optional)"
                    value={details.job}
                    onChange={handleDetails}
                    name="job"
                    error={Boolean(errors.job)}
                    helperText={errors.job}
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
                    name="job"
                    show={show.job}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
              <Grid item container sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Occupation"
                  options={occupationList}
                  placeholder="Select option"
                  show={show.occupation}
                  handleShow={handleShow}
                  name="occupation"
                  onSelect={handleSelect}
                  value={values.occupation}
                  error={Boolean(errors.occupation)}
                  errorText={errors.occupation}
                />
                {/* <Grid item className={classes.inputContainer}>
                  <Input
                    label="Occupation"
                    type="text"
                    placeholder="Enter details"
                    value={details.occupation}
                    onChange={handleDetails}
                    name="occupation"
                    error={Boolean(errors.occupation)}
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
                </Grid> */}
              </Grid>

              <Grid item container justifyContent="center">
                <ButtonComp
                  label="Continue"
                  onClick={handleNext}
                  disabled={disabled}
                />
                {/* <CustomIconButton onClick={handleNext} />
                <CustomButton onClick={handleSkip} variant="outlineButton">
                  Skip
                </CustomButton> */}
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
