import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core";
import { Splide } from "@splidejs/react-splide";
import Story from "../stories/Story";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .splide__arrow": {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.85,
      fill: "#ffffff",
      fontSize: "1.25rem",
      height: "42px",
      width: "42px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.75rem",
        height: "32px",
        width: "32px",
      },
    },
    "& .splide__arrow--prev": {
      left: "-1rem",
      [theme.breakpoints.down("lg")]: {
        left: "-0.7rem",
      },
    },
    "& .splide__arrow--next": {
      right: "-0.6rem",
      [theme.breakpoints.down("lg")]: {
        right: "-0.2rem",
      },
    },
  },
}));

export const StorySlider = () => {
  const classes = useStyles();
  const stories = useSelector((state) => state.stories.stories);
  const [allStories, setAllStories] = useState(stories || []);
  return (
    <>
      <div className={classes.root}>
        <Splide
          options={{
            perPage: 8,
            perMove: 1,
            pagination: false,
          }}
        >
          {allStories.map((story) => (
            <Story
              key={story.user_id}
              image={story.avatar}
              username={story.username}
              stories={story.stories}
            />
          ))}
        </Splide>
      </div>
    </>
  );
};
