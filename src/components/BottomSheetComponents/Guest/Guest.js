import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Avatar } from "@material-ui/core";
import image from "../../../assets/index";
import { getGuestRequests } from "../../../http/index";
import { useSelector } from "react-redux";
import { makeGuestRequest } from "../../../http/index";
import { subscribeTokenToTopic } from "../../../firebaseInit";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    padding: "2rem 3rem",
    [theme.breakpoints.down(1680)]: {
      padding: "1rem 2rem",
    },
  },
  title: {
    fontSize: "33px",
    fontWeight: 700,
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    marginBottom: "10px",
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
  containerInner: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "calc(100% - 80px)",
    overflowY: "auto",
  },
  image: {
    [theme.breakpoints.down(1680)]: {
      width: "6rem",
    },
  },
  profile: {
    height: "80px",
    width: "80px",
    [theme.breakpoints.down(1680)]: {
      height: "50px",
      width: "50px",
    },
  },
  username: {
    fontSize: "30px",
    marginLeft: "1rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "20px",
      marginLeft: "0.5rem",
    },
  },
  user: {
    marginBlock: "10px",
  },
}));

export const Guest = ({ roleChange, streamId }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user.data);
  const [requestUsers, setRequestUsers] = useState([]);

  const handleRoleUpdate = async (username, userId, image) => {
    const apiData = {
      user: {
        username,
        userId,
        image,
      },
      id: streamId,
      type: "join",
    };
    const { data } = await makeGuestRequest(apiData);
    console.log(data);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getGuestRequests(user.username);
      console.log(data);
      setRequestUsers(data.data.requsetUsers);
    })();
  }, []);
  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      justifyContent={requestUsers.length === 0 ? "space-between" : undefined}
      style={{ paddingBlock: requestUsers.length === 0 ? "6rem" : "2rem" }}
      alignItems="center"
    >
      <Grid item>
        <h1 className={classes.title}>Choose a Guest</h1>
      </Grid>
      {requestUsers.length === 0 && (
        <>
          <Grid item>
            <img src={image.find} className={classes.image} alt="" />
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <p className={classes.subtitle}>
              No one is requesting to guest right now. Let people know you'd
              like to host.
            </p>
          </Grid>
        </>
      )}

      {requestUsers.length !== 0 ? (
        <div className={classes.containerInner}>
          {requestUsers.map((item, index) => (
            <Grid
              key={index}
              item
              container
              alignItems="center"
              className={classes.user}
              user_id={item.user_id}
              // onClick={() => roleChange(item.channelId)}
              onClick={() =>
                handleRoleUpdate(item.username, item.userId, item.image)
              }
            >
              <Avatar src={item.image} className={classes.profile} />
              <span className={classes.username}>{item.username}</span>
            </Grid>
          ))}
        </div>
      ) : (
        ""
      )}
    </Grid>
  );
};
