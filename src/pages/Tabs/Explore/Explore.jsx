import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../TabsContainer/tabStyles";
import { StorySlider } from "../../../components/StorySlider/StroySlider";
import { Filter } from "../../../components/Filter/Filter";
import { Post } from "../../../components/Post/Post";
export const Explore = ({ videos, addToRefs }) => {
  const classes = useStyles();
  // const items = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Grid container className={classes.exploreContainer} direction="column">
        <Grid
          item
          style={{ width: "100%" }}
          className={classes.sliderContainer}
          //   ref={ref}
        >
          <StorySlider />
        </Grid>
        <Grid item style={{ marginTop: "3rem", width: "100%" }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={4}
              >
                {videos.map((item) => (
                  <Grid key={item._id}>
                    <Post
                      profile_img={item.profile_image}
                      video_url={`http://104.154.205.129:8080/${item.video_url}`}
                      title={item.video_title}
                      username={item.user_name}
                      user_id={item.user_id}
                      user_status={item.user_status}
                      video_id={item._id}
                      ref={addToRefs}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Filter />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
