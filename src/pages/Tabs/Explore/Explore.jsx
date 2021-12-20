import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../TabsContainer/tabStyles";
import { StorySlider } from "../../../components/StorySlider/StroySlider";
import { Filter } from "../../../components/Filter/Filter";
import { Post } from "../../../components/Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getStories } from "../../../http/index";
import { setStories } from "../../../store/stories";
export const Explore = ({
  videos,
  addToRefs,
  lastElementRef,
  setGender,
  setIntent,
  setReligion,
  setEthnicity,
  setBodyType,
  setEducation,
  setKids,
  setDrink,
  setSmoke,
  setWeed,
  setDrugs,
  setCountry,
  setHeight,
  setAge,
  setFilterUpdated,
  filterUpdated,
  setIsAnyOpen,
  gender,
  intent,
  ethnicity,
  bodyType,
  religion,
  kids,
  education,
  drink,
  smoke,
  weed,
  country,
  drugs,
  height,
  age,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.stories);
  const [allStories, setAllStories] = useState(stories || []);

  useEffect(() => {
    (async () => {
      const { data } = await getStories();
      dispatch(setStories(data.data));
      setAllStories(data.data);
    })();
  }, []);
  return (
    <>
      <Grid container className={classes.exploreContainer} direction="column">
        <Grid
          item
          style={{ width: "100%" }}
          className={classes.sliderContainer}
        >
          {allStories.length !== 0 && (
            <StorySlider setIsAnyOpen={setIsAnyOpen} />
          )}
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
                {videos.map((item, index) => {
                  if (videos.length === index + 1) {
                    return (
                      <Grid key={index} ref={lastElementRef}>
                        <Post
                          profile_img={item.profile_image}
                          video_url={`${process.env.REACT_APP_API_URL}/${item.video_url}`}
                          title={item.video_title}
                          username={item.user_name}
                          user_id={item.user_id}
                          user_status={item.user_status}
                          video_id={item._id}
                          ref={addToRefs}
                          like={item.like}
                          superLike={item.superLike}
                          cover={`${process.env.REACT_APP_API_URL}/${item.cover}
                          `}
                        />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid key={index}>
                        <Post
                          profile_img={item.profile_image}
                          video_url={`${process.env.REACT_APP_API_URL}/${item.video_url}`}
                          title={item.video_title}
                          username={item.user_name}
                          user_id={item.user_id}
                          user_status={item.user_status}
                          video_id={item._id}
                          ref={addToRefs}
                          like={item.like}
                          superLike={item.superLike}
                          cover={`${process.env.REACT_APP_API_URL}/${item.cover}`}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Grid>
            <Grid item>
              <Filter
                setGender={setGender}
                setIntent={setIntent}
                setReligion={setReligion}
                setEthnicity={setEthnicity}
                setBodyType={setBodyType}
                setEducation={setEducation}
                setKids={setKids}
                setDrink={setDrink}
                setSmoke={setSmoke}
                setWeed={setWeed}
                setDrugs={setDrugs}
                setCountry={setCountry}
                setHeight={setHeight}
                setAge={setAge}
                setFilterUpdated={setFilterUpdated}
                filterUpdated={filterUpdated}
                setIsAnyOpen={setIsAnyOpen}
                gender={gender}
                intent={intent}
                ethnicity={ethnicity}
                bodyType={bodyType}
                religion={religion}
                kids={kids}
                education={education}
                drink={drink}
                smoke={smoke}
                weed={weed}
                country={country}
                drugs={drugs}
                height={height}
                age={age}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
