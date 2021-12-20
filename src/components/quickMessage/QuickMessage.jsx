import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  switch: {
    "-webkit-apperance": "none",
    appearance: "none",
    height: "56px",
    width: "56px",
    position: "absolute",
    zIndex: -1,
    "&:checked+label": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  container: {
    padding: "14px 12px",
    width: "100%",
    background: theme.palette.common.lightPink,
    borderRadius: "20px 20px 20px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "18px",
    marginBlock: "10px",
  },
}));

const QuickMessage = ({ name, handleShow, id, label, value }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <input
        type="radio"
        className={classes.switch}
        id={id}
        name={name}
        value={value}
        onChange={handleShow}
      />
      <label htmlFor={id} className={classes.container}>
        {label}
      </label>
    </Grid>
  );
};

export default QuickMessage;