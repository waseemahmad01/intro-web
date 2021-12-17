import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Dialog,
  Typography,
  Button,
} from "@material-ui/core";
import Picker from "react-mobile-picker-scroll";
import { height } from "../../data";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBlock: "27px",
    width: "350px",
  },
  dialog: {
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  titleContainer: {
    paddingInline: "24px",
  },
  header: {
    margin: 0,
    color: "#828282",
    fontSize: "18px",
    lineHeight: "45px",
    width: "100%",
    borderBottom: "1px solid #828282",
    textAlign: "left",
    "& span": {
      fontSize: "13px",
      paddingLeft: "5px",
    },
  },
  optionContainer: {
    paddingInline: "60px",
    marginBlock: "24px",
    maxHeight: "65vh",
    overflowY: "auto",
    [theme.breakpoints.down("lg")]: {
      maxHeight: "55vh",
    },
  },
  formControll: {
    width: "100%",
    marginLeft: "0",
    marginBlock: "10px",
    justifyContent: "space-between",
    "& .MuiFormControlLabel-label": {
      marginBottom: "0",
    },
  },
  option: {
    color: "#000000",
    fontSize: "18px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  active: {
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  buttonsContainer: {
    paddingInline: "24px",
    marginTop: "80px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "30px",
    },
  },
  setButton: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
  },
  cancelButton: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    marginRight: "0.75rem",
  },
}));
export const HeightFilter = ({
  open,
  onClose,
  setContext,
  update,
  setUpdate,
  setIsAnyOpen,
}) => {
  const classes = useStyles();
  let obj = {};
  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    let feets = Math.floor(realFeets);
    let inches = Math.round((realFeets - feets) * 12);
    if (inches === 12) {
      feets = feets + 1;
      inches = 0;
    }
    return `${feets}'${inches}"`;
  };
  let heightObj = {};
  height.map((item) => (heightObj[item] = toFeet(item)));
  const newHeight = Object.values(heightObj);
  const [options, setOptions] = useState({ height: newHeight });
  const [value, setValue] = useState({ height: `5'8"` });
  const handleSet = () => {
    let filters = [];
    for (const [key, label] of Object.entries(heightObj)) {
      if (label === value.height) filters.push(key);
    }
    setContext(filters);
    setUpdate(update + 1);
    setIsAnyOpen(false);
    onClose(false);
  };
  const handleChange = (name, value) => {
    setValue({ ...value, [name]: value });
  };
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      className={classes.dialog}
    >
      <Grid item container direction="column" className={classes.container}>
        <Grid item container className={classes.titleContainer}>
          <Typography className={classes.header}>Height</Typography>
        </Grid>
        <Grid item container className={classes.optionContainer}>
          <Picker
            optionGroups={options}
            valueGroups={value}
            onChange={handleChange}
            height={120}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          className={classes.buttonsContainer}
        >
          <Button
            onClick={() => {
              onClose(false);
              setIsAnyOpen(false);
            }}
            className={classes.cancelButton}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            className={classes.setButton}
            onClick={handleSet}
            variant="text"
            color="primary"
          >
            Set
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
