import React, { useState, useRef } from "react";
import { useStyles } from "../Styles/registerStyles";
import {
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  MenuItem,
  Select,
  Dialog,
  InputBase,
  Chip,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import { religion as religionApi, children, ethnicityApi } from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import {
  religion,
  race,
  politics,
  haveChild,
  wantChild,
  countryList,
  ethnicityList,
} from "../../../data";
import { RadioButton } from "../../../components/RadioButton/RadioButton";
import ChipRadio from "../../../components/chipRadioButton/ChipRadio";
export const RegisterThree = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const menuItemRef = useRef();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ethinic, setEthinic] = useState([]);
  const [show, setShow] = useState({
    origin: false,
    ethnic: false,
    religion: false,
    politics: false,
    haveChildren: false,
    wantChildren: false,
  });
  const [values, setValues] = useState({
    origin: "0",
    religion: "0",
    politics: "0",
    haveChildren: "0",
    wantChildren: "0",
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
  // const handleEthnic = () => {
  //   setValues({ ...values });
  // };
  const handleNext = async () => {
    try {
      const ethnicityApiData = {
        country_list: ethinic,
        race: values.origin,
        c_visible: show.ethnic,
        r_visible: show.origin,
        step: "/hometown",
      };
      const religionData = {
        religion: values.religion,
        visible: show.religion,
        step: "/vices",
      };
      const childData = {
        have_children: values.haveChildren,
        want_children: values.wantChildren,
        visible: show.haveChildren,
        step: "/dp",
      };
      await axios
        .all([
          ethnicityApi(ethnicityApiData),
          ethnicityApi(ethnicityApiData),
          children(childData),
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
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleDatePreference = (e) => {
    // e.target.parentNode.parentNode.parentNode.classList;
    setDatePrerence(e.target.value);
  };
  const [datePreference, setDatePrerence] = useState(null);
  const handleEthinic = (e) => {
    setEthinic(e.target.value);
  };
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setEthinic(value);
  };
  const handleOrigin = (e) => {
    // console.log(e.target);
    // setValues({ ...values, [name]: value })
  };
  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundImage: `url(${image.earth})`,
        backgroundPosition: "calc(100% + 20px) calc(100% + 30px)",
      }}
    >
      <Header transparent />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.form}
        style={{ marginBottom: "0rem" }}
      >
        <Grid item>
          <form action="">
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              justifyContent="center"
              className={classes.formContainer}
              style={{ marginTop: lgScreen ? "3.25rem" : "9.5rem" }}
              spacing={lgScreen ? 0 : 2}
            >
              <Grid item sm={12}>
                {/* start */}
                <Grid container spacing={2} direction="column">
                  <Grid item style={{ paddingBottom: "0" }}>
                    <Typography className={classes.inputLabel} variant="h3">
                      Origin
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    style={{ marginBottom: "0.7rem" }}
                  >
                    <Grid item className={classes.selectContainer}>
                      <Select
                        value={values.origin}
                        // onChange={handleSelect}
                        variant="outlined"
                        className={classes.select}
                        color="primary"
                        name="origin"
                        MenuProps={{
                          className: classes.menuOrigin,
                        }}
                        onClick={handleOpenDialog}
                        // classes={{ root: classes.selectRoot }}
                        inputProps={{
                          classes: {
                            root: classes.border,
                          },
                        }}
                        IconComponent={() => (
                          <KeyboardArrowDown className={classes.dropdownIcon} />
                        )}
                      >
                        <MenuItem
                          ref={menuItemRef}
                          dense
                          className={classes.menuItem}
                          value={"0"}
                        >
                          <em className={classes.none}>Choose origin</em>
                        </MenuItem>
                        {ethnicityList.map((item) => (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="flex-start"
                      className={classes.switchContainer}
                    >
                      <span>Show on profile</span>
                      <Checkbox
                        variant="switch"
                        name="origin"
                        show={show.origin}
                        handleShow={handleShow}
                      />
                    </Grid>
                  </Grid>
                  <Dialog open={isDialogOpen} className={classes.dialog}>
                    <Grid
                      container
                      direction="column"
                      className={classes.dialogContainer}
                    >
                      <Typography className={classes.dialogTitle}>
                        Origin
                      </Typography>
                      <Typography className={classes.dialogSubtitle}>
                        You can choose single option
                      </Typography>
                      <Grid
                        item
                        container
                        justifyContent="center"
                        spacing={2}
                        className={classes.chipsContainer}
                      >
                        {ethnicityList.map((item) => (
                          <ChipRadio
                            label={item}
                            name="origin"
                            id={item}
                            key={item}
                            value={item}
                            handleShow={handleSelect}
                          />
                        ))}
                      </Grid>
                      <Grid item container justifyContent="center">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.dialogButton}
                          onClick={() => {
                            menuItemRef.current.click();
                            setIsDialogOpen(false);
                          }}
                        >
                          Continue
                        </Button>
                      </Grid>
                    </Grid>
                  </Dialog>
                </Grid>
                {/* <SelectOption
                  checkboxVaraint="switch"
                  label="Origin"
                  options={race}
                  placeholder="Choose Origin"
                  show={show.origin}
                  handleShow={handleShow}
                  name="origin"
                  onSelect={handleSelect}
                  value={values.origin}
                /> */}
              </Grid>
              <Grid item sm={12}>
                {/* start */}
                <Grid container spacing={2} direction="column">
                  <Grid item style={{ paddingBottom: "0" }}>
                    <Typography className={classes.inputLabel} variant="h3">
                      Ethnic Background
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    style={{ marginBottom: "0.7rem" }}
                  >
                    <Grid item className={classes.selectContainer}>
                      <Select
                        value={ethinic}
                        onChange={handleEthinic}
                        // variant="outlined"
                        multiple
                        className={classes.select1}
                        color="primary"
                        name="ethinic"
                        // classes={{ root: classes.selectRoot }}
                        inputProps={{
                          classes: {
                            root: classes.border,
                          },
                          placeholder: "Choose counrty",
                        }}
                        IconComponent={() => (
                          <KeyboardArrowDown className={classes.dropdownIcon} />
                        )}
                        input={
                          <InputBase
                            placeholder="placeholder"
                            style={{
                              border: `2px solid ${theme.palette.primary.main}`,
                            }}
                            id="select-multiple-chip"
                          />
                        }
                        renderValue={() => (
                          <div className={classes.chips}>
                            {ethinic.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <MenuItem dense className={classes.menuItem} value={[]}>
                          <em className={classes.none}>Choose country</em>
                        </MenuItem>
                        {countryList.map((option, index) => (
                          <MenuItem
                            key={option}
                            className={classes.menuItem}
                            value={option}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="flex-start"
                      className={classes.switchContainer}
                    >
                      <span>Show on profile</span>
                      <Checkbox
                        variant="switch"
                        name="ethnic"
                        show={show.ethnic}
                        handleShow={handleShow}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* <SelectOption
                  checkboxVaraint="switch"
                  label="Ethnic Background"
                  options={countryList}
                  placeholder="Choose Country"
                  show={show.ethinic}
                  handleShow={handleShow}
                  name="ethinic"
                  onSelect={handleSelect}
                  value={values.ethinic}
                /> */}
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Religion"
                  options={religion}
                  placeholder="Choose Religion"
                  show={show.religion}
                  handleShow={handleShow}
                  name="religion"
                  onSelect={handleSelect}
                  value={values.religion}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Politics"
                  options={politics}
                  placeholder="Choose an option"
                  show={show.politics}
                  handleShow={handleShow}
                  name="politics"
                  onSelect={handleSelect}
                  value={values.politics}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Have children?"
                  options={haveChild}
                  placeholder="Choose an option"
                  show={show.haveChildren}
                  handleShow={handleShow}
                  name="haveChildren"
                  onSelect={handleSelect}
                  value={values.haveChildren}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Want children?"
                  options={wantChild}
                  placeholder="Choose an option"
                  show={show.wantChildren}
                  handleShow={handleShow}
                  name="wantChildren"
                  onSelect={handleSelect}
                  value={values.wantChildren}
                />
              </Grid>
              <Grid item container alignItems="center" justifyContent="center">
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
