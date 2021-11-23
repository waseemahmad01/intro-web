import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid, useTheme, useMediaQuery } from "@material-ui/core";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import { vices } from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";

export const RegisterSeven = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const options = ["No", "Yes", "Sometimes", "Prefer not to say"];
  const [show, setShow] = useState({
    drink: false,
    smoke: false,
    weed: false,
    drugs: false,
  });
  const [values, setValues] = useState({
    drink: "0",
    smoke: "0",
    weed: "0",
    drugs: "0",
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
        drink: values.drink,
        d_visible: show.drink,
        smoke: values.smoke,
        s_visible: show.smoke,
        weed: values.weed,
        w_visible: show.weed,
        drugs: values.drugs,
        dr_visible: show.drugs,
        step: "/profile",
      };
      const { data } = await vices(apiData);
      console.log(data);
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
        backgroundImage: `url(${image.drink})`,
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
        // style={{ marginBottom: lgScreen ? "4rem" : "10rem" }}
      >
        <Grid item>
          <form action="">
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              className={classes.formContainer}
              spacing={lgScreen ? 2 : 2}
              // style={{ marginTop: lgScreen ? "2rem" : "8rem" }}
            >
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Do you drink?"
                  options={options}
                  placeholder="Select an option"
                  show={show.drink}
                  handleShow={handleShow}
                  name="drink"
                  onSelect={handleSelect}
                  value={values.drink}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Do you smoke?"
                  options={options}
                  placeholder="Select an option"
                  show={show.smoke}
                  handleShow={handleShow}
                  name="smoke"
                  onSelect={handleSelect}
                  value={values.smoke}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Do you smoke weed?"
                  options={options}
                  placeholder="Select an option"
                  show={show.weed}
                  handleShow={handleShow}
                  name="weed"
                  onSelect={handleSelect}
                  value={values.weed}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Do you use drugs?"
                  options={options}
                  placeholder="Select an option"
                  show={show.drugs}
                  handleShow={handleShow}
                  name="drugs"
                  onSelect={handleSelect}
                  value={values.drugs}
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
