import React from "react";
import "react-multi-carousel/lib/styles.css";
import image from "../../assets/index";
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

export const Slider = () => {
  const classes = useStyles();
  const IMAGE_URL = image.img;
  function createSlides(length = 10) {
    return Array.apply(null, Array(length)).map((value, index) => {
      return {
        src: `${IMAGE_URL}`,
        i: index,
        alt: `Image ${index}`,
      };
    });
  }
  return (
    <Grid className={classes.root}>
      <Splide
        options={{
          type: "loop",
          perPage: 9,
          perMove: 1,
          gap: "1rem",
          pagination: false,
        }}
      >
        {createSlides().map((slide) => (
          <SplideSlide key={slide.i}>
            <Link to="/home/online">
              <img src={slide.src} className={classes.image} alt="" />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </Grid>
  );
};
