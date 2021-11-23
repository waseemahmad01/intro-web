import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import image from "../../../assets/index";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Input } from "../../../components/Textfield/Input";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { Header } from "../../../components/header/Header";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { profession } from "../../../http";
import { schoolDegree } from "../../../data";

export const RegisterSix = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [show, setShow] = useState({
    degree: false,
    work: false,
    occupation: false,
    job: false,
  });
  const [values, setValues] = useState({
    degree: "0",
    work: "",
    occupation: "",
    job: "",
  });
  const handleShow = (e) => {
    const { checked, name } = e.target;
    setShow({ ...show, [name]: checked });
    // alert(name);
  };
  const handleSelect = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleNext = async () => {
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
          <form action="">
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
                style={{
                  marginBottom: lgScreen ? "0.5rem" : "1rem",
                  paddingLeft: lgScreen ? "10.25rem" : "11.81rem",
                }}
                justifyContent="flex-end"
              >
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
                />
              </Grid>
              <Grid
                item
                container
                style={{ marginBottom: lgScreen ? "3rem" : "4rem" }}
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
                    handleShow={handleShow}
                  />
                </Grid>
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
