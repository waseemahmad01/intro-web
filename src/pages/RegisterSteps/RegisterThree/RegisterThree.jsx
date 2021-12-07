import React, { useState, useRef } from "react";
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
  makeStyles,
  Checkbox as MuiCheckbox,
  ListItemText,
} from "@material-ui/core";
import axios from "axios";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import image from "../../../assets/index";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import {
  religion as religionApi,
  children,
  ethnicityApi,
  step,
} from "../../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import * as allCounrtry from "country-flag-emoji-json";
import {
  religion,
  politics,
  haveChild,
  wantChild,
  ethnicityList,
} from "../../../data";
import ChipRadio from "../../../components/chipRadioButton/ChipRadio";
import Joi from "joi-browser";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff8f5",
    backgroundSize: "554.5px 520.5px, 330px 250px",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("lg")]: {
      backgroundSize: "390px 390px, 240px 190px",
    },
  },

  form: {
    padding: "0 8rem",
    marginTop: "5rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0 5rem",
      marginTop: "7rem",
    },
  },
  formContainer: {
    width: "860px",
    marginTop: "2rem",
    padding: "10px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
      // padding: "5px 10px",
      width: "680px",
    },
    zIndex: 1,
  },
  checkbox: {
    color: theme.palette.primary.main,
    borderRadius: "4px",
    transform: "scale(1.6)",
    [theme.breakpoints.down("lg")]: {
      transform: "scale(1.3)",
    },
  },

  p: {
    textAlign: "left",
    color: "#000",
    marginTop: "2rem",
    fontSize: "23px",
    fontWeight: "100",
    "& a": {
      color: "#000    ",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
      marginTop: "1rem",
    },
  },
  skipButton: {
    backgroundColor: theme.palette.primary.main,
    width: "134px",
    height: "85px",
    borderRadius: "43px",
    marginTop: "20px",
    marginLeft: "3rem",
    fontSize: "28px",
    color: "#ffff",
    fontWeight: "700",
    textTransform: "capitalzie",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    display: "inline-block",
    [theme.breakpoints.down("lg")]: {
      width: "80px",
      height: "50px",
      fontSize: "18px",
      marginTop: "10px",
    },
  },
  title: {
    marginLeft: "34px",
    marginBottom: "0.8rem",
  },
  checkboxWithText: {
    backgroundColor: "#fff",
    borderRadius: "34px",
    border: `2px solid  ${theme.palette.primary.main}`,
    width: "264px",
    height: "62px",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "100%",
    },
  },
  label: {
    marginLeft: "15px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      width: "88%",
    },
  },
  showProfileText: {
    fontSize: "15px",
    marginRight: "10px",
    marginLeft: "20px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
  checkboxContainer: {
    marginBottom: "1rem",
    paddingLeft: "16px",
    width: "880px",
    [theme.breakpoints.down("lg")]: {
      width: "700px",
    },
  },
  t2: {
    fontSize: "18px",
    fontWeight: "100",
  },
  inputContainer: {
    width: "456px",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
    },
  },
  formControlLabel: {
    border: `2px solid ${theme.palette.primary.main}`,
    width: "264px",
    height: "62px",
    borderRadius: "34px",
    backgroundColor: "white",
    padding: "0.5rem",
    margin: "0",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "100%",
    },
    "&.MuiFormControlLabel-root": {
      justifyContent: "space-between",
    },
    "& .MuiFormControlLabel-label": {
      color: "#000000",
      margin: "0",
      marginLeft: "5px",
      fontSize: "18px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "14px",
      },
    },
  },

  // select styles
  selectContainer: {
    width: "456px",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
    },
  },
  select: {
    width: "456px",
    borderRadius: "34px",
    backgroundColor: "#fff",
    fontSize: "22px",
    marginBottom: "10px",
    height: "62px",
    textAlign: "left",
    paddingLeft: "0.4rem",
    "& .MuiSelect-selectMenu": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "40px",
      fontSize: "15px",
      marginBottom: "0px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  select1: {
    width: "456px",
    borderRadius: "34px",
    backgroundColor: "#fff",
    fontSize: "22px",
    marginBottom: "10px",
    minHeight: "62px",
    textAlign: "left",
    paddingLeft: "0.4rem",
    "& .MuiSelect-selectMenu": {
      backgroundColor: "transparent",
    },
    "&:before": {
      borderColor: "transparent",
    },
    "&:after": {
      borderColor: "transparent",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      minHeight: "40px",
      fontSize: "15px",
      marginBottom: "0px",
    },
  },
  menuOrigin: {
    visibility: "hidden",
    "& .MuiMenu-paper": {
      visibility: "hidden",
    },
  },
  inputLabel: {
    marginLeft: "25px",
    padding: "none",
    fontWeight: "300",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
      marginLeft: "14px",
    },
  },
  switchRoot: {},
  switchContainer: {
    marginTop: "-10px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0px",
    },
    width: "210px",
    "& span": {
      fontSize: "15px",
      marginRight: "20px",
      marginLeft: "15px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        marginLeft: "10px",
        marginRight: "10px",
      },
    },
  },
  dropdownIcon: {
    fontSize: "2rem",
    marginRight: "5px",
    fontWeight: "700",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.7rem",
    },
  },
  none: {
    color: "rgba(112,112,112,0.5)",
  },

  //   dialog styles
  dialog: {
    "& .MuiDialog-paper": {
      border: "1px solid #707070",
      borderRadius: "0px",
    },
  },
  dialogContainer: {
    backgroundColor: theme.palette.common.lightPink,
    // padding: "36px 20px",
    paddingBlock: "36px 25px",
    paddingInline: "20px",
  },
  dialogTitle: {
    margin: 0,
    color: "#000000",
    textAlign: "left",
    fontSize: "22px",
    fontWeight: "bold",
  },
  dialogSubtitle: {
    margin: 0,
    color: "#828282",
    textAlign: "left",
    fontSize: "18px",
  },
  chipsContainer: {
    marginTop: "35px",
  },
  dialogButton: {
    width: "369px",
    height: "57px",
    margin: 0,
    fontSize: "16px",
    color: "#ffffff",
    marginTop: "1.25rem",
    textTransform: "none",
    borderRadius: "29px",
  },
  active: {
    border: "2px solid red",
  },
  menuItem: {
    color: "#000",
    marginBottom: "5px",
    fontSize: "22px",
    "&:hover": {
      backgroundColor: "#e7e7e7",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  underline: {
    // visibility: "hidden",
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderColor: "transparent",
    },
  },
  chips: { display: "flex", flexWrap: "wrap" },
  chip: {
    margin: "2px",
    [theme.breakpoints.down("lg")]: {
      height: "23px",
      margin: "1px",
      fontSize: "11px",
    },
  },
  error: {
    color: theme.palette.error.main,
    fontSize: "1.3rem",
    marginLeft: "10px",
    marginTop: "5px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
    },
  },
  listItemText: {
    "& .MuiListItemText-primary": {
      margin: 0,
      color: "#000000",
      fontSize: "22px",
      textAlign: "left",
      marginLeft: "10px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "15px",
      },
    },
  },
  menu: {
    // backgroundColor: "red",
    "& .MuiMenu-paper": {
      maxHeight: "55vh",
    },
  },
  customPlaceHolder: {
    color: "#000000",
    opacity: "0.4",
    position: "absolute",
    fontSize: "22px",
    top: "20px",
    left: "20px",
    zIndex: 0,
    [theme.breakpoints.down("lg")]: {
      top: "11px",
      left: "20px",
      fontSize: "15px",
    },
  },
}));

