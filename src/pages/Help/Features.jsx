import React from "react";
import { useStyles } from "./helpStyles";
import { Grid, Typography } from "@material-ui/core";
import { Header } from "../../components/header/Header";

export const Features = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			className={classes.container}
		>
			<Header transparent/>
			<Grid item container justifyContent="center" alignItems="center" className={classes.colorTxt} >
				<Grid item className={classes.textContainer}>
					<h1>Features</h1>
					<h2>Learn all the ways you can use Intro to go on more dates.</h2>
				</Grid>
			</Grid>
			<Grid item>
				<p className={classes.subtitle2}>
					Intro &gt; Help Center &gt; Features
				</p>
			</Grid>
			<Grid item container className={classes.columnContainer} justifyContent="space-evenly">
				<div className={classes.column}>
					<Grid container direction="column" spacing={5}>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Matches
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									See who is interested in You
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Distance Matching
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Messaging
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Sending Messages
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									How do I attach a photo / video to a message?
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Priority Message
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Unlocking your conversation powers
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Voice Messages
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Voice Calling
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Upgraded Account
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Upgrading your account
								</Typography>
							</div>
						</Grid>
					</Grid>
				</div>
				<div className={classes.column}>
					<Grid container direction="column" spacing={5}>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Meet Me
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Using Meet Me
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Troubleshooting Meet Me
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Searching
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Searching
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Searching by age
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Mobile
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Installing the Intro App
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Member Profiles
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Missing Gender
								</Typography>
							</div>
						</Grid>
					</Grid>
				</div>
				<div className={classes.column}>
					<Grid container direction="column" spacing={5}>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Favourites / Likes
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Favoriting a Streamer
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Favorites Lists
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Removed Likes
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Tokens
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Using Tokens
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Live!
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									What is Live?
								</Typography>
							</div>
						</Grid>
						<Grid item>
							<div className={classes.colInnerContainer}>
								<Typography className={classes.colTitle} variant="h2">
									Other
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Who I viewed
								</Typography>
								<Typography className={classes.colText} variant="subtitle2">
									Hiding Profile Views
								</Typography>
							</div>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	);
};
