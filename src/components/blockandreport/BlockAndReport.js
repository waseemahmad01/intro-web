import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Dialog,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import { CloseRounded, ArrowForward } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { blockAndReport, getUser, unMatchUser } from "../../http";
import { submit } from "../../store/user";

const BlockAndReport = ({
  open,
  setOpen,
  userId,
  unMatch,
  chatId,
  userUnMatched,
  setUserUnMatched,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.data);
  const [reason, setReason] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [feedback, setFeedback] = useState("");
  const reasons = [
    "No reason",
    "Profile is fake, scam or scammer",
    "Inappropriate content",
    "Underage or Minor",
    "Offline behavior",
    "Someone is in danger",
    "Other",
  ];
  const handleReasonClick = (reason) => {
    setReason(reason);
    setShowReport(true);
  };
  const handleUnmatchUser = async () => {
    try {
      const { data } = await unMatchUser(chatId);
      console.log(data);
      localStorage.setItem("index", 0);
      setOpen(false);
      setUserUnMatched(!userUnMatched);
    } catch (err) {
      alert("something went wrong");
      console.log(err.message);
    }
  };
  const handleSubmit = async () => {
    try {
      const apiData = {
        user_id: userId,
        report_title: reason,
        report_message: feedback,
      };
      await blockAndReport(apiData);
      const { data } = await getUser();
      dispatch(submit(data));
      setShowReport(false);
      setOpen(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  return (
    <Dialog open={open} className={classes.dialog}>
      <Grid container direction="column" className={classes.container}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Typography className={classes.title}>
            {unMatch ? "Unmatch" : "Block & report"}
          </Typography>
          <IconButton
            disabled={showReport}
            onClick={() => setOpen(!open)}
            disableRipple
            className={classes.closeButton}
          >
            <CloseRounded className={classes.closeIcon} />
          </IconButton>
        </Grid>
        {unMatch ? (
          <>
            <Grid
              item
              container
              direction="column"
              className={classes.reasonsContainer}
            >
              {reasons.map((el, index) => (
                <Grid
                  item
                  container
                  key={index}
                  justifyContent="space-between"
                  className={classes.reasonRow}
                  onClick={handleUnmatchUser}
                >
                  <Typography className={classes.reason}>{el}</Typography>
                  <ArrowForward className={classes.arrowIcon} />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              container
              direction="column"
              className={classes.helpTextContainer}
            >
              <Typography align="center" className={classes.helpText}>
                Help us keep the Intro safe by telling us why you are{" "}
                {unMatch ? "un-matching " : "blocking "}
                this user
              </Typography>
              <Typography
                align="center"
                className={`${classes.helpText} ${classes.marginTop}`}
              >
                Don’t worry this is anonymous
              </Typography>
            </Grid>
          </>
        ) : (
          ""
        )}
        {showReport ? (
          unMatch ? (
            ""
          ) : (
            <>
              <Grid
                item
                container
                direction="column"
                className={classes.reasonsContainer}
              >
                <Typography className={classes.reportTitle}>
                  Write your report
                </Typography>
                <Typography
                  style={{ width: "100%", textAlign: "left" }}
                  className={`${classes.helpText}`}
                >
                  The more detail you give, the better we can understand what
                  has happened.
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="column"
                className={classes.feedBackContainer}
              >
                <Typography className={classes.feedBackTitle}>
                  Feedback
                </Typography>
                <TextField
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className={classes.textFieldRoot}
                  InputProps={{
                    className: classes.textField,
                  }}
                  variant="outlined"
                  multiline
                  minRows={8}
                  maxRows={8}
                  placeholder="Tell us what happened..."
                />
                <Typography align="center" className={classes.helpText}>
                  If we need more information, we’ll contact you at
                  <br />
                  {user.email}
                </Typography>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </>
          )
        ) : unMatch ? (
          ""
        ) : (
          <>
            <Grid
              item
              container
              direction="column"
              className={classes.reasonsContainer}
            >
              {reasons.map((el, index) => (
                <Grid
                  item
                  container
                  key={index}
                  justifyContent="space-between"
                  className={classes.reasonRow}
                  onClick={() => handleReasonClick(el)}
                >
                  <Typography className={classes.reason}>{el}</Typography>
                  <ArrowForward className={classes.arrowIcon} />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              container
              direction="column"
              className={classes.helpTextContainer}
            >
              <Typography align="center" className={classes.helpText}>
                Help us keep the Intro safe by telling us why you are blocking
                this user
              </Typography>
              <Typography
                align="center"
                className={`${classes.helpText} ${classes.marginTop}`}
              >
                Don’t worry this is anonymous
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
};

export default BlockAndReport;

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "10px",
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  container: {
    width: "500px",
    padding: "20px 30px",
    [theme.breakpoints.down("lg")]: {
      width: "400px",
    },
  },
  title: {
    margin: 0,
    fontSize: "30px",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    [theme.breakpoints.down("lg")]: {
      fontSize: "23px",
    },
  },
  closeButton: {
    width: "35px",
    height: "35px",
    [theme.breakpoints.down("lg")]: {
      width: "25px",
      height: "25px",
    },
  },
  closeIcon: {
    fontSize: "30px",
    color: "#000000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  reasonsContainer: {
    marginTop: "10px",
  },
  reasonRow: {
    borderBottom: "2px solid #E0E0E0",
    paddingBlock: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
  reason: {
    margin: "0",
    fontSize: "20px",
    color: "#828282",
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  arrowIcon: {
    fontSize: "30px",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  helpTextContainer: {
    paddingBlock: "3rem 2rem",
    [theme.breakpoints.down("lg")]: {
      paddingBlock: "1.5rem 1rem",
    },
  },
  helpText: {
    margin: 0,
    color: "#828282",
    fontSize: "18px",
    opacity: "0.8",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  marginTop: {
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0.5rem",
    },
  },
  reportTitle: {
    fontSize: "30px",
    margin: 0,
    width: "100%",
    textAlign: "left",
    fontWeight: "bold",
    color: "#828282",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  feedBackTitle: {
    margin: "0",
    width: "100%",
    textAlign: "left",
    fontSize: "16px",
    marginBottom: "1rem",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("lg")]: {
      marginBottom: "0.5rem",
    },
  },
  feedBackContainer: {
    marginBlock: "3rem 0rem",
    [theme.breakpoints.down("lg")]: {
      marginBlock: "1.5rem 0",
    },
  },
  textFieldRoot: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: `2px solid #828282b3}`,
      },
      "&:hover fieldset": {
        border: `2px solid #828282b3`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  textField: {
    borderRadius: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
      marginBottom: "1rem",
    },
  },
  button: {
    height: "60px",
    marginTop: "2rem",
    marginBottom: "0",
    borderRadius: "30px",
    textTransform: "none",
    fontSize: "16px",
    [theme.breakpoints.down("lg")]: {
      height: "50px",
      borderRadius: "25px",
      fontSize: "14px",
    },
  },
}));
