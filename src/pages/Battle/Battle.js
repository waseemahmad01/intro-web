import React, { useState, forwardRef } from "react";
import { useStyles } from "./battleStyles";
import {
  Grid,
  Typography,
  IconButton,
  Dialog,
  Button,
} from "@material-ui/core";
import image from "../../assets/index";
import { Block, Close } from "@material-ui/icons";
import { StreamerBox } from "../../components/ViewBox/StreamerBox";

export const Battle = forwardRef(
  ({ hostFirst, battle, goBackToMyStream, quitStream }, ref) => {
    const classes = useStyles();
    console.log("method", goBackToMyStream);
    const [openDialog, setOpenDialog] = useState(false);
    return (
      <Grid
        container
        className={classes.mainContainer}
        justifyContent="space-between"
      >
        <Grid item container direction="column" className={classes.left}>
          <Grid item container>
            <Grid item container direction="column" xs={6}>
              <Grid item>
                <Typography className={classes.username} variant="h4">
                  {battle.current.host}
                </Typography>
              </Grid>
              <Grid item container>
                <Grid item container>
                  <Grid item>
                    <div className={classes.statsContainer}>
                      <img
                        src={image.gem}
                        className={classes.gemIcon}
                        alt="eye-icon"
                      />
                      <span className={classes.count}>3.4k</span>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className={classes.statsContainer}>
                      <img
                        src={image.eyeBlue}
                        className={classes.eyeIcon}
                        alt="eye-icon"
                      />
                      <span className={classes.count}>558</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={6}>
              <Grid item>
                <Typography className={classes.username} variant="h4">
                  {battle.current.client}
                </Typography>
              </Grid>
              <Grid item container>
                <Grid item container>
                  <Grid item>
                    <div className={classes.statsContainer}>
                      <img
                        src={image.gem}
                        className={classes.gemIcon}
                        alt="eye-icon"
                      />
                      <span className={classes.count}>3.4k</span>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className={classes.statsContainer}>
                      <img
                        src={image.eyeBlue}
                        className={classes.eyeIcon}
                        alt="eye-icon"
                      />
                      <span className={classes.count}>558</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container className={classes.battleContainer}>
              <Grid item className={classes.battleLeft} xs={6}>
                <div className={classes.video1} ref={ref.ref1}></div>
                <img src={image.left} className={classes.battleImg} alt="" />
                <h1 className={classes.outlineTextLeft}>5</h1>
              </Grid>
              <Grid item className={classes.battleRight} xs={6}>
                <div className={classes.video1} ref={ref.ref2}></div>
                <img src={image.right} className={classes.battleImg} alt="" />
                <h1 className={classes.outlineTextRight}>7</h1>
              </Grid>
              <IconButton
                onClick={() => setOpenDialog(true)}
                className={classes.closeButton}
              >
                <Close className={classes.closeIcon} />
              </IconButton>
              <IconButton className={classes.vsButton}>
                <i className={classes.vsIcon}>vs</i>
              </IconButton>
            </Grid>
          </Grid>
          <Dialog open={openDialog}>
            <Grid
              container
              className={classes.dialogContainer}
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <Typography className={classes.dialogTitle}>
                  Are you sure?
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.dialogSubtitle}>
                  You can skip this battle and keep streaming or end your stream
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.skipbtn}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenDialog(false);
                    goBackToMyStream();
                  }}
                >
                  Skip Battle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                    quitStream();
                  }}
                  className={classes.endbtn}
                  variant="contained"
                >
                  End Stream
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.cancelbtn}
                  color="primary"
                  variant="outlined"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Dialog>
          <Grid
            item
            container
            alignItems="center"
            className={classes.warningContainer}
          >
            <Block className={classes.block} />
            <Typography className={classes.warning} variant="h4">
              Don’t stream nudity or obscene/violent behavior. ever stream while
              driving or under unsafe conditions.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems={"flex-end"}
          className={classes.utilityContainer}
        >
          <StreamerBox tag={battle.current.tag} />
        </Grid>
      </Grid>
    );
  }
);
