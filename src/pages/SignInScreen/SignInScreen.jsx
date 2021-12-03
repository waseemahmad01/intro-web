import React, { useState, useContext } from "react";
import {
  makeStyles,
  Grid,
  Select,
  MenuItem,
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  Typography,
  Button,
} from "@material-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { Header } from "../../components/header/Header";
import image from "../../assets/index";
import OtpInput from "react-otp-input";
import { login, verify } from "../../http";
import { submit } from "../../store/user";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";
import { SocketContext } from "../../http/socket";
// import io from "socket.io-client";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fbfbfb",
    height: "100vh",
  },
  logoContainer: {
    marginBottom: "0",
    "& img": {
      height: "245px",
      width: "306px",
      [theme.breakpoints.down("lg")]: {
        height: "12rem",
      },
    },
  },
  select: {
    // "&.Mui-focused": {
    // 	border: "1px solid transparent",
    // },
    width: "128px",
    borderRadius: "34px",
    // border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
    fontSize: "21px",
    marginBottom: "10px",
    height: "59px",
    // color: "rgba(112,112,112,0.5)",
    color: "#000000",
    // boxShadow: theme.shadows[3],
    "& .MuiSelect-selectMenu": {
      backgroundColor: "transparent",
    },
    "& .MuiInputBase-root ": {
      textAlign: "center",
    },
    "& .MuiSelect-icon": {
      postion: "absolute",
      left: "5px",
      [theme.breakpoints.down("lg")]: {
        left: "3px",
      },
    },
    [theme.breakpoints.down("lg")]: {
      width: "90px",
      height: "40px",
      fontSize: "15px",
      // border: `1px solid ${theme.palette.primary.main}`,
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
    "& .MuiSelect-outlined": {
      padding: 0,
    },
  },
  inputContainer: {
    marginTop: "1.7rem",
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
  input: {
    fontSize: "21px",
    backgroundColor: "#fff",
    borderRadius: "34px",
    height: "59px",
    margin: "0",
    // border: `2px solid ${theme.palette.primary.light}`,
    paddingLeft: "7px",
    marginLeft: "0.5rem",
    width: "336px",
    // boxShadow: theme.shadows[3],
    [theme.breakpoints.down("lg")]: {
      width: "250px",
      height: "40px",
      fontSize: "15px",
      // border: `1px solid ${theme.palette.primary.light}`,
    },
  },
  divider: {
    width: "519.3px",
    height: "26px",
    textAlign: "center",
    borderBottom: "2px solid #7e7e7e",
    marginTop: "3.1rem",
    marginBottom: "3.9rem",
    "& p": {
      lineHeight: "26px",
      fontSize: "19px",
      color: "#7e7e7e",
      backgroundColor: "#fbfbfb",
      marginTop: "10px",
      display: "inline-block",
      width: "40px",
    },
  },
  dialogRoot: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
    },
  },
  dialogContainer: {
    backgroundColor: theme.palette.common.lightPink,
    padding: "1rem 4rem",
  },
  dialogTitle: {
    color: "#333333",
    margin: 0,
    fontSize: "21px",
    marginTop: "0.75rem",
  },
  dialogSubtitle: {
    color: "#333333",
    margin: 0,
    fontSize: "18px",
  },
  verifyContainer: {
    margin: "2rem 0",
  },
  verifyButton: {
    width: "274px",
    height: "52px",
    textTransform: "none",
    fontSize: "17px",
    borderRadius: "26px",
    fontWeight: 700,
  },
  resendButton: {
    width: "274px",
    height: "52px",
    textTransform: "none",
    fontSize: "17px",
    borderRadius: "26px",
    marginTop: "1rem",
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: 700,
  },
  facebookButton: {
    backgroundColor: "#3B5998",
    marginTop: "0.5rem",
    width: "320px",
    height: "50px",
    textTransform: "none",
    fontSize: "21px",
    fontWeight: 300,
    borderRadius: "33px",
    color: "#fff",
    boxSizing: "border-box",
    [theme.breakpoints.down("lg")]: {
      width: "270px",
      height: "40px",
      fontSize: "15px",
      marginTop: "0.15rem",
    },
    "&:hover": {
      backgroundColor: "#4262A5",
    },
    "&:first-child": {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
    },
  },
  fbIcon: {
    [theme.breakpoints.down("lg")]: {
      width: "1.5rem",
    },
  },
  googleButton: {
    backgroundColor: "#CE4317",
    width: "320px",
    height: "50px",
    textTransform: "none",
    fontSize: "23px",
    fontWeight: 300,
    borderRadius: "33px",
    color: "#fff",
    boxSizing: "border-box",
    [theme.breakpoints.down("lg")]: {
      width: "270px",
      height: "40px",
      fontSize: "15px",
    },
    "&:hover": {
      backgroundColor: "#D14B21",
    },
    "&:first-child": {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
    },
  },
  googleIcon: {
    [theme.breakpoints.down("lg")]: {
      width: "1.5rem",
    },
  },
  inputRoot: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
      "&:hover fieldset": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  errorSpan: {
    color: "red",
    lineHeight: "2rem",
    fontSize: "1.3rem",
  },
  error: {
    fontSize: "1.3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
    },
  },
  menu: {
    "& .MuiMenu-paper": {
      maxHeight: "35vh",
    },
  },
}));

