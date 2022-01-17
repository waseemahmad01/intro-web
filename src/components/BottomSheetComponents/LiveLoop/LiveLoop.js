import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Slider,
  Button,
} from "@material-ui/core";
import ChipRadio from "../../chipRadioButton/ChipRadio";
import { useSelector, useDispatch } from "react-redux";
import { createLiveloop } from "../../../http/index";
import { setFilters } from "../../../store/utils";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.breakpoints.down(1680)]: {
      padding: "1rem 2rem",
    },
  },
  title: {
    margin: "0",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontSize: "30px",
    fontWeight: 700,
    [theme.breakpoints.down(1680)]: {
      fontSize: "18px",
    },
  },
  description: {
    fontSize: "16px",
    marginTop: "0.5rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "12px",
      marginTop: "0.25rem",
    },
  },
  dateText: {
    margin: "0",
    color: "#000",
    fontSize: "21px",
    marginTop: "3rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
      marginTop: "0.6rem",
    },
  },
  chipContainer: {
    marginTop: "1rem",
    [theme.breakpoints.down(1680)]: {
      marginTop: "0.5rem",
    },
  },
  chip: {
    width: "140px",
    height: "56px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    fontSize: "17px",
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down(1680)]: {
      height: "30px",
      width: "90px",
      fontSize: "11px",
    },
  },
  allowText: {
    color: "#000",
    margin: "0",
    marginTop: "3rem",
    width: "100%",
    textAlign: "left",
    [theme.breakpoints.down(1680)]: {
      marginTop: "1rem",
      fontSize: "13px",
    },
  },
  sliderContainer: {
    marginTop: "1rem",
  },
  sliderRoot: {
    color: theme.palette.primary.main,
    height: "2px",
    "& .MuiSlider-thumb": {
      height: "17px",
      width: "17px",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[3],
      marginTop: "-8.5px",
      marginLeft: "-8.5px",
    },
    "& 	.MuiSlider-valueLabel": {
      left: "-50%",
      top: "-18px",
      "& *": {
        background: "transparent",
        color: "#000",
        fontSize: "13px",
      },
    },
  },
  sliderLabel: {
    color: "#000",
    margin: "0",
    fontSize: "17px",
    width: "100%",
    textAlign: "left",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
    },
  },
  startButton: {
    width: "194px",
    height: "48px",
    textTransform: "none",
    borderRadius: "38px",
    fontSize: "22px",
    marginTop: "1rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
      width: "120px",
      height: "30px",
    },
  },
  active: {
    border: "2px solid blue",
  },
}));
export const LiveLoop = ({
  setLiveLoop,
  handleSheetClose,
  setTab,
  setSheetVisible,
  joinLiveLoop,
}) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user.data);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    lon: "",
    lat: "",
  });
  const [age, setAge] = useState([22, 32]);
  const [distance, setDistance] = useState(2);
  const [gender, setGender] = useState("");
  const handleAge = (event, age) => {
    setAge(age);
  };
  const handleDistance = (event, distance) => {
    setDistance(distance);
  };
  const handleValueLabel = (value) => {
    return `${value}mi`;
  };
  // const handleClick = (e) => {
  //   e.target.classList.toggle(classes.active);
  // };
  const dateFilters = ["men", "women", "everyone"];
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const getGender = (gender) => {
    if (gender.toLowerCase() === "male" || gender.toLowerCase() === "men") {
      return 1;
    } else if (
      gender.toLowerCase() === "female" ||
      gender.toLowerCase() === "women"
    ) {
      return 0;
    } else {
      return 2;
    }
  };
  const getGenderIdentifier = () => {
    const profile = getGender(user.identify.gender);
    const search = getGender(gender);
    if (profile === 1 && search === 1) return "A";
    else if (profile === 1 && search === 0) return "B";
    else if (profile === 1 && search === 2) return "C";
    else if (profile === 0 && search === 1) return "D";
    else if (profile === 0 && search === 0) return "E";
    else if (profile === 0 && search === 2) return "F";
  };
  const startLiveLoop = async () => {
    try {
      dispatch(
        setFilters({
          gender_identifier: getGenderIdentifier(),
          age: age,
          distance: distance,
          location: {
            coordinates: [location.lon, location.lat],
          },
        })
      );
      const apiData = {
        username: user.username,
        image: user.profile_image,
        location: {
          coordinates: [location.lon, location.lat],
        },
        channelId: user.username,
        gender_identifier: getGenderIdentifier(),
        age: user.date_of_birth.age,
      };
      // eslint-disable-next-line
      // const { data } = await createLiveloop(apiData);
      setLiveLoop(true);
      handleSheetClose();
      setTab(0);
      setSheetVisible(false);
      joinLiveLoop();
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lon: pos.coords.longitude, lat: pos.coords.latitude });
      });
    }
  });
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <Typography className={classes.title}>Live Loop</Typography>
      </Grid>
      <Grid item>
        <p className={classes.description}>
          Speed date other users with a timer!
        </p>
      </Grid>
      <Grid item container>
        <Typography className={classes.dateText}>I want to date</Typography>
      </Grid>
      <Grid
        item
        container
        className={classes.chipContainer}
        justifyContent="space-between"
      >
        {dateFilters.map((item) => (
          <Grid key={item}>
            <ChipRadio
              name="gender"
              id={item}
              label={item}
              value={item}
              handleShow={handleGender}
              liveloop
            />
          </Grid>
        ))}
      </Grid>
      <Typography className={classes.allowText}>Only Allow</Typography>
      <Grid
        item
        container
        alignItems="center"
        className={classes.sliderContainer}
      >
        <Grid item lg={4}>
          <Typography className={classes.sliderLabel}>Age</Typography>
        </Grid>
        <Grid item lg={8}>
          <Slider
            onChange={handleAge}
            value={age}
            defaultValue={[22, 33]}
            min={18}
            max={99}
            valueLabelDisplay="on"
            classes={{ root: classes.sliderRoot }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        className={classes.sliderContainer}
      >
        <Grid item lg={4}>
          <Typography className={classes.sliderLabel}>
            People near me
          </Typography>
        </Grid>
        <Grid item lg={8}>
          <Slider
            onChange={handleDistance}
            value={distance}
            defaultValue={1}
            min={0}
            max={20}
            valueLabelDisplay="on"
            classes={{ root: classes.sliderRoot }}
            valueLabelFormat={handleValueLabel}
          />
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item></Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
          onClick={startLiveLoop}
        >
          Start
        </Button>
      </Grid>
    </Grid>
  );
};
