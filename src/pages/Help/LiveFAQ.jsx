import React from "react";
import { useStyles } from "./helpStyles";
import { Grid, Typography } from "@material-ui/core";
import { Header } from "../../components/header/Header";
export const LiveFAQ = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			className={classes.container}
		>
			<Header  transparent/>
			<Grid item container justifyContent="center" alignItems="center" className={classes.colorTxt}>
				<Grid item className={classes.textContainer}>
					<h1>Live! FAQ</h1>
					<h2>
						Live! is your chance to meet new and interesting people from your
						area as they stream themselves and their lives in real-time.
					</h2>
				</Grid>
			</Grid>
			<Grid item>
				<p className={classes.subtitle2}>
					Intro &gt; Help Center &gt; Live! FAQ
				</p>
			</Grid>
			<Grid item container className={classes.columnContainer} justifyContent="space-evenly">
				<div className={classes.column}>
					<Grid className={classes.col} item>
						<div className={classes.colInnerContainer}>
							<Typography className={classes.colTitle} variant="h2">
								Live! Basics
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								How Do I date with Live?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								Who can use Live?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								What is Live?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								Filtering Live! Search Results
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								What is NextDate?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								What are the Rules for Live?
							</Typography>
						</div>
					</Grid>
					<Grid
						className={classes.col}
						style={{ marginTop: "2rem" }}
						item
					>
						<div className={classes.colInnerContainer}>
							<Typography className={classes.colTitle} variant="h2">
								Live! VIP Program
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								What is the Live! VIP Program?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								How do I purchase the Live! VIP Packages?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								I purchased enough credits to be a VIP. Why aren’t I seeing my
								badges?
							</Typography>
							<Typography className={classes.colText} variant="subtitle2">
								How do I purchase the $1 POF Subscription?
							</Typography>
						</div>
					</Grid>
				</div>
				<Grid className={classes.col} item md={4}>
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Streaming
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							What are Bouncers?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Who’s viewing My Stream?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							How Do I Stream?
						</Typography>
					</div>
				</Grid>
				<Grid className={classes.col} item >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} style={{ width: "25ch" }} variant="h2">
							Live! Credits, Gifts, and Diamonds
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							What are Live Credits?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							How do I buy Live Credits?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							How can I cash out Diamonds?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							What are Diamonds?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							How to send virtual gifts in Live?
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							What are Hearts and Gifts?
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
