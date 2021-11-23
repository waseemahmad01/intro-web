import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  postAvatar: {
    width: "104px",
    height: "104px",
    marginLeft: "10px",
    [theme.breakpoints.down("lg")]: {
      width: "70px",
      height: "70px",
      marginLeft: "10px",
    },
  },
  postAvatarText: {
    fontSize: "22px",
    marginTop: "8px",
    marginLeft: "5px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginLeft: "0px",
    },
  },
  postContainer: {
    width: "914px",
    height: "911px",
    // backgroundColor: "#fbfbfb",
    padding: "0rem 1rem",
    borderRadius: "54px",
    // boxShadow: theme.shadows[3],
    // marginBottom: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "600px",
      height: "530px",
      padding: "0.5rem 1rem",
      borderRadius: "33px",
    },
  },
  postAvatarContainer: {
    paddingTop: "0rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.5rem",
    },
  },
  postTitle: {
    fontSize: "30px",
    fontFamily: "Helvetica",
    margin: "10px 0px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
      margin: "8px 0",
    },
  },
  postAsset: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  postAssetContainer: {
    padding: 0,
    paddingLeft: "0.5rem",
    marginBottom: 0,
  },
  imageContianer: {
    position: "relative",
    height: "775px",
    width: "519px",
    overflow: "hidden",
    borderRadius: "20px",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "447.97px",
    },
  },
  iconContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
    borderRadius: "16px",
    opacity: 1,
    transition: "0.6s ease",
  },
  icons: {
    height: "100%",
    padding: "0.25rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0.25rem",
    },
  },
  likeIcon: {
    color: "#fbfbfb",
    fontSize: "2.8rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.8rem",
    },
  },
  muteIcon: {
    [theme.breakpoints.down("lg")]: {
      maxWidth: "28px",
    },
  },
  // dialog
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
    },
  },
  dialogContainer: {
    padding: "2rem 3.5rem",
    backgroundColor: theme.palette.common.lightPink,
    [theme.breakpoints.down(1680)]: {
      padding: "1rem 2.5rem",
    },
  },
  avatarGroup: {
    marginTop: "2rem",
    [theme.breakpoints.down(1680)]: {
      marginTop: "1rem",
    },
  },
  dialogImage: {
    height: "107px",
    width: "107px",
    border: `2px solid ${theme.palette.common.lightPink}`,
    [theme.breakpoints.down(1680)]: {
      height: "85px",
      width: "85px",
    },
  },
  gradientText: {
    margin: "0",
    fontSize: "24px",
    fontWeight: 700,
    marginTop: "0.5rem",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    [theme.breakpoints.down(1680)]: {
      fontSize: "20px",
    },
  },
  text: {
    fontSize: "12px",
  },
  dialogAction: {
    marginTop: "2rem",
    marginBottom: "3rem",
    width: "70%",
    marginInline: "auto",
    [theme.breakpoints.down(1680)]: {
      marginTop: "1rem",
      marginBottom: "1.5rem",
    },
  },
  outlinedButton: {
    width: "274px",
    height: "52px",
    borderRadius: "38px",
    fontSize: "17px",
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: 700,
    [theme.breakpoints.down(1680)]: {
      width: "240px",
      height: "45.5px",
    },
  },
  // quick message
  quickMessageDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
    },
  },
  quickMessageDialogContent: {
    padding: "1.5rem",
    [theme.breakpoints.down(1680)]: {
      padding: "0.75rem",
    },
  },
  quickMessageTitle: {
    margin: "0",
    color: "#000",
    fontSize: "27px",
    fontWeight: 500,
    [theme.breakpoints.down(1680)]: {
      fontSize: "20px",
    },
  },
  chip: {
    backgroundColor: theme.palette.common.lightPink,
    borderRadius: "18px 18px 18px 0px",
    height: "53px",
    margin: "0.5rem 0",
    width: "317px",
    fontSize: "18px",
    [theme.breakpoints.down(1680)]: {
      width: "250px",
      height: "42px",
      fontSize: "13px",
    },
  },
  quickMessageButton: {
    width: "275px",
    height: "46px",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: "29px",
    marginTop: "5rem",
    [theme.breakpoints.down(1680)]: {
      width: "220px",
      height: "36px",
      fontSize: "13px",
    },
  },

  // date dialog
  dateDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "39px",
    },
  },
  dateDialogContainer: {
    padding: "2rem",
    backgroundColor: theme.palette.common.lightPink,
  },
  dateDialogTitle: {
    margin: 0,
    color: theme.palette.primary.main,
    fontSize: "22px",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  watchblue: {
    marginLeft: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "1.25rem",
      marginLeft: "1.5rem",
    },
  },
  closeButton: {
    height: "30px",
    width: "30px",
    [theme.breakpoints.down("lg")]: {
      height: "20px",
      width: "20px",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  closeIcon: {
    fontSize: "2.5rem",
    color: "#ACACAC",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2rem",
    },
  },
  availableText: {
    margin: 0,
    color: "#000",
    fontSize: "22px",
    marginTop: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginTop: "1.5rem",
    },
  },
  sliderRoot: {
    color: theme.palette.primary.main,
    height: "2px",
    width: "80%",
    marginInline: "auto",
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0rem",
      width: "100%",
    },
    "& .MuiSlider-thumb": {
      height: "17px",
      width: "17px",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[3],
      marginTop: "-8.5px",
      marginLeft: "-8.5px",
    },
    "& 	.MuiSlider-valueLabel": {
      // left: "calc(-50% + 12px)",
      left: "-50%",
      top: "-18px",
      "& *": {
        background: "transparent",
        color: "#000",
        fontSize: "13px",
      },
    },
  },
  continueButton: {
    width: "369px",
    height: "57px",
    borderRadius: "29px",
    textTransform: "none",
    fontSize: "16px",
    // marginTop: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "45px",
      fontSize: "13px",
    },
  },
  dialogIconContainer: {
    margin: "3rem 0",
  },
  datePicker: {
    marginTop: "3rem",
    minWidth: "100%",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1.5rem",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiInput-root": {
      color: theme.palette.primary.main,
      width: "100%",
      "& .MuiInputBase-input": {
        color: "#000",
      },
    },
  },
  date: {
    width: "300px",
    color: "#000000",
    fontSize: "20px",
  },
  dateRoot: {
    marginTop: "2rem",
    "& .MuiInput-underline::before": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  innerContainer: {
    padding: "0rem 3rem",
  },
  iconImage: {
    [theme.breakpoints.down("lg")]: {
      width: "3.4rem",
    },
  },
  iconImage1: {
    [theme.breakpoints.down("lg")]: {
      width: "2.5rem",
    },
  },
  superIcons: {
    position: "absolute",
    left: "0%",
    bottom: "42px",
    width: "100%",
    paddingInline: "3rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.71rem",
      bottom: "20px",
    },
  },
  superIcon: {
    height: "60px",
    width: "60px",
    marginInline: "1.5rem",
    [theme.breakpoints.down("lg")]: {
      height: "48px",
      width: "48px",
      marginInline: "0.8rem",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& img": {
      [theme.breakpoints.down("lg")]: {
        width: "3.5rem",
      },
    },
  },
  superDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "47px",
    },
  },
  superDialogContainer: {
    backgroundColor: theme.palette.common.lightPink,
    padding: "1.5rem",
    width: "523px",
    [theme.breakpoints.down("lg")]: {
      width: "350px",
    },
  },
  superDialogTitle: {
    color: "#000",
    margin: "0",
    fontSize: "31px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "23px",
    },
  },
  superDialogSubtitle: {
    color: "#474747",
    margin: "0",
    fontSize: "19px",
    lineHeight: "10px",
    marginBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
      marginBottom: "0.5rem",
    },
  },
  listItem: {
    padding: "0.5rem 0",
    [theme.breakpoints.down("lg")]: {
      padding: "0",
    },
  },
  listItemText: {
    marginLeft: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "0",
    },
    "& .MuiListItemText-primary": {
      color: theme.palette.common.crimson,
      fontSize: "22px",
      textAlign: "left",
      [theme.breakpoints.down("lg")]: {
        fontSize: "15px",
      },
    },
    "& .MuiListItemText-secondary": {
      color: "#000",
      textAlign: "left",
      fontSize: "19px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "13px",
      },
    },
  },
  image: {
    width: "5rem",
    [theme.breakpoints.down("lg")]: {
      width: "3rem",
    },
  },
  button: {
    width: "108px",
    height: "38px",
    borderRadius: "38px",
    fontSize: "17px",
    textTransform: "none",
    [theme.breakpoints.down("lg")]: {
      width: "80px",
      height: "28px",
      fontSize: "13px",
    },
  },
  action: {
    borderRadius: "38px",
    boxShadow: "3px 3px 10px #000000",
  },
}));
