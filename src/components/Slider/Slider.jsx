import React from "react";
import "react-multi-carousel/lib/styles.css";
import { makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "133px",
    width: "133px",
    [theme.breakpoints.down("lg")]: {
      height: "95px",
      width: "95px",
    },
  },
  root: {
    "& .splide__arrow": {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.85,
      fill: "#ffffff",
      fontSize: "1.25rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.75rem",
      },
    },
    "& .splide__arrow--prev": {
      left: "-0.9rem",
      [theme.breakpoints.down("lg")]: {
        left: "-0.7rem",
      },
    },
    "& .splide__arrow--next": {
      right: "-1rem",
      [theme.breakpoints.down("lg")]: {
        right: "-0.6rem",
      },
    },
  },
}));

export const Slider = ({ users }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Splide
        options={{
          perPage: 9,
          perMove: 1,
          gap: "1rem",
          pagination: false,
        }}
      >
        {users.map((user) => (
          <SplideSlide key={user._id}>
            <Link to="/home/online">
              <img
                src={user.profile_image}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                className={classes.image}
                alt=""
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </Grid>
  );
};
