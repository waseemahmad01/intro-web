import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { MeetPost } from "../../../components/meetme/MeetPost";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingInline: "50px",
    paddingTop: "2rem",
    paddingBottom: "0rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 2rem",
    },
  },
  title: {
    color: "#000",
    margin: 0,
    fontSize: "35px",
    fontWeight: 100,
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
    },
  },
  postContainer: {
    marginTop: "0rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0.5rem",
    },
  },
}));
export const MeetMe = ({ allVideos, setPage, page, totalPage }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item container>
        <Typography className={classes.title}>Meet Me</Typography>
      </Grid>
      <Grid item container className={classes.postContainer}>
        <MeetPost
          allVideos={allVideos}
          setPage={setPage}
          page={page}
          totalPage={totalPage}
        />
      </Grid>
    </Grid>
  );
};
