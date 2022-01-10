import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  IconButton,
  Slider,
  Button,
  Tabs,
  Tab,
  Dialog,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import DatePicker from "../datePicker/DatePicker";
import image from "../../assets/index";

const DateScheduler = ({ open, setOpen, onContinue }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(1);
  const [sliderValue, setSliderValue] = useState([11, 23]);
  const handleTab = (e, tab) => {
    setTab(tab);
  };
  const [date, setDate] = useState({
    month: null,
    day: null,
    year: null,
  });
  const handleTime = (event, time) => {
    setSliderValue(time);
  };
  const handleValueLabel = (value) => {
    let x = value;
    if (x > 12) {
      x = x - 12;
      return `${x}pm`;
    } else if (x === 12) {
      return `${x}pm`;
    } else {
      return `${x}am`;
    }
  };
  const getTime = () => {
    const [t1, t2] = sliderValue;
    const fromDate = new Date(
      date.year,
      date.month,
      date.day,
      t1,
      0,
      0
    ).toISOString();
    const toDate = new Date(
      date.year,
      date.month,
      date.day,
      t2,
      0,
      0
    ).toISOString();
    console.log(fromDate, toDate);
  };
  const handleDateContinue = () => {
    setOpen(false);
    if (onContinue) {
      onContinue();
    }
    getTime();
  };
  useEffect(() => {
    const currentDate = new Date(Date.now());
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    if (month === date.month && day === date.day && year === date.year) {
      const startHour = currentDate.getHours();
      setSliderValue([startHour + 1, startHour + 2]);
    } else setSliderValue([8, 22]);
  }, [date]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dateDialog}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.dateDialogContainer}
      >
        <Grid item container>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.dateDialogTitle}>
                Date Scheduler
                <img
                  src={image.dotedwatchblue}
                  className={classes.watchblue}
                  alt=""
                />
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => setOpen(false)}
                className={classes.closeButton}
              >
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          className={classes.innerContainer}
        >
          <Grid item>
            <Typography className={classes.availableText}>
              I am available
            </Typography>
          </Grid>
          <Grid item container className={classes.datePicker}>
            <DatePicker setDate={setDate} />
          </Grid>
          <Grid item container>
            <Slider
              onChange={handleTime}
              value={sliderValue}
              defaultValue={[11, 23]}
              min={1}
              max={24}
              valueLabelDisplay="on"
              classes={{ root: classes.sliderRoot }}
              valueLabelFormat={handleValueLabel}
            />
          </Grid>

          <Grid
            item
            container
            justifyContent="space-between"
            className={classes.dialogIconContainer}
          >
            <Tabs onChange={handleTab} value={tab} className={classes.tabs}>
              <Tab
                disableRipple
                className={classes.tab}
                icon={
                  <img
                    src={image.phoneBlue}
                    className={classes.iconImage1}
                    alt=""
                  />
                }
              />
              <Tab
                disableRipple
                className={classes.tab}
                icon={
                  <img
                    src={image.videoBlue}
                    className={classes.iconImage1}
                    alt=""
                  />
                }
              />
              <Tab
                disableRipple
                className={classes.tab}
                icon={
                  <img
                    src={image.message}
                    className={classes.iconImage1}
                    alt=""
                  />
                }
              />
            </Tabs>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.continueButton}
              onClick={handleDateContinue}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default DateScheduler;

const useStyles = makeStyles((theme) => ({
  dateDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "39px",
    },
  },
  dateDialogContainer: {
    padding: "2rem",
    width: "600px",
    [theme.breakpoints.down("lg")]: {
      width: "480px",
    },
    backgroundColor: theme.palette.common.lightPink,
  },
  dateDialogTitle: {
    margin: 0,
    color: theme.palette.primary.main,
    fontSize: "22px",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  watchblue: {
    marginLeft: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "1.25rem",
      marginLeft: "1.5rem",
    },
  },
  closeButton: {
    height: "30px",
    width: "30px",
    [theme.breakpoints.down("lg")]: {
      height: "20px",
      width: "20px",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  closeIcon: {
    fontSize: "2.5rem",
    color: "#ACACAC",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2rem",
    },
  },
  availableText: {
    margin: 0,
    color: "#000",
    fontSize: "22px",
    marginTop: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginTop: "1.5rem",
    },
  },
  sliderRoot: {
    color: theme.palette.primary.main,
    height: "2px",
    width: "80%",
    marginInline: "auto",
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0rem",
      width: "100%",
    },
    "& .MuiSlider-thumb": {
      height: "17px",
      width: "17px",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[3],
      marginTop: "-8.5px",
      marginLeft: "-8.5px",
    },
    "& 	.MuiSlider-valueLabel": {
      // left: "calc(-50% + 12px)",
      left: "-50%",
      top: "-18px",
      "& *": {
        background: "transparent",
        color: "#000",
        fontSize: "13px",
      },
    },
  },
  continueButton: {
    width: "369px",
    height: "57px",
    borderRadius: "29px",
    textTransform: "none",
    fontSize: "16px",
    // marginTop: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "45px",
      fontSize: "13px",
    },
  },
  dialogIconContainer: {
    margin: "3rem 0",
    [theme.breakpoints.down("lg")]: {
      margin: "2rem 0",
    },
  },
  dialogIcon: {
    [theme.breakpoints.down("lg")]: {
      height: "1.8rem",
    },
  },
  text: {
    fontSize: "12px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "10px",
    },
  },

  dateRoot: {
    marginTop: "2rem",
    "& .MuiInput-underline::before": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  innerContainer: {
    padding: "0rem 3rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
    },
  },
  iconImage: {
    [theme.breakpoints.down("lg")]: {
      width: "3.4rem",
    },
  },
  iconImage1: {
    transition: "0.6s ease",
    [theme.breakpoints.down("lg")]: {
      width: "2.5rem",
    },
  },
  datePicker: {
    marginBlock: "30px",
    [theme.breakpoints.down("lg")]: {
      marginBlock: "15px",
    },
  },
  tabs: {
    width: "90%",
    marginInline: "auto",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
  },
  tab: {
    minWidth: "0",
    opacity: "0.5",
    "&.Mui-selected": {
      "& img": {
        transform: "scale(1.15)",
      },
    },
  },
}));
