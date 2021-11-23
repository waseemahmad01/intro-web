import React, { useState } from "react";
import {
	makeStyles,
	Grid,
	Typography,
	Button,
	Dialog,
} from "@material-ui/core";
import { Checkbox } from "../../Checkbox/Checkbox";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem 3.5rem",
		[theme.breakpoints.down(1680)]: {
			padding: "1rem 2.5rem",
		},
	},
	title: {
		color: "#000",
		margin: 0,
		fontSize: "31px",
		[theme.breakpoints.down(1680)]: {
			fontSize: "24px",
		},
	},
	subTitle: {
		color: "#000",
		// margin: 0,
		fontSize: "16px",
		width: "35ch",
		margin: "0.5rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "12px",
		},
	},
	battleButton: {
		width: "330px",
		height: "57px",
		fontSize: "22px",
		textTransform: "none",
		borderRadius: "38px",
		marginTop: "1rem",
		color: "#fff",
		background: "linear-gradient(to right, #6D4DBF,#D5616D)",
		[theme.breakpoints.down(1680)]: {
			height: "45px",
			width: "240px",
			fontSize: "15px",
		},
	},
	streamingFriends: {
		color: "#000",
		margin: 0,
		fontSize: "17px",
		fontWeight: "100",
		marginTop: "0.5rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "11px",
			marginTop: "0.25rem",
		},
	},
	formControl: {
		marginTop: "2rem",
		marginBottom: "1rem",
		[theme.breakpoints.down(1680)]: {
			marginTop: "1.75rem",
			marginBottom: "0.75rem",
		},
	},
	allowText: {
		color: "#000",
		margin: 0,
		fontSize: "17px",
		[theme.breakpoints.down(1680)]: {
			fontSize: "12px",
		},
	},
	dialogContainer: {
		padding: "4rem",
		backgroundColor: theme.palette.common.lightPink,
		[theme.breakpoints.down(1680)]: {
			padding: "2rem 4rem",
		},
	},
	dialogTitle: {
		margin: 0,
		color: "#000",
		fontSize: "32px",
		marginBottom: "2.5rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "24px",
			marginBottom: "1.5rem",
		},
	},
	dialogDescription: {
		color: "#000",
		fontSize: "20px",
		margin: 0,
		[theme.breakpoints.down(1680)]: {
			fontSize: "16px",
		},
	},
	gotItButton: {
		width: "265px",
		height: "63px",
		fontSize: "22px",
		textTransform: "none",
		borderRadius: "38px",
		marginTop: "3rem",
		[theme.breakpoints.down(1680)]: {
			marginTop: "1.5rem",
			height: "45px",
			width: "180px",
			fontSize: "15px",
		},
	},
	dialog: {
		borderRadius: "20px",
	},
}));

export const Battle = () => {
	const classes = useStyles();
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			className={classes.container}
		>
			<Grid item>
				<Typography className={classes.title}>Time To Battle!</Typography>
			</Grid>
			<Grid item>
				<Typography className={classes.subTitle}>
					We can find you an opponent instantly, or you can challenge a favorite
					streamer.
				</Typography>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					onClick={() => setOpenDialog(true)}
					className={classes.battleButton}
				>
					Instant Battle
				</Button>
			</Grid>
			<Grid item>
				<Typography className={classes.streamingFriends}>
					23 mutual favorites streaming right now
				</Typography>
			</Grid>
			<Grid
				item
				container
				justifyContent="space-between"
				className={classes.formControl}
			>
				<Grid item>
					<Typography className={classes.allowText}>
						Allow incoming battle challenges
					</Typography>
				</Grid>
				<Grid item>
					<Checkbox variant="switch" />
				</Grid>
			</Grid>
			<Dialog classes={{ paper: classes.dialog }} open={openDialog}>
				<Grid
					container
					className={classes.dialogContainer}
					direction="column"
					alignItems="center"
				>
					<Grid item>
						<Typography className={classes.dialogTitle}>
							What is Battles
						</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.dialogDescription}>
							Ready to challenge a streamer to a battle? Choose a topic, #tag
							your batle and thenchoose either Instant Battle OR Challenge a
							Mutual Favorite to battle.
						</Typography>
						<Typography className={classes.dialogDescription}>
							You will combine audiences, Stream side by side and have a limited
							time to earn the most Gems. Whoever receives the most Gems, wins!
						</Typography>
					</Grid>
					<Grid item>
						<Button
							className={classes.gotItButton}
							variant="contained"
							color="primary"
							onClick={() => setOpenDialog(false)}
						>
							Got it
						</Button>
					</Grid>
				</Grid>
			</Dialog>
		</Grid>
	);
};