export const RegisterThree = ({ onNext }) => {
  const countryList = allCounrtry.default;
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const menuItemRef = useRef();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ethinic, setEthinic] = useState([]);

  const [show, setShow] = useState({
    origin: true,
    ethnic: true,
    religion: true,
    politics: true,
    haveChildren: true,
    wantChildren: true,
  });
  const [values, setValues] = useState({
    origin: "0",
    religion: "0",
    politics: "0",
    haveChildren: "0",
    wantChildren: "0",
  });
  const [errors, setErrors] = useState({
    origin: "",
    religion: "",
    politics: "",
    haveChildren: "",
    wantChildren: "",
  });
  const schema = {
    origin: Joi.string().min(2).required(),
    religion: Joi.string().min(2).required(),
    politics: Joi.string().min(2).required(),
    wantChildren: Joi.string().min(2).required(),
    haveChildren: Joi.string().min(2).required(),
    ethinic: Joi.array().items(Joi.string().required()).required(),
  };
  const validate = () => {
    const data = { ...values, ethinic };
    const result = Joi.validate(data, schema, { abortEarly: false });

    if (!result.error) {
      setErrors({
        origin: "",
        religion: "",
        politics: "",
        haveChildren: "",
        wantChildren: "",
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
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleEthinic = (e) => {
    setEthinic(e.target.value);
    const obj = { ethinic: e.target.value };
    const subSchema = { ethinic: schema.ethinic };
    const { error } = Joi.validate(obj, subSchema);
    // eslint-disable-next-line
    const it = error
      ? setErrors({
          ...errors,
          ethinic: `"Ethinic Background" can not be empty`,
        })
      : setErrors({ ...errors, ethinic: "" });
  };
  // eslint-disable-next-line
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
  const handleNext = async () => {
    const error = validate();
    if (!error) {
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
          religionApi(religionData),
          children(childData),
        ])
        .then(
          axios.spread(function (res1, res2, res3) {
            dispatch(submit(res3.data));
            onNext();
          })
        )
        .catch((err) => console.log(err.message));
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
                      Race
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
                        error={errors.origin}
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
                      {errors.origin && (
                        <span className={classes.error}>{errors.origin}</span>
                      )}
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
                    <Grid
                      item
                      style={{ position: "relative" }}
                      className={classes.selectContainer}
                    >
                      <Select
                        value={ethinic}
                        onChange={handleEthinic}
                        // variant="outlined"
                        multiple
                        error={true}
                        className={classes.select1}
                        color="primary"
                        name="ethinic"
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                          className: classes.menu,
                        }}
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
                            style={{
                              border: errors.ethinic
                                ? `2px solid ${theme.palette.error.main}`
                                : `2px solid ${theme.palette.primary.main}`,
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
                            key={option.unicode}
                            className={classes.menuItem}
                            value={option.name}
                          >
                            <MuiCheckbox
                              color="primary"
                              style={{
                                transform: lgScreen ? "scale(1)" : "scale(1.4)",
                                marginRight: "10px",
                              }}
                              checked={ethinic.indexOf(option.name) > -1}
                            />
                            <img
                              src={option.image}
                              width={lgScreen ? "30px" : "40px"}
                              alt=""
                            />
                            <ListItemText
                              className={classes.listItemText}
                              primary={option.name}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                      {ethinic.length === 0 ? (
                        <span className={classes.customPlaceHolder}>
                          <em> Choose Country</em>
                        </span>
                      ) : undefined}

                      {errors.ethinic && (
                        <span className={classes.error}>{errors.ethinic}</span>
                      )}
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
                  error={errors.religion}
                  errorText={errors.religion}
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
                  error={errors.politics}
                  errorText={errors.politics}
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
                  error={errors.haveChildren}
                  errorText={errors.haveChildren}
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
                  error={errors.wantChildren}
                  errorText={errors.wantChildren}
                />
              </Grid>
              <Grid item container alignItems="center" justifyContent="center">
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
