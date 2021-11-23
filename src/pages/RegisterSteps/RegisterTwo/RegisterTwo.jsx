import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { Header } from "../../../components/header/Header";
import { bodyType, identify, heightApi } from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import {
  gender,
  height,
  bodyType as bType,
  diet,
  fitness,
} from "../../../data";
import axios from "axios";

export const RegisterTwo = ({ onNext }) => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  const identifyOptions = gender;
  const heightOptions = height;
  const bodyTypeOptions = bType;

  const [show, setShow] = useState({
    identify: false,
    height: false,
    bodyType: false,
    diet: false,
    fitness: false,
  });
  const [values, setValues] = useState({
    identify: "0",
    height: "0",
    bodyType: "0",
    diet: "0",
    fitness: "0",
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
      const identifyData = {
        gender: values.identify,
        visible: show.identify,
        step: "/height",
      };
      const heightData = {
        height: values.height,
        visible: show.height,
        step: "/body-type",
      };
      const bodyTypeData = {
        type: values.bodyType,
        visible: show.bodyType,
        step: "/ethnicity-page",
      };
      await axios
        .all([
          identify(identifyData),
          heightApi(heightData),
          bodyType(bodyTypeData),
        ])
        .then(
          axios.spread(function (res1, res2, res3) {
            dispatch(submit(res3.data));
          })
        );

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
        backgroundImage: `url(${image.comb}),url(${image.gender})`,
        backgroundPosition: "100% 100%, 0% 100%",
      }}
    >
      <Header transparent />
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
        className={classes.form}
      >
        <Grid item>
          <form action="">
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              className={classes.formContainer}
            >
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="How do you identify?"
                  options={identifyOptions}
                  placeholder="Choose"
                  show={show.identify}
                  handleShow={handleShow}
                  name="identify"
                  onSelect={handleSelect}
                  value={values.identify}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Height"
                  options={heightOptions}
                  placeholder={`6'2" (188cm)`}
                  show={show.height}
                  handleShow={handleShow}
                  name="height"
                  onSelect={handleSelect}
                  value={values.height}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Body Type"
                  options={bodyTypeOptions}
                  placeholder="Select body type"
                  show={show.identify}
                  handleShow={handleShow}
                  name="bodyType"
                  onSelect={handleSelect}
                  value={values.bodyType}
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
                />
              </Grid>
              <Grid item container justifyContent="center">
                <CustomIconButton onClick={handleNext} />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      {/* <div className={classes.bgImage2}>
				<img src={bgImage2} alt="" />
			</div> */}
    </Grid>
  );
};
