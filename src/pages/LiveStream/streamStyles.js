import { makeStyles } from "@material-ui/core";
import image from "../../assets";

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingInline: "4rem",
    paddingTop: "3rem",
    [theme.breakpoints.down(1680)]: {
      paddingTop: "1rem",
      paddingInline: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      paddingInline: "1rem",
      paddingTop: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      paddingInline: "0rem",
      paddingTop: "1rem",
    },
  },
  username: {
    fontSize: "2.1875rem",
    fontWeight: 700,
    [theme.breakpoints.down(1680)]: {
      fontSize: "1.25rem",
    },
  },
  statsContainer: {
    width: "124px",
    height: "51px",
    border: `1px solid ${theme.palette.primary.main} `,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "25px",
    marginRight: "2rem",
    marginTop: "1.25rem",
    position: "relative",
    [theme.breakpoints.down(1680)]: {
      width: "70px",
      height: "25px",
      marginTop: "1rem",
      marginRight: "1rem",
    },
  },
  count: {
    fontSize: "1.56rem",
    marginLeft: "1rem",
    color: theme.palette.primary.main,
    [theme.breakpoints.down(1680)]: {
      fontSize: "1rem",
    },
  },
  gemIcon: {
    [theme.breakpoints.down(1680)]: {
      width: "1rem",
    },
  },
  eyeIcon: {
    [theme.breakpoints.down(1680)]: {
      width: "1.35rem",
    },
    [theme.breakpoints.down("md")]: {
      width: "1.1rem",
    },
  },
  left: {
    width: "66.5%",
    [theme.breakpoints.down(1680)]: {
      width: "57%",
    },
  },
  streamContainer: {
    width: "100%",
    borderRadius: "28px",
    overflow: "hidden",
    marginTop: "0.5rem",
    position: "relative",
    height: "770px",
    backgroundImage: `url('${image.streamer}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down(1680)]: {
      height: "500px",
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  description: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "115px",
    backgroundColor: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(1680)]: {
      height: "80px",
    },
    [theme.breakpoints.down("md")]: {
      height: "70px",
    },
  },
  textField: {
    width: "60%",
    marginTop: "1.5rem",
    [theme.breakpoints.down(1680)]: {
      width: "60%",
      marginTop: "1.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      marginTop: "1.8rem",
    },
  },
  input: {
    [theme.breakpoints.down(1680)]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  startButton: {
    width: "157px",
    height: "48px",
    borderRadius: "34px",
    textTransform: "none",
    fontSize: "22px",
    marginLeft: "4rem",
    [theme.breakpoints.down(1680)]: {
      width: "90px",
      height: "35px",
      fontSize: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70px",
      height: "25px",
      fontSize: "12px",
    },
  },
  warningContainer: {
    height: "100px",
    boxShadow: theme.shadows[3],
    borderRadius: "9px",
    padding: "0 1rem",
    marginTop: "1rem",
    maxWidth: "100%",
    [theme.breakpoints.down(1680)]: {
      height: "70px",
      // marginTop: "0.5rem"
    },
    [theme.breakpoints.down("md")]: {
      height: "50px",
    },
  },
  warning: {
    fontSize: "1.06rem",
    marginLeft: "1rem",
    marginTop: "0.3rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.6rem",
    },
  },
  block: {
    color: "#FF6464",
    fontSize: "2rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.25rem",
    },
  },
  utilityContainer: {
    width: "32.5%",
    [theme.breakpoints.down(1680)]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
    },
  },
  guestBox: {
    width: "320px",
    height: "189px",
    position: "absolute",
    top: "30px",
    right: "30px",
    borderRadius: "12px",
    overflow: "hidden",
    [theme.breakpoints.down(1680)]: {
      top: "20px",
      right: "20px",
      width: "250px",
      height: "147px",
    },
    [theme.breakpoints.down("md")]: {
      width: "180px",
      height: "106px",
      top: "10px",
      right: "10px",
    },
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "40px",
    height: "40px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  closeIcon: {
    color: "#fff",
    fontSize: "2rem",
  },
  warningButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  warningIcon: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
    "&:hover": {
      color: theme.palette.common.darkPink,
    },
  },
  // dialog
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "10px",
    },
  },
  dialogContent: {
    padding: "6rem 4rem",
    backgroundColor: theme.palette.common.lightPink,
    [theme.breakpoints.down(1680)]: {
      padding: "4rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "2.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
    },
  },
  dialogTitle: {
    color: "#000",
    margin: 0,
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "1rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "24px",
      marginBottom: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      marginBottom: "0.25rem",
    },
  },
  dialogSubtitle: {
    color: "#000",
    margin: 0,
    fontSize: "22px",
    fontWeight: 300,
    width: "30ch",
    [theme.breakpoints.down(1680)]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  reportButton: {
    height: "63px",
    width: "265px",
    borderRadius: "38px",
    fontSize: "22px",
    textTransform: "none",
    marginTop: "4rem",
    [theme.breakpoints.down(1680)]: {
      width: "200px",
      height: "47.5px",
      fontSize: "18px",
      marginTop: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "150px",
      height: "33.29px",
      fontSize: "15px",
    },
  },
  cancelButton: {
    height: "63px",
    width: "265px",
    borderRadius: "38px",
    fontSize: "22px",
    textTransform: "none",
    border: `2px solid ${theme.palette.primary.main}`,
    marginTop: "1rem",
    [theme.breakpoints.down(1680)]: {
      width: "200px",
      height: "47.5px",
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "150px",
      height: "33.29px",
      fontSize: "15px",
    },
  },
  // waiting overlay
  waitingOverly: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.92)",
    display: "flex",
  },
  overlyTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "28px",
    fontWeight: 500,
  },
  overlySubtitle: {
    margin: 0,
    color: "#fff",
    fontSize: "17px",
    fontWeight: 100,
  },
  waitTitle: {
    margin: 0,
    color: "#000",
    fontSize: "24px",
    fontWeight: 500,
    [theme.breakpoints.down(1680)]: {
      fontSize: "20px",
    },
  },
  waitSubtitle: {
    margin: 0,
    color: "#000",
    fontSize: "17px",
    fontWeight: 100,
    flexGrow: 1,
    textAlign: "left",
    marginLeft: "15px",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
    },
  },
  exitButton: {
    width: "90px",
    height: "36px",
    borderRadius: "18px",
    fontSize: "18px",
    border: `2px solid ${theme.palette.primary.main}`,
    textTransform: "none",
  },
  exitSecondaryButton: {
    width: "158px",
    height: "36px",
    textTransform: "none",
    fontSize: "17px",
    borderRadius: "18px",
    border: `2px solid ${theme.palette.primary.main}`,
  },
  blueWindow: {
    position: "absolute",
    right: "30px",
    bottom: "30px",
    width: "320px",
    height: "189px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "12px",
    [theme.breakpoints.down(1680)]: {
      width: "280px",
      height: "165px",
      right: "20px",
      bottom: "20px",
    },
  },
  blueWindowText: {
    color: "#fff",
    margin: 0,
    fontSize: "21px",
    width: "16ch",
    textAlign: "center",
    cursor: "pointer",
    [theme.breakpoints.down(1680)]: {
      fontSize: "18px",
    },
  },
  liveVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  endStreamButton: {
    zIndex: 1,
    position: "absolute",
    right: "20px",
    top: "20px",
  },
  endStreamIcon: {
    fontSize: "40px",
  },
  endStreamDialog: {
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.common.lightPink,
      borderRadius: "10px",
    },
  },
  endStreamContainer: {
    height: "586px",
    width: "540px",
    paddingBlock: "134px 89px",
    [theme.breakpoints.down("lg")]: {
      height: "340px",
      width: "350px",
      paddingBlock: "60px 40px",
    },
  },
  endTitle: {
    margin: "0",
    color: "#000000",
    fontSize: "32px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
    },
  },
  endSubtitle: {
    margin: "0",
    color: "#000000",
    fontSize: "22px",
    marginTop: "18px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginTop: "8px",
    },
  },
  endStreamButtons: {
    margin: "0",
    width: "265px",
    height: "63px",
    fontSize: "22px",
    fontWeight: "500",
    textTransform: "none",
    borderRadius: "38px",
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      border: `2px solid ${theme.palette.primary.dark}`,
    },
    [theme.breakpoints.down("lg")]: {
      width: "220px",
      height: "50px",
      fontSize: "16px",
    },
  },
}));
