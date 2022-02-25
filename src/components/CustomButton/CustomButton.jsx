import React from "react";

import { Button } from "@material-ui/core";

import { useStyles } from "./customButtonStyle";

export const CustomButton = ({
  children,
  variant,
  styleProps,
  onClick,
  className = "",
}) => {
  const classes = useStyles();
  return (
    <Button
      disableRipple
      size="large"
      style={styleProps}
      variant="contained"
      className={classes[variant]}
      //   className={`${classes[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