export const SignInScreen = (props) => {
  const classes = useStyles();
  const socket = useContext(SocketContext);
  console.log(socket);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const dispatch = useDispatch();
  const [error, setError] = useState({
    otp: "",
    phonenumber: "",
  });
  const schema = {
    phonenumber: Joi.number().required().label("Phone number"),
  };
  const validate = () => {
    const result = Joi.validate(
      {
        phonenumber: phoneNumber,
      },
      schema
    );
    if (!result.error) {
      setError({
        otp: "",
        phonenumber: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = item.message;
      setError(errorsObject);
      return true;
    }
  };
  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };
  const handleSubmit = async () => {
    const err = validate();
    if (!err) {
      try {
        const number = countryCode + phoneNumber;
        const { data } = await login({
          phonenumber: number,
          channel: "sms",
        });
        setOpenDialog(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleOtp = (otp) => {
    setOtp(otp);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    const obj = {
      phonenumber: phoneNumber,
    };
    const subSchema = {
      phonenumber: Joi.number().required().label("Phone number"),
    };
    const { error } = Joi.validate(obj, subSchema);
    const it = error
      ? setError({ ...error, phonenumber: error.details[0].message })
      : setError({ ...error, phonenumber: "" });
  };
  const handleVerify = async () => {
    try {
      const number = countryCode + phoneNumber;
      if (otp === "123456") {
        const { data } = await verify({
          phonenumber: number,
          code: "123456",
        });
        socket.emit("login", data.data._id);
        if (data.data.step === "/home") {
          props.history.push("home");
        } else props.history.push("register");
        dispatch(submit(data));
        setOpenDialog(false);
      } else {
        setError({ ...error, otp: "Invalid otp code." });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const headerItems = [
    {
      label: "Help",
      to: "/helpcenter",
    },
  ];
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Header transparent headerItems={headerItems} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.innerContainer}
        direction="column"
      >
        <Grid item className={classes.logoContainer}>
          <img src={image.logo2x} alt="" />
        </Grid>
        <Grid item className={classes.inputContainer}>
          <Select
            value={countryCode}
            onChange={handleChange}
            variant="outlined"
            className={classes.select}
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
          >
            <MenuItem className={classes.menuItem} value="+1">
              +1
            </MenuItem>
            <MenuItem className={classes.menuItem} value="+92">
              +92
            </MenuItem>
            <MenuItem className={classes.menuItem} value="+93">
              +93
            </MenuItem>
          </Select>
          <TextField
            variant="outlined"
            type="tel"
            classes={{ root: classes.inputRoot }}
            placeholder="Phone Number"
            InputProps={{ className: classes.input }}
            onChange={handlePhoneNumber}
            error={error.phonenumber}
            helperText={error.phonenumber}
            FormHelperTextProps={{ className: classes.error }}
          />
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <CustomButton
            variant="btnBlue"
            styleProps={{
              height: lgScreen ? "40px" : "52px",
              width: lgScreen ? "100px" : "158px",
              fontSize: lgScreen ? "14px" : undefined,
            }}
            onClick={handleSubmit}
          >
            Sign In
          </CustomButton>
        </Grid>
        <Grid item className={classes.divider}>
          <p>Or</p>
        </Grid>
        <Grid item>
          <Button
            startIcon={
              <img
                src={image.googleIcon}
                className={classes.googleIcon}
                alt=""
              />
            }
            endIcon={
              <img
                src={image.facebook}
                alt=""
                style={{ visibility: "hidden", width: "0.1rem" }}
              />
            }
            className={classes.googleButton}
            variant="contained"
          >
            Sign in with Google
          </Button>
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <Button
            startIcon={
              <img src={image.facebook} className={classes.fbIcon} alt="" />
            }
            endIcon={
              <img
                src={image.facebook}
                alt=""
                style={{ visibility: "hidden", width: "0.1rem" }}
              />
            }
            className={classes.facebookButton}
            variant="contained"
          >
            Sign in with Facebook
          </Button>
        </Grid>
      </Grid>
      <Dialog
        className={classes.dialogRoot}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.dialogContainer}
        >
          <Grid item>
            <Typography className={classes.dialogTitle}>
              Enter your verification code
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.dialogSubtitle}>
              sent to {countryCode}-{phoneNumber}
            </Typography>
          </Grid>
          <Grid item className={classes.verifyContainer}>
            <OtpInput
              isInputNum
              value={otp}
              onChange={handleOtp}
              numInputs={6}
              separator={<span style={{ width: "10px" }} />}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                // width: "250px",
              }}
              inputStyle={{
                borderRadius: "11px",
                height: "53px",
                width: "67px",
                fontSize: "28px",
                color: theme.palette.primary.main,
                outline: "none",
                backgroundColor: "transparent",
                border: `1px solid ${theme.palette.primary.main}`,
              }}
              focusStyle={{
                background: "transparent",
                outline: "none",
              }}
            />
          </Grid>
          <Grid item>
            {error.otp && (
              <span className={classes.errorSpan}>{error.otp}</span>
            )}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.verifyButton}
              color="primary"
              onClick={handleVerify}
            >
              Verify
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.resendButton}
              color="primary"
              onClick={() => setOpenDialog(false)}
            >
              Resend
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};
