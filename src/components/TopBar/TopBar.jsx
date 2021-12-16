import React, { useState } from "react";
import {
  Badge,
  InputBase,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  Menu,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction as Action,
  ListItemText,
} from "@material-ui/core";
import image from "../../assets/index";
import { useStyles } from "./topBarStyle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const TopBar = ({ live }) => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const userState = useSelector((state) => state.auth.user.data);
  const handleMenu = (event) => {
    setAnchorEl(event.target);
    setOpenMenu(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  return (
    <Grid
      container
      justifyContent="center"
      // direction="column"
      className={classes.nav}
    >
      <Grid item xs={12}>
        <Grid
          container
          className={classes.nav}
          justifyContent="space-between"
          alignItems="center"
          style={{ position: "relative" }}
        >
          {live ? (
            <Grid item md={1}>
              <img src={image.logo} className={classes.logo} alt="" />
            </Grid>
          ) : (
            <div />
          )}
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              marginInline: "auto",
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={classes.searchBar}
              style={{
                marginRight: live ? undefined : lgScreen ? "15rem" : "20rem",
              }}
            >
              <InputBase
                inputProps={{ className: classes.input }}
                placeholder="Search"
                className={classes.searchInput}
              />
              <IconButton className={classes.iconContainer}>
                <img src={image.search} className={classes.searchIcon} alt="" />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item xs={3} md={live ? 4 : 4} style={{ zIndex: 1 }}>
            <Grid item>
              <Grid
                container
                className={classes.rightContainer}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  {live ? undefined : (
                    <Link to="/live" className={classes.live}>
                      LIVE
                    </Link>
                  )}
                </Grid>

                <Grid item>
                  {live ? undefined : (
                    <>
                      <Badge
                        className={classes.badge}
                        style={{ marginRight: "15px" }}
                        color="primary"
                        badgeContent={4}
                        onClick={handleMenu}
                      >
                        <img
                          src={image.bell}
                          className={classes.icons}
                          alt=""
                        />
                      </Badge>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={openMenu}
                        onClose={handleClose}
                        className={classes.menuContainer}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <List className={classes.list}>
                          <ListItem
                            className={classes.listItem}
                            dense
                            disableGutters
                            onClick={handleClose}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={image.img}
                                className={classes.menuAvatar}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              classes={{ root: classes.listItemsText }}
                              // className={classes.listItemsText}
                              primary="Maria liked your reel"
                            />
                            <Action className={classes.action}>
                              <span>2m</span>
                            </Action>
                          </ListItem>
                          <ListItem
                            className={classes.listItem}
                            dense
                            disableGutters
                            onClick={handleClose}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={image.img}
                                className={classes.menuAvatar}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              classes={{ root: classes.listItemsText }}
                              // className={classes.listItemsText}
                              primary="Maria liked your reel"
                            />
                            <Action className={classes.action}>
                              <span>2m</span>
                            </Action>
                          </ListItem>
                        </List>
                      </Menu>
                    </>
                  )}

                  <Badge
                    component={Link}
                    to="/home/inbox"
                    style={{ marginRight: "15px" }}
                    color="primary"
                  >
                    <img src={image.mail} className={classes.icons} alt="" />
                  </Badge>
                  <Badge color="primary">
                    <img src={image.setting} className={classes.icons} alt="" />
                  </Badge>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <span className={classes.avatarTitle}>
                        {userState.username}
                      </span>
                    </Grid>
                    <Grid item>
                      <Avatar
                        className={classes.avatar}
                        src={userState.profile_image}
                        alt="jhon doe"
                        component={Link}
                        to="/home/profile"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
