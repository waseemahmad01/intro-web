import React from "react";
import { useStyles } from "./helpStyles";
import { Grid, Typography } from "@material-ui/core";
import { Header } from "../../components/header/Header";

export const BillingSubscription = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			className={classes.container}
		>
			<Header transparent/>
			<Grid item container justifyContent="center" alignItems="center" className={classes.colorTxt}>
				<Grid item className={classes.textContainer}>
					<h1>Billing & Subscription</h1>
					<h2>
						Answers to your questions about purchasing Tokens, Boosts, Credits
						and subscribing for an Upgraded account
					</h2>
				</Grid>
			</Grid>
			<Grid item>
				<p className={classes.subtitle2}>
					Intro &gt; Help Center &gt; Billing and Subscriptions
				</p>
			</Grid>
			<Grid item container className={classes.columnContainer} justifyContent="space-evenly">
				<div className={classes.column}>

				<Grid className={classes.col} item  >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Payments
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Accepted Payment Options
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Updating your subscription
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Refunds
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Additional Fees
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Stored Cards
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Purchase and Payment Terms
						</Typography>
					</div>
				</Grid>
				<Grid
					className={`${classes.col} ${classes.margin}`}
					item
				>
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Product Purchases
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Cashing out Diamonds for Live Credits
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							I just purchased credits but my balance hasn’t updated
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							I want to purchase credits on web but I cannot find the link
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							I have purchased credits but I am stuck on a page that is not
							live
						</Typography>
					</div>
				</Grid>
				</div>
				<Grid className={classes.col} item >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Product Purchases
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Upgrade your Intro Account
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Buying Tokens
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Buying Live Credits
						</Typography>
					</div>
				</Grid>
				<Grid className={classes.col} item >
					<div className={classes.colInnerContainer}>
						<Typography className={classes.colTitle} variant="h2">
							Third Party Purchases
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Updating your Google Play Subscription
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Updating your iTunes Subscription
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Apple iTunes Purchases
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Google Play Purchases
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							PayPal Purchases
						</Typography>
						<Typography className={classes.colText} variant="subtitle2">
							Troubleshooting iOS App Store Purchases
						</Typography>
					</div>
				</Grid>
				
			</Grid>
		</Grid>
	);
};
