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
    background: "red",
    "&:checked+label": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  container: {
    height: "56px",
    width: "170px",
    boxShadow: theme.shadows[3],
    background: "white",
    borderRadius: "34px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
  },
}));
function ChipRadio({ name, handleShow, id, label, value }) {
  const classes = useStyles();
  return (
    <Grid item>
      <input
        type="radio"
        className={classes.switch}
        id={id}
        // value={selected}
        name={name}
        value={value}
        onChange={handleShow}
      />
      <label htmlFor={label} className={classes.container}>
        {label}
      </label>
    </Grid>
  );
}

export default ChipRadio;
