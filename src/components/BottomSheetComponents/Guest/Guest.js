import React, { useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import image from "../../../assets/index";
import { getLiveLoopRequests } from "../../../http/index";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    padding: "6rem 5rem",
    [theme.breakpoints.down(1680)]: {
      padding: "4rem 2rem",
    },
  },
  title: {
    fontSize: "33px",
    fontWeight: 700,
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    [theme.breakpoints.down(1680)]: {
      fontSize: "24px",
    },
  },
  subtitle: {
    fontSize: "19px",
    lineHeight: "25px",
    [theme.breakpoints.down(1680)]: {
      fontSize: "14px",
    },
  },
  image: {
    [theme.breakpoints.down(1680)]: {
      width: "6rem",
    },
  },
}));

export const Guest = ({ viewer }) => {
  const classes = useStyles();
  const filters = useSelector((state) => state.utils.liveloop.filters);
  const started = useSelector((state) => state.utils.liveloop.started);
  useEffect(() => {
    (async () => {
      if (started) {
        const query = `age=${filters.age[0]}&age=${filters.age[1]}&long=${filters.location.coordinates[0]}&lat=${filters.location.coordinates[1]}&distance=${filters.distance}&gender_identifier=${filters.gender_identifier}`;
        const { data } = await getLiveLoopRequests(query);
      }
    })();
  }, []);
  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <h1 className={classes.title}>Choose a Guest</h1>
      </Grid>
      <Grid item>
        <img src={image.find} className={classes.image} alt="" />
      </Grid>
      <Grid item style={{ textAlign: "center" }}>
        <p className={classes.subtitle}>
          No one is requesting to guest right now. Let people know you'd like to
          host.
        </p>
      </Grid>
    </Grid>
  );
};
