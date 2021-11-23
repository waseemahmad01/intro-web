import React from "react";
import { makeStyles, Grid, Typography, Button, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem 0rem",
	},
	topText: {
		color: theme.palette.common.crimson,
		margin: 0,
		marginBottom: "1rem",
		fontSize: "16px",
		[theme.breakpoints.down(1680)]: {
			fontSize: "12px",
			marginBottom: "0.8rem",
		},
	},
	title: {
		color: "#000",
		margin: "0",
		marginBottom: "0.7rem",
		fontSize: "31px",
		fontWeight: 500,
		[theme.breakpoints.down(1680)]: {
			fontSize: "18px",
			marginBottom: "0.6rem",
		},
	},
	subtitle: {
		color: "#000",
		fontSize: "16px",
		width: "60%",
		textAlign: "center",
		margin: "0 auto",
		marginBottom: "1.5rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "10px",
			marginBottom: "1rem",
		},
	},
	opponentButton: {
		width: "330px",
		heigth: "57px",
		borderRadius: "38px",
		textTransform: "none",
		fontSize: "22px",
		marginTop: "1rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "13px",
			height: "35px",
			width: "180px",
		},
	},
	chip: {
		backgroundColor: "#fff",
		width: "112px",
		height: "46px",
		borderRadius: "23px",
		[theme.breakpoints.down(1680)]: {
			height: "30px",
			width: "85px",
		},
		"& .MuiChip-label": {
			fontSize: "16px",
			color: "#000",
			[theme.breakpoints.down(1680)]: {
				fontSize: "12px",
			},
		},
		"& .MuiChip-outlined": {
			outline: "2px solid blue",
		},
	},
}));
export const InstantBattle = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			alignItems="center"
		>
			<Grid item>
				<Typography className={classes.topText}>Instant Battle</Typography>
			</Grid>
			<Grid item>
				<Typography className={classes.title}>Choose a Tag</Typography>
			</Grid>
			<Grid item>
				<Typography className={classes.subtitle}>
					Choose a tag for your battle so your opponents know what they are up
					against!
				</Typography>
			</Grid>
			<Grid
				item
				container
				style={{ width: "100%" }}
				justifyContent="center"
				direction="column"
			>
				<Grid item>
					<Grid container spacing={2}>
						<Grid item container justifyContent="center" spacing={2}>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
						</Grid>
						<Grid item container justifyContent="center" spacing={2}>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
						</Grid>
						<Grid item container justifyContent="center" spacing={2}>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Chip
									className={classes.chip}
									label="#random"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					className={classes.opponentButton}
				>
					Find an Opponent
				</Button>
			</Grid>
		</Grid>
	);
};
