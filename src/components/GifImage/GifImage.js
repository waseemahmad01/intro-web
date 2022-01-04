import React, { useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
const GifImage = ({ src, fromMe }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const handleOnload = () => {
    setLoading(false);
  };
  return (
    <>
      <div className={classes.container}>
        {loading && (
          <CircularProgress color={fromMe ? "primary" : "secondary"} />
        )}
        <img
          src={src}
          className={loading ? classes.hidden : classes.show}
          onLoad={handleOnload}
          alt=""
        />
      </div>
    </>
  );
};

export default GifImage;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  hidden: {
    visibility: "hidden",
    width: "1px",
  },
  show: {
    visibility: "initial",
    width: "120px",
    [theme.breakpoints.down("lg")]: {
      width: "80px",
    },
  },
}));
