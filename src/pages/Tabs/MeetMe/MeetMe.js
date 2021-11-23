import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { Post } from "../../../components/Post/Post";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingInline: "2rem",
		paddingTop: "2rem",
		paddingBottom:"0rem",
		[theme.breakpoints.down("lg")]: {
			padding: "1rem 2rem",
		},
	},
	title: {
		color: "#000",
		margin: 0,
		fontSize: "39px",
		fontWeight: 100,
		[theme.breakpoints.down("lg")]: {
			fontSize: "25px",
		},
	},
	postContainer: {
		marginTop: "0.9rem",
		[theme.breakpoints.down("lg")]:{
			marginTop: '0.5rem',
		}
	},
}));
export const MeetMe = () => {
	const classes = useStyles();
	return (
		<Grid  container direction="column" className={classes.container}>
			<Grid item container>
				<Typography className={classes.title}>Meet Me</Typography>
			</Grid>
			<Grid item container className={classes.postContainer}>
					<Post meetMe />
			</Grid>
		</Grid>
	);
};
