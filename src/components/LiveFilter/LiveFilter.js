import React, { useEffect } from "react";
import { useStyles } from "./liveFilterStyles";
import Geocode from "react-geocode";
import {
  Grid,
  // eslint-disable-next-line
  IconButton,
  Typography,
} from "@material-ui/core";
import image from "../../assets/index";
import { liveStreamUsers } from "../../http/index";
import { useHistory } from "react-router";

export const LiveFilter = ({ liveUsers }) => {
  const classes = useStyles();
  const history = useHistory();
  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num < 900) {
      return num;
    }
  };
  const getCityName = (lat, long) => {
    Geocode.setApiKey("AIzaSyBxOe5RS4eCqljuY7N8kHrUGMaN1DuyD9U");
    Geocode.fromLatLng(lat, long).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleJoinStream = (username) => {
    history.push(`joinstream/${username}`);
  };

  useEffect(() => {
    (async () => {
      const { data } = await liveStreamUsers();
      console.log(data);
    })();
  }, []);
  return (
    <Grid
      container
      className={classes.container}
      // justifyContent="center"
      spacing={3}
      style={{ height: "100%" }}
    >
      {liveUsers.map((user) => (
        <Grid
          item
          key={user._id}
          onClick={() => handleJoinStream(user.username)}
        >
          <div className={classes.liveUser}>
            <img
              src={user.image}
              className={classes.liveUserImage}
              alt="live-user"
            />
            <div className={classes.userOverly}>
              <Grid container>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <div className={classes.views}>
                      <img src={image.eye} alt="eye-icon" />
                      <span className={classes.viewCount}>
                        {numFormatter(user.joinUsersCount)}
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Grid item container className={classes.userInfoContainer}>
                  <Grid item container justifyContent="space-between">
                    <Typography className={classes.userInfo}>
                      {user.username}
                    </Typography>
                    <Typography className={classes.userInfo}>25</Typography>
                  </Grid>
                  <Grid item style={{ width: "100%" }}>
                    <Typography className={classes.userCity}>
                      {/* {getCityName(
                        user.location.coordinates[1],
                        user.location.coordinates[0]
                      )} */}
                      New York
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      ))}
      {/* <Grid item>
        <div className={classes.liveUser}>
          <img
            src={image.liveuser}
            className={classes.liveUserImage}
            alt="live-user"
          />
          <div className={classes.userOverly}>
            <Grid container>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <div className={classes.views}>
                    <img src={image.eye} alt="eye-icon" />
                    <span className={classes.viewCount}>3.4k</span>
                  </div>
                </Grid>
                <Grid item>
                  <IconButton className={classes.vsButton}>
                    <span>vs</span>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container className={classes.userInfoContainer}>
                <Grid item container justifyContent="space-between">
                  <Typography className={classes.userInfo}>
                    Jenna Green
                  </Typography>
                  <Typography className={classes.userInfo}>25</Typography>
                </Grid>
                <Grid item style={{ width: "100%" }}>
                  <Typography className={classes.userCity}>New York</Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid> */}
    </Grid>
  );
};
