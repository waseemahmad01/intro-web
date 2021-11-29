import React from "react";
import { useStyles } from "./inputStyle";
import { TextField, Grid, Typography } from "@material-ui/core";

export const Input = ({ label, onFocus, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item container direction="column" className={classes.container}>
        <Grid item style={{ width: "100%" }}>
          <Typography
            style={{ width: "100%" }}
            className={classes.inputLabel}
            variant="h3"
          >
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            {...rest}
            // label={label}
            variant="outlined"
            margin="none"
            className={classes.inputRoot}
            InputProps={{
              className: classes.input,
              onFocus: onFocus,
            }}
            fullWidth
            FormHelperTextProps={{ className: classes.error }}
          />
        </Grid>
      </Grid>
    </>
  );
};
