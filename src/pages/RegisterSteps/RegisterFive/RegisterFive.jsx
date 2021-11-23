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

export const RegisterFive = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [values, setValues] = useState({
    live: "0",
    degree: "0",
  });
  const [details, setDetails] = useState({
    hometown: "",
    school: "",
  });
  const [show, setShow] = useState({
    live: false,
    hometown: false,
    school: false,
    degree: false,
  });

  const handleShow = (e) => {
    const { checked, name } = e.target;
    setShow({ ...show, [name]: checked });
  };
  const handleSelect = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleDetails = (e) => {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleNext = async () => {
    try {
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
      await axios.all([hometown(hometownData), education(educationData)]).then(
        axios.spread(function (res1, res2) {
          dispatch(submit(res2.data));
        })
      );
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
              <Grid item container justifyContent="flex-end" sm={12}>
                <Grid item className={classes.inputContainer}>
                  <Input
                    label="Where did you go to school?"
                    type="text"
                    placeholder="Enter details"
                    value={details.school}
                    onChange={handleDetails}
                    name="school"
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
