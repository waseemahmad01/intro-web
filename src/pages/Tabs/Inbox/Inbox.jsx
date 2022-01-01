import React, { useState, useRef } from "react";
import { useStyles } from "./InboxStyles";
import {
  Grid,
  InputBase,
  Button,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@material-ui/core";
import img from "../../../assets/img.png";
import {
  ExpandMore,
  Mic,
  EmojiEmotionsSharp as Emoji,
  GifSharp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import image from "../../../assets/index";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import GifPicker from "react-giphy-picker";

export const Inbox = () => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [message, setMessage] = useState("");
  const refOne = useRef();
  const refTwo = useRef();
  const onEmojiClick = (e, emoji) => {
    setMessage(message + emoji.emoji);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleOne = () => {
    setOne(!one);
    setTwo(false);
    refTwo.current.classList.remove(`${classes.rotate}`);
    refOne.current.classList.toggle(`${classes.rotate}`);
  };
  const handleTwo = () => {
    setTwo(!two);
    setOne(false);
    refOne.current.classList.remove(`${classes.rotate}`);
    refTwo.current.classList.toggle(`${classes.rotate}`);
  };
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography className={classes.title}>Inbox</Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="stretch"
        spacing={2}
        className={classes.chatContainer}
      >
        <Grid item className={classes.left}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.inboxUserInfo}
          >
            <Grid item className={classes.userInfoContainer}>
              <Grid item className={classes.avatarContainer}>
                <Avatar className={classes.avatar} src={img} />
              </Grid>
              <Grid item container direction="column" alignItems="flex-start">
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography className={classes.userName}>
                    Kathrine Young
                  </Typography>
                  <Typography className={classes.userAge}>26</Typography>
                </div>
                <Typography className={classes.userCity}>New York</Typography>
                <Typography className={classes.subtitle}>2 mi</Typography>
              </Grid>
              <Grid item container justifyContent="center">
                <Button
                  component={Link}
                  to="/home/profile"
                  className={classes.viewProfileButton}
                  variant="contained"
                >
                  View Profile
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              container
              onClick={handleOne}
              className={classes.collapseContainer}
            >
              <Grid item container justifyContent="space-between">
                <Typography className={classes.childAccordionHeading}>
                  Shared Media
                </Typography>
                <IconButton
                  className={classes.collapseButton}
                  // onClick={handleOne}
                >
                  <ExpandMore
                    ref={refOne}
                    className={classes.childAccordionIcon}
                  />
                </IconButton>
              </Grid>
              <Collapse in={one} timeout="auto" unmountOnExit>
                <Grid
                  container
                  className={classes.collapseInner}
                  direction="column"
                >
                  <Typography className={classes.accordionDetailsLink}>
                    Unmatch
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Block & Report
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Delete Chat
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Help Center
                  </Typography>
                </Grid>
              </Collapse>
            </Grid>
            <Grid
              item
              container
              onClick={handleTwo}
              className={classes.collapseContainer}
            >
              <Grid item container justifyContent="space-between">
                <Typography className={classes.childAccordionHeading}>
                  Support
                </Typography>
                <IconButton
                  className={classes.collapseButton}
                  // onClick={handleTwo}
                >
                  <ExpandMore
                    ref={refTwo}
                    className={classes.childAccordionIcon}
                  />
                </IconButton>
              </Grid>
              <Collapse in={two} timeout="auto" unmountOnExit>
                <Grid
                  container
                  className={classes.collapseInner}
                  direction="column"
                >
                  <Typography className={classes.accordionDetailsLink}>
                    Unmatch
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Block & Report
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Delete Chat
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Help Center
                  </Typography>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.middle}>
          <Grid container direction="column" className={classes.messageBox}>
            <Grid item container>
              <Grid style={{ width: "70%" }} item container alignItems="center">
                <Avatar className={classes.chatTitleAvatar} src={img} />
                <h3 className={classes.chatTitle}>Leslie Someone</h3>
              </Grid>
              <Grid
                style={{ width: "30%" }}
                item
                container
                alignItems="center"
                justifyContent="flex-end"
              >
                <IconButton className={classes.callButton}>
                  <img
                    src={image.blackWatch}
                    className={classes.watchIcon}
                    alt=""
                  />
                </IconButton>
                <IconButton className={classes.callButton}>
                  <img src={image.phone} className={classes.callIcon} alt="" />
                </IconButton>
                <IconButton className={classes.callButton}>
                  <img
                    src={image.videoIcon}
                    className={classes.callIcon}
                    alt=""
                  />
                </IconButton>
              </Grid>
            </Grid>
            <div className={classes.containerDiv}>
              <Grid item>
                <Typography className={classes.chatDate}>
                  Sunday, 27th June at 2:46PM
                </Typography>
              </Grid>
              <Grid item container style={{ marginTop: "1rem" }}>
                <Avatar src={img} />
                <Grid item className={classes.incomingContainer}>
                  <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <Grid item style={{ display: "inline-block" }}>
                      <Typography className={classes.incomingMessage}>
                        Hi, how is it going?
                      </Typography>
                    </Grid>
                    <Grid item style={{ display: "inline-block" }}>
                      <Typography className={classes.incomingMessage}>
                        How long have you been using intro?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                container
                alignItems="flex-start"
                direction="row-reverse"
                style={{ marginTop: "1rem" }}
              >
                <Avatar src={img} />
                <Grid item className={classes.outgoingContainer}>
                  <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="flex-end"
                  >
                    <Grid item style={{ display: "inline-block" }}>
                      <Typography className={classes.outgoingMessage}>
                        Hey, amazing! I've been using intro for a few weeks now!
                        what a feature packed app this has become!
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container style={{ marginTop: "1rem" }}>
                <Avatar src={img} />
                <Grid item className={classes.incomingContainer}>
                  <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <Grid item style={{ display: "inline-block" }}>
                      <Typography className={classes.incomingMessage}>
                        Absolutely!!!
                      </Typography>
                    </Grid>
                    <Grid item style={{ display: "inline-block" }}>
                      <Typography className={classes.incomingMessage}>
                        It's a pleasure to talk to you!
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              className={classes.messageInputBox}
              style={{ paddingInline: "1rem" }}
            >
              <Grid item style={{ width: "90%", position: "relative" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className={classes.chatInput}
                >
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setShowEmoji(!showEmoji);
                        setShowGif(false);
                      }}
                      className={classes.iconButton}
                    >
                      <Emoji className={classes.emojiIcon} />
                    </IconButton>
                  </Grid>
                  <InputBase
                    value={message}
                    onChange={handleMessage}
                    className={classes.inputBase}
                    placeholder="Write a message..."
                    inputProps={{ className: classes.inputProps }}
                    onFocus={() => {
                      setShowEmoji(false);
                      setShowGif(false);
                    }}
                  />

                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setShowGif(!showGif);
                        setShowEmoji(false);
                      }}
                      className={classes.iconButton}
                    >
                      <GifSharp className={classes.gifIcon} />
                    </IconButton>
                    <IconButton
                      style={{
                        marginRight: lgScreen ? "3px" : "10px",
                        marginLeft: lgScreen ? "0px" : "5px",
                      }}
                      className={classes.iconButton}
                    >
                      <Mic className={classes.icons} />
                    </IconButton>
                    <IconButton
                      style={{ marginRight: "15px" }}
                      className={classes.iconButton}
                    >
                      <img
                        src={image.recordDot}
                        style={{ width: lgScreen ? "2rem" : undefined }}
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                {showGif && (
                  <div className={`${classes.gifPicker}`}>
                    <GifPicker />
                  </div>
                )}

                {showEmoji && (
                  <div className={classes.emojiContainer}>
                    <Picker
                      pickerStyle={{ width: "100%", height: "250px" }}
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      groupNames={{ smileys_people: "PEOPLE" }}
                      native
                    />
                  </div>
                )}
              </Grid>
              <Grid item>
                <IconButton className={classes.sendButton}>
                  <img
                    src={image.send}
                    className={classes.sendButtonIcon}
                    alt=""
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.right}>
          <Grid container direction="column" className={classes.chats}>
            <Typography className={classes.chatsTitle}>Chats</Typography>
            <List classes={{ root: classes.list }}>
              <ListItem
                disableGutters
                dense
                alignItems="center"
                classes={{ root: classes.listItemRoot }}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar className={classes.listImage} src={img} />
                </ListItemAvatar>
                <ListItemText
                  classes={{ root: classes.listItemTextRoot }}
                  primary="Jenna Random"
                  secondary="You: Hi How are you doing?"
                />

                <Typography className={classes.lastSeen}>2h</Typography>
              </ListItem>
              <ListItem
                selected={true}
                disableGutters
                dense
                alignItems="center"
                classes={{ root: classes.listItemRoot }}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar className={classes.listImage} src={img} />
                </ListItemAvatar>
                <ListItemText
                  classes={{ root: classes.listItemTextRoot }}
                  primary="Jenna Random"
                  secondary="You: Hi How are you doing?"
                />

                <Typography className={classes.lastSeen}>2h</Typography>
              </ListItem>
              <ListItem
                disableGutters
                dense
                alignItems="center"
                classes={{ root: classes.listItemRoot }}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar className={classes.listImage} src={img} />
                </ListItemAvatar>
                <ListItemText
                  classes={{ root: classes.listItemTextRoot }}
                  primary="Jenna Random"
                  secondary="You: Hi How are you doing?"
                />

                <Typography className={classes.lastSeen}>2h</Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
