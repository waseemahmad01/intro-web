import React from "react";
import {
	makeStyles,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction as Action,
	Button,
} from "@material-ui/core";
import image from "../../../assets/index";

const useStyles = makeStyles((theme) => ({
	title: {
		textAlign: "center",
		"& h1": {
			fontSize: "31px",
			[theme.breakpoints.down("lg")]: {
				fontSize: "25px",
			},
		},
		"& p": {
			fontSize: "19px",
			[theme.breakpoints.down("lg")]: {
				fontSize: "15px",
			},
		},
	},
	listContainer: {
		width: "100%",
		padding: "0 3rem",
	},
	listItem: {
		padding: "1rem 0",
		[theme.breakpoints.down("lg")]: {
			padding: "0.5rem 0",
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
		width: "2.7rem",
		[theme.breakpoints.down("lg")]: {
			width: "2rem",
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
export const Refil = () => {
	const classes = useStyles();
	return (
		<Grid container direction="column" alignItems="center">
			<Grid item className={classes.title}>
				<h1>Refill</h1>
				<p>Buy Gems to award streamers!</p>
			</Grid>
			<Grid item className={classes.listContainer}>
				<List dense disableGutters>
					<ListItem divider className={classes.listItem}>
						<ListItemAvatar>
							<img className={classes.image} src={image.gem} alt="" />
						</ListItemAvatar>
						<ListItemText
							className={classes.listItemText}
							primary="500"
							secondary="$4.99"
						/>
						<Action className={classes.action}>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
							>
								Select
							</Button>
						</Action>
					</ListItem>
					<ListItem className={classes.listItem} divider>
						<ListItemAvatar>
							<img className={classes.image} src={image.gem} alt="" />
						</ListItemAvatar>
						<ListItemText
							className={classes.listItemText}
							primary="500"
							secondary="$4.99"
						/>
						<Action className={classes.action}>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
							>
								Select
							</Button>
						</Action>
					</ListItem>
					<ListItem className={classes.listItem} divider>
						<ListItemAvatar>
							<img className={classes.image} src={image.gem} alt="" />
						</ListItemAvatar>
						<ListItemText
							className={classes.listItemText}
							primary="500"
							secondary="$4.99"
						/>
						<Action className={classes.action}>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
							>
								Select
							</Button>
						</Action>
					</ListItem>
					<ListItem className={classes.listItem} divider>
						<ListItemAvatar>
							<img className={classes.image} src={image.gem} alt="" />
						</ListItemAvatar>
						<ListItemText
							className={classes.listItemText}
							primary="500"
							secondary="$4.99"
						/>
						<Action className={classes.action}>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
							>
								Select
							</Button>
						</Action>
					</ListItem>
				</List>
			</Grid>
		</Grid>
	);
};
