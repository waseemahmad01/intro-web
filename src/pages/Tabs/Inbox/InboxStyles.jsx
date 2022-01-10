import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 1rem",
    paddingBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
      paddingBottom: "0rem",
    },
  },
  title: {
    color: "#000",
    margin: 0,
    fontSize: "35px",
    textAlign: "left",
    marginLeft: "1.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
    },
  },
  chatContainer: {
    marginTop: "0.25rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "2px",
    },
  },
  left: {
    width: "18%",
  },
  middle: {
    width: "46.5%",
  },
  right: {
    width: "35.5%",
  },
  inboxUserInfo: {
    boxSizing: "border-box",
    padding: "1rem",
    backgroundColor: "#fbfbfb",
    boxShadow: theme.shadows[3],
    borderRadius: "25px",
    height: "100%",
  },

  userName: {
    fontSize: "17px",
    fontWeight: 700,
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
  },
  userCity: {
    fontSize: "17px",
    fontWeight: 700,
    marginBottom: 0,
    margin: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
  },
  userAge: {
    fontSize: "18px",
    marginBottom: "0",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  avatar: {
    height: "106px",
    width: "106px",
    marginInline: "auto",
    marginBottom: "10px",
    [theme.breakpoints.down("lg")]: {
      height: "80px",
      width: "80px",
    },
  },
  userInfoContainer: {
    padding: "0 2rem",
    paddingTop: "2rem",
    width: "100%",
    marginBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0 0.5rem",
      paddingTop: "1.5rem",
    },
  },
  viewProfileButton: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main,
    width: "136px",
    height: "30px",
    marginInline: "auto",
    borderRadius: "15px",
    border: `1px solid ${theme.palette.primary.main}`,
    textTransform: "none",
    marginTop: "5px",
    marginBottom: "28px",
    [theme.breakpoints.down("lg")]: {
      width: "110px",
      fontSize: "12px",
      marginBottom: "18px",
    },
  },
  collapseContainer: {
    boxShadow: theme.shadows[3],
    background: "#fbfbfb",
    borderRadius: "14px",
    paddingInline: "12px 18px",
    paddingBlock: "16px",
    marginBottom: "11px",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "10px 5px",
      paddingBlock: "10px",
      marginBottom: "7px",
    },
  },
  collapseButton: {
    width: "20px",
    height: "20px",
    [theme.breakpoints.down("lg")]: {
      height: "10px",
      width: "10px",
    },
  },
  rotate: {
    transform: "rotate(-180deg)",
  },
  collapseInner: {
    paddingTop: "0.8rem",
  },

  childAccordionHeading: {
    color: "#000",
    margin: "auto 0",
    fontSize: "15px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  accordionDetailsLink: {
    color: "#000",
    fontSize: "14px",
    margin: 0,
    textAlign: "left",
    [theme.breakpoints.down("lg")]: {
      fontSize: "10px",
    },
  },
  childAccordionIcon: {
    transition: "0.4s ease",
    fontSize: "2rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.5rem",
    },
  },

  messageBox: {
    boxSizing: "border-box",
    padding: "1.5rem",
    backgroundColor: "#fbfbfb",
    boxShadow: theme.shadows[3],
    borderRadius: "25px",
    height: "722px",
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
      height: "490px",
    },
  },
  chatTitleAvatar: {
    height: "60px",
    width: "60px",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "40px",
    },
  },
  chatTitle: {
    color: "#000",
    fontSize: "30px",
    fontWeight: 500,
    marginLeft: "20px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginLeft: "10px",
    },
  },
  callButton: {
    [theme.breakpoints.down("lg")]: {
      height: "30px",
      width: "30px",
      marginRight: "5px",
    },
  },
  callIcon: {
    [theme.breakpoints.down("lg")]: {
      width: "1.7rem",
    },
  },
  watchIcon: {
    [theme.breakpoints.down("lg")]: {
      width: "1.4rem",
    },
  },
  chatDate: {
    textAlign: "center",
    color: "#000",
    marginTop: "1rem",
    marginBottom: "2rem",
    fontSize: "15px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "9px",
      margin: "0",
    },
  },
  incomingContainer: {
    padding: "0 1rem",
    maxWidth: "70%",
  },
  messageContainer: {
    marginBlock: "10px",
  },
  incomingMessage: {
    margin: "0",
    backgroundColor: "rgba(254, 133, 140, 0.10)",
    borderRadius: "18px",
    boxSizing: "border-box",
    padding: "18px 2rem",
    color: "#000",
    textAlign: "left",
    [theme.breakpoints.down("lg")]: {
      padding: "9px 1rem",
      fontSize: "9px",
    },
  },
  outgoingContainer: {
    padding: "0 1rem",
    maxWidth: "70%",
  },
  outgoingMessage: {
    margin: "0",
    backgroundColor: "rgba(161, 125, 255, 0.13)",
    borderRadius: "18px",
    boxSizing: "border-box",
    padding: "18px 2rem",
    color: "#000",
    textAlign: "left",
    [theme.breakpoints.down("lg")]: {
      padding: "9px 1rem",
      fontSize: "9px",
    },
  },
  messageInputBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: "1rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0.75rem",
    },
  },

  // chats
  chats: {
    boxSizing: "border-box",
    padding: "1rem 1.5rem",
    backgroundColor: "#fbfbfb",
    boxShadow: theme.shadows[3],
    borderRadius: "33px",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
      borderRadius: "20px",
    },
  },
  chatsTitle: {
    color: "#000",
    fontSize: "30px",
    margin: "1rem 0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  scrollDiv: {
    height: "600px",
    width: "100%",
    overflowY: "auto",
    "&::-webkit-scrollbar-track": {
      background: "transparent",
      maxHeight: "50%",
      height: "50%",
    },
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.common.darkPink,
      borderRadius: "20px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "400px",
    },
  },
  listItemRoot: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: theme.shadows[3],
    height: "107px",
    padding: "0rem 2rem",
    marginBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0rem 1rem",
      height: "55px",
      borderRadius: "10px",
    },
  },
  listImage: {
    height: "60px",
    width: "60px",
    [theme.breakpoints.down("lg")]: {
      height: "35px",
      width: "35px",
    },
  },
  listItemTextRoot: {
    paddingLeft: "1rem",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "0rem",
    },
    "& .MuiListItemText-primary": {
      color: "#000",
      textAlign: "left",
      fontSize: "18px",
      marginBottom: "5px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        marginBottom: "1px",
      },
    },
    "& .MuiListItemText-secondary": {
      color: "rgba(0,0,0,0.7)",
      textAlign: "left",
      fontSize: "15px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "10px",
      },
    },
  },
  lastSeen: {
    fontSize: "15px",
    color: "#000",
    margin: "auto 0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "10px",
    },
  },
  list: {
    "& .MuiListItem-root.Mui-selected": {
      backgroundColor: "rgba(161, 125, 255, 0.13)",
    },
  },
  chatInput: {
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    width: "100%",
    height: "41px",
    borderRadius: "9px",
    [theme.breakpoints.down("lg")]: {
      height: "30px",
    },
  },
  inputBase: {
    margin: "auto 0",
    height: "100%",
    width: "69%",
    fontSize: "18px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  inputProps: {
    "&::placeholder": {
      color: "#000000",
    },
  },
  iconButton: {
    height: "30px",
    width: "30px",
    [theme.breakpoints.down("lg")]: {
      height: "20px",
      width: "20px",
    },
  },
  emojiIcon: {
    color: theme.palette.primary.main,
    marginLeft: "15px",
    fontSize: "2rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.5rem",
      marginLeft: "5px",
    },
  },
  gifIcon: {
    fontSize: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2.35rem",
    },
  },
  sendButton: {
    backgroundColor: theme.palette.primary.main,
    marginRight: "10px",
    height: "42px",
    width: "42px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down("lg")]: {
      height: "30px",
      width: "30px",
      marginRight: "5px",
    },
  },
  sendButtonIcon: {
    width: "1.2rem",
    [theme.breakpoints.down("lg")]: {
      width: "0.9rem",
    },
  },
  iconButtonLeft: {
    height: "45px",
    width: "45px",
    [theme.breakpoints.down("lg")]: {
      width: "25px",
      height: "25px",
    },
  },
  icons: {
    color: "#3E3E3E",
    fontSize: "1.65rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.3rem",
    },
  },
  margin: {
    marginLeft: "4rem",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "2.5rem",
    },
  },
  iconDiv: {
    display: "inline-block",
    height: "90px",
    position: "absolute",
    bottom: "10px",
    maxWidth: "50px",
    borderRadius: "30px",
    overflow: "hidden",
    padding: "10px 5px",
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down("lg")]: {
      width: "35px",
      height: "65px",
    },
  },
  containerDiv: {
    height: "570px",
    overflowY: "auto",
    "&::-webkit-scrollbar-track": {
      background: "transparent",
      maxHeight: "50%",
      height: "50%",
    },
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.common.darkPink,
      borderRadius: "20px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "390px",
      padding: "1rem",
      paddingBottom: "0",
    },
  },
  messageAvatar: {
    height: "46px",
    width: "46px",
    marginRight: "26px",
    [theme.breakpoints.down("lg")]: {
      height: "25px",
      width: "25px",
      marginRight: "13px",
    },
  },
  messageAvatar2: {
    height: "46px",
    width: "46px",
    marginLeft: "26px",
    [theme.breakpoints.down("lg")]: {
      height: "25px",
      width: "25px",
      marginLeft: "13px",
    },
  },
  record: {
    color: "red",
    fontSize: "1rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.7rem",
    },
  },
  rec: {
    fontSize: "18px",
    fontWeight: 700,
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  gifPicker: {
    position: "absolute",
    height: "500px",
    top: "-500px",
    [theme.breakpoints.down("lg")]: {
      height: "300px",
      top: "-300px",
    },
    "& .EXKLM": {
      minWidth: "100%",
      height: "480px",
      [theme.breakpoints.down("lg")]: {
        height: "280px",
      },
    },
    "& .fGONoI": {
      width: "100%",
      height: "100%",
      borderRadius: "12px",
      padding: "10px",
    },
    "& .cwIxDu": {
      display: "block",
      textAlign: "center",
      "& img": {
        width: "50%",
        borderRadius: "18px",
        [theme.breakpoints.down("lg")]: {
          width: "50%",
        },
      },
    },
  },
  emojiContainer: {
    position: "absolute",
    height: "250px",
    top: "-252px",
    verticalAlign: "top",
  },
  recorder: {
    position: "absolute",
    height: "300px",
    top: "-302px",
    width: "100%",
    verticalAlign: "top",
    "& ._1ceqH": {
      minWidth: "100%",
      height: "100%",
      padding: "0",
      "& ._1YOWG": {
        "& ._eV_dK": {
          color: "#000000",
        },
      },
    },
    "& ._2fG9h": {
      height: "100%",
      padding: "0",
    },
    "& ._dt3-T": {
      minHeight: "0",
      height: "100%",
      borderRadius: "10px",
      overflow: "hidden",
    },
    "& ._3bC73": {
      backgroundColor: "#ededed",
    },
    "& ._1lB9c": {
      padding: "5px 10px",
      background: theme.palette.common.darkPink,
    },
    "& ._1Yplu": {
      marginTop: "190px",
      display: "flex",
      justifyContent: "space-between",
    },
    "& ._f2DT8": {
      "& span": {
        color: "#000000",
      },
      "& p": {
        color: "#000000",
      },
    },
  },
  gifs: {
    width: "120px",
    [theme.breakpoints.down("lg")]: {
      width: "80px",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "10px",
      padding: "10px",
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  videoRecorderContainer: {
    borderRadius: "10px",
    overflow: "hidden",
  },
  videoDiv: {
    borderRadius: "10px",
    overflow: "hidden",
    height: "500px",
    width: "500px",
    [theme.breakpoints.down("lg")]: {
      height: "350px",
      width: "350px",
    },
    "& .iSDLnZ": {
      color: theme.palette.primary.main,
    },
    "& .icEoTt": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .vJroN": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .dBzviu": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  uploadButton: {
    height: "65px",
    width: "264px",
    fontSize: "20px",
    fontWeight: "600",
    textTransform: "none",
    borderRadius: "33px",
    marginBlock: "20px 10px",
    marginInline: "auto",
    "&:disabled": {
      backgroundColor: "grey",
    },
    [theme.breakpoints.down("lg")]: {
      height: "50px",
      width: "180px",
      borderRadius: "26px",
      marginBlock: "10px 5px",
    },
  },
}));
