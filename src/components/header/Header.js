import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  IconButton,
  Grid,
} from "@material-ui/core";
import image from "../../assets/index";
import { CustomButton } from "../CustomButton/CustomButton";
import { useStyles } from "./headerStyles";
import { MoreVert } from "@material-ui/icons";
import { useTransition, animated } from "react-spring";
import { Link } from "react-router-dom";

export const Header = ({
  transparent,
  headerItems = [
    {
      label: "Register",
      to: "/signin",
    },
    {
      label: "Help",
      to: "/helpcenter",
    },
  ],
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const transition = useTransition(openDrawer, {
    from: { opacity: 0, x: "-100", y: "-100" },
    enter: { opacity: 1, x: "0", y: "0" },
    leave: { opacity: 0, x: "200" },
    config: { duration: 400 },
  });

  const TabsContainer = () => {
    return (
      <>
        {mdScreen ? undefined : (
          <>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.navLinks}
            >
              {headerItems.map((item, index) => (
                <Tab
                  component={Link}
                  to={item.to}
                  label={item.label}
                  key={index}
                  disableRipple
                  className={transparent ? classes.tabLight : classes.tab}
                />
              ))}
            </Tabs>
            <CustomButton
              component={Link}
              to="/"
              variant="btnOutlineBlue"
              styleProps={{
                marginLeft: "10px",
                fontSize: `${lgScreen ? "1rem" : "25px"}`,
                width: `${lgScreen ? "150px" : "219px"}`,
                paddingInline: "0",
              }}
            >
              <Link to="/getapp" style={{ textDecoration: "none" }}>
                Get Intro App
              </Link>
            </CustomButton>
          </>
        )}
      </>
    );
  };
  // eslint-disable-next-line
  const DrawerContainer = () => {
    return (
      <>
        {transition((styles, item) =>
          item ? (
            <animated.div style={styles}>
              <Grid
                container
                className={classes.drawer}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    orientation="vertical"
                    className={classes.tabsContainer}
                    classes={{ indicator: classes.indicator }}
                  >
                    {headerItems.map((item, index) => {
                      return (
                        <Tab
                          component={Link}
                          to={item.to}
                          key={index}
                          label={item.label}
                          className={classes.tabLight}
                          onClick={() => setOpenDrawer(!openDrawer)}
                        />
                      );
                    })}
                  </Tabs>
                  <CustomButton
                    component={Link}
                    to="/getapp"
                    variant="btnOutlineBlue"
                    styleProps={{
                      fontSize: `${lgScreen ? "1rem" : "21px"}`,
                      width: `${lgScreen ? "150px" : "219px"}`,
                    }}
                  >
                    Get the App
                  </CustomButton>
                </Grid>
              </Grid>
            </animated.div>
          ) : (
            ""
          )
        )}

        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
          className={classes.drawerIconContainer}
        >
          <MoreVert
            className={
              transparent ? classes.drawerIconDark : classes.drawerIcon
            }
          />
        </IconButton>
      </>
    );
  };

  return (
    <>
      <AppBar className={transparent ? classes.navLight : classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Button className={classes.logo} disableRipple>
            <img
              src={image.logo}
              className={classes.logoImage}
              alt="company-logo"
            />
          </Button>
          <TabsContainer />
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
};
