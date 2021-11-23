import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import image from "../../assets/index";

const useStyles = makeStyles((theme) => ({
	container: {
		widht: "100%",
		height: "25%",
		backgroundColor: theme.palette.common.lightPink,
		borderRadius: "25px",
		boxShadow: theme.shadows[2],
		padding: "1rem 1rem",
		boxSizing: "border-box",
	},
	giftImage: {
		[theme.breakpoints.down(1563)]: {
			width: "4rem",
			height: "4rem",
		},
		[theme.breakpoints.down(1360)]: {
			width: "4rem",
			height: "4rem",
		},
		[theme.breakpoints.down(1156)]: {
			width: "3rem",
			height: "3rem",
		},
	},
}));
export const Gift = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			className={classes.container}
			// spacing={2}
			justifyContent="space-between"
		>
			<Grid item container justifyContent="space-between">
				<Grid item>
					<img src={image.gift1} className={classes.giftImage} alt="" />
				</Grid>
				<Grid item>
					<img src={image.gift2} className={classes.giftImage} alt="" />
				</Grid>
				<Grid item>
					<img src={image.gift3} className={classes.giftImage} alt="" />
				</Grid>
				<Grid item>
					<img src={image.gift4} className={classes.giftImage} alt="" />
				</Grid>
			</Grid>
			<Grid item container justifyContent="space-between">
				<Grid item>
					<img src={image.gift5} className={classes.giftImage} alt="" />
				</Grid>
				<Grid item>
					<img src={image.gift6} className={classes.giftImage} alt="" />
				</Grid>
				<Grid item>
					<img src={image.gift7} className={classes.giftImage} alt="" />
				</Grid>
				<Grid item>
					<img src={image.gift8} className={classes.giftImage} alt="" />
				</Grid>
			</Grid>
		</Grid>
	);
};
