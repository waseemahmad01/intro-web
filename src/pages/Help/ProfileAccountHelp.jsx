import React from "react";
import { useStyles } from "./helpStyles";
import { Grid, Typography } from "@material-ui/core";
import { Header } from "../../components/header/Header";

export const ProfileAccountHelp = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			alignItems="center"
			direction="column"
			className={classes.container}
		>
			<Header transparent />
			<Grid item container className={classes.colorTxt} justifyContent="center" alignItems="center">
				<Grid item className={classes.textContainer}>
					<h1>Profile & Account</h1>
					<h2>Learn all about using your intro account and profile</h2>
				</Grid>
			</Grid>
			<Grid item>
				<p className={classes.subtitle2}>
					Intro &gt; Help Center &gt; Profile & Account
				</p>
			</Grid>
			<Grid item container className={classes.columnContainer} justifyContent="space-evenly">
				<Grid className={classes.col} item >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Profile
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Upload a Photo/Video
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Hiding and unhiding your profile
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Why was my photo removed?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Updating your location
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Updating your profile
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							See who viewed you
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Profile Tips
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Editing and Removing a photo/video
						</Typography>
					</div>
				</Grid>
				<Grid className={classes.col} item >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Accounts
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Creating an Account
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Resetting your password
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							How to log out of your account
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Removing your Intro Account
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Your account was banned
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							How to change your email address
						</Typography>
					</div>
				</Grid>
				<Grid className={classes.col} item >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Notifications
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Unsubscribe from emails
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Editing Email Notifications
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
